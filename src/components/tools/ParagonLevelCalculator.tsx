import { useState, useEffect } from "react";
import { Form, InputNumber, Slider, Flex, type InputNumberProps } from "antd";
import { capitalise } from "../../utils/stringUtils";
import useParagonContext from "../../hooks/useParagonContext";
import { paragonLevelsGenerator } from "../../utils/createParagonLevels";
import paragonIcon from "../../assets/paragons/paragonIcon.png";

const PARAGON_LEVELS = paragonLevelsGenerator();


type CalculatorFormFieldTypes = {
    tier5: number | null | undefined,
    towerUpgrade: number | null | undefined,
    moneySpent: number | null | undefined,
    popCount: number | null | undefined,
    incomeGenerated: number| null | undefined,
    paragonTotems: number | null | undefined,
    cashSlider: number | null | undefined,
};


function ParagonLevelCalculator() {
    // Paragon Context Data
    const {paragonContextData, setParagonContextData} = useParagonContext()
    const currentDegree = paragonContextData.paragonLevel;
    const paragonData = paragonContextData.paragonData;
    const gameDifficulty = paragonContextData.selectorData.difficulty;
    const paragonCost = paragonData?.prices[gameDifficulty];
    const formActive = paragonData !== null;

    // Construct photo
    const paragonPhotoURL = paragonData?.metadata.iconSrc || paragonIcon;

    // Calculator States
    const [currentPower, setCurrentPower] = useState(0);

    // Form States
    const [cashSliderState, setCashSliderState] = useState<number | string | null>(0);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const updateCashSlider: InputNumberProps['onChange'] = (newValue) => {
        setCashSliderState(newValue as number);
        form.setFieldValue("cashSlider", newValue as number);
    }

    useEffect(() => {
        form
            .validateFields({validateOnly: false})
            .then(() => calculatePower(values))
            .catch(() => console.log("Form invalid. Not calculating power."));
    }, [form, values]);

    function calculatePower(formValues: CalculatorFormFieldTypes) {
        const {
            tier5,
            towerUpgrade,
            moneySpent,
            popCount,
            incomeGenerated,
            paragonTotems,
            cashSlider,
        } = formValues;

        let newPower = 0;

        // Tier5s. Max is 50,000 power
        if(tier5 && typeof tier5 === "number") {
            newPower += Math.min(tier5*6000, 50000);
        }

        // Upgrades. Max is 10,000 power
        if (towerUpgrade && typeof towerUpgrade === "number") {
            newPower += Math.min(towerUpgrade*100, 10000)
        }

        // Money Spent. Max is 60,000 power
        if (paragonCost) {
            let costPower = 0;

            // Money Spent
            if (moneySpent && typeof moneySpent === "number") {
                const spentRatio = paragonCost/20000;
                costPower += Math.floor(moneySpent/spentRatio);
            }

            // Cash Slider
            if (cashSlider && typeof cashSlider === "number") {
                const sliderRatio = paragonCost*1.05/20000;
                costPower += Math.floor(cashSlider/sliderRatio);
            }

            newPower += Math.min(costPower, 60000);
        }

        // Pops or Income. Max is 90,000 power
        let temp = 0;
        if (popCount && typeof popCount === "number") temp += Math.floor(popCount/180);
        if (incomeGenerated && typeof incomeGenerated === "number") temp += Math.floor(incomeGenerated/45);
        newPower += Math.min(temp, 90000);

        // Totems. No Max
        if (paragonTotems && typeof paragonTotems === "number") newPower += paragonTotems*2000;

        // Capping Total Max Power
        newPower = Math.min(newPower, 200000);

        // Update state
        setCurrentPower(newPower);
    }

    // Calculations
    const maxSliderCost = paragonCost ? Math.round(3.15 * paragonCost + 1) : 0;

    function resetCalculationValues() {
        // Reset Calculator States
        setCurrentPower(0);

        // Reste Form States
        setCashSliderState(0);

        // Reset Context Data
        setParagonContextData({
            ...paragonContextData,
            paragonLevel: 1,
        });
    }

    useEffect(() => {
        if(!formActive) resetCalculationValues();
    }, [formActive]);  // eslint-disable-line


    function calculateDegree() {
        let found = false;
        let newCurrentDegree = 0;
        for(let i = 0; i < PARAGON_LEVELS.length; i++) {
            if(currentPower < PARAGON_LEVELS[i]) {
                newCurrentDegree = i;
                found = true;
                break;
            }
        }
        if (!found) {
            newCurrentDegree = 100;
        }
        setParagonContextData({
            ...paragonContextData,
            paragonLevel: newCurrentDegree,
        })
    }

    useEffect(() => {
        calculateDegree();
    }, [currentPower]);  // eslint-disable-line

    return <div className="self-center">
        <div className="flex items-center justify-center space-x-5 pb-4">
            <img src={paragonPhotoURL} alt="BTD6 Paragon Model" width={"80"} height={"80"}/>
            <div className="text-center leading-normal">
                <h3 className="font-semibold text-xl">{formActive ? paragonData.metadata.paragonName : "Please select a Paragon"}</h3>
                <h4 className={formActive ? "italic" : ""}>{formActive ? capitalise(gameDifficulty) : "-----"}</h4>
            </div>
        </div>
        <Form<CalculatorFormFieldTypes>
            className="max-w-160" form={form} disabled={!formActive} labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}
            initialValues={{tier5: 0, towerUpgrade: 0, moneySpent: 0, popCount: 0, incomeGenerated: 0, paragonTotems: 0, cashSlider: 0}}
        >
            <Form.Item
                name="tier5"
                label="Tier 5 Towers"
                tooltip="Excludes the first 3 Tier 5 towers that were placed down to enable the paragon purchase."
                rules={[
                    {type: 'number', min: 0, max: 9}
                ]}
            >
                <InputNumber className="w-full!"/>
            </Form.Item>

            <Form.Item
                name="towerUpgrade"
                label="Non-Tier 5 Upgrades"
                tooltip="This includes all upgrade tiers spent on towers excluding any Tier 5 upgrades. Max is 100."
                rules={[
                    {type: 'number', min: 0, max: 100}
                ]}
            >
                <InputNumber step={4} className="w-full!"/>
            </Form.Item>

            <Form.Item
                name="moneySpent"
                label="Money Spent (excluding initial 3)"
                tooltip={`Total amount spent on towers excluding T5s. Max is $${paragonCost ? 3*paragonCost : 'N/A'}.`}
                rules={[
                    {type: 'number', min: 0, max: paragonCost ? 3*paragonCost : 0}
                ]}
            >
                <InputNumber min={0} max={paragonCost ? 3*paragonCost : 0} step={500} className="w-full!" prefix="$"/>
            </Form.Item>

            <Form.Item
                name="popCount"
                label="Bloons Popped"
                tooltip="Includes Bloons popped from every tower of the paragon type. Max is 16.2M."
                rules={[
                    {type: 'number', min: 0, max: 16200000}
                ]}
            >
                <InputNumber min={0} max={16200000} step={5000} className="w-full!"/>
            </Form.Item>

            <Form.Item
                name="incomeGenerated"
                label="Cash Generated"
                tooltip="Applies to Buccaneer & Engineer. Shares same internal power limit as pops. Max is $4.05M."
                rules={[
                    {type: 'number', min: 0, max: 4050000}
                ]}
            >
                <InputNumber min={0} max={4050000} step={1000} className="w-full!" prefix="$"/>
            </Form.Item>

            <Form.Item
                name="paragonTotems"
                label="Geraldo Paragon Power Totems"
                tooltip="Has no max cap to increase paragon power."
                rules={[
                    {type: 'number', min: 0}
                ]}
            >
                <InputNumber min={0} className="w-full!"/>
            </Form.Item>

            <Form.Item
                name="cashSlider"
                label="Cash Injection"
                tooltip={`This is the cash injection that is allowed to be spent on the paragon. This is 3.15 times the base paragon cost. Max is $${maxSliderCost}.`}
                rules={[
                    {type: 'number', min: 0, max: maxSliderCost}
                ]}
            >
                <Flex gap="middle">
                    <Slider min={0} max={maxSliderCost} step={1} className="w-full!" value={typeof cashSliderState === "number" ? cashSliderState : 0} onChange={updateCashSlider}/>
                    <InputNumber min={0} max={maxSliderCost} step={100} className="w-full!" prefix="$" value={cashSliderState} onChange={updateCashSlider}/>
                </Flex>
            </Form.Item>
        </Form>
        <p className="my-3">Current Degree: {currentDegree}</p>
        <p className="my-3">Current Power: {currentPower}</p>
        <p className="my-3">
            {
                currentDegree < 100 ?
                    `Progress to Next Milestone: (${currentPower - PARAGON_LEVELS[currentDegree-1]} / ${PARAGON_LEVELS[currentDegree] - PARAGON_LEVELS[currentDegree-1]})`
                    : "Paragon has reached max level and can not be leveled up further."
            }
        </p>
        <span className="my-3 text-red-500">
            <strong>NOTE:</strong> {
                paragonCost ?
                    `The cash injection is 3.15 times the base paragon cost. This would mean that the total cost would be $${maxSliderCost}`
                    : "Please choose the Paragon and Difficulty first."
            }
        </span>
    </div>
}

export default ParagonLevelCalculator;