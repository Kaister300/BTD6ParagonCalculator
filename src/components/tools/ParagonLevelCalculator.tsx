import { useState, useRef, type ChangeEventHandler, type FormEvent } from "react";
import { capitalise } from "../../utils/stringUtils";
import Tooltip from "../ui/Tooltip";
import useParagonContext from "../../hooks/useParagonContext";
import { paragonLevelsGenerator } from "../../utils/createParagonLevels";

const PARAGON_LEVELS = paragonLevelsGenerator();

function ParagonLevelCalculator() {
    // Paragon Context Data
    const {paragonContextData, setParagonContextData} = useParagonContext()
    const currentDegree = paragonContextData.paragonLevel;
    const paragonData = paragonContextData.paragonData;
    const gameDifficulty = paragonContextData.selectorData.difficulty;
    const paragonCost = paragonData?.prices[gameDifficulty];
    const formActive = paragonData !== null;

    // Calculator States
    const [currentPower, setCurrentPower] = useState(0);

    // Form States
    const calculatorRef = useRef<HTMLFormElement>(null);
    const [tier5, setTier5] = useState(0);
    const [towerUpgrade, setTowerUpgrade] = useState(0);
    const [moneySpent, setMoneySpent] = useState(0);
    const [popCount, setPopCount] = useState(0);
    const [incomeGenerated, setIncomeGenerated] = useState(0);
    const [paragonTotems, setParagonTotems] = useState(0);
    const [cashSlider, setCashSlider] = useState(0);

    // Calculations
    const maxSliderCost = paragonCost ? Math.round(3.15 * paragonCost + 1) : 0;

    // Reset Calculation Values
    function resetCalculationValues() {
        // TODO: Fix this to prevent React render loop

        // Reset Calculator States
        setCurrentPower(0);

        // Reste Form States
        setTier5(0);
        setTowerUpgrade(0);
        setMoneySpent(0);
        setPopCount(0);
        setIncomeGenerated(0);
        setParagonTotems(0);
        setCashSlider(0);

        // Reset Context Data
        setParagonContextData({
            ...paragonContextData,
            paragonLevel: 1,
        });
    }

    function inputValidationWrapper(stateSetter: Function) {
        const validateInput: ChangeEventHandler<HTMLInputElement> = (e) => {
            let newValue: string | number = e.target.value;
            const newValueInt = parseInt(newValue);
            const minValue = parseInt(e.target.min);
            const maxValue = parseInt(e.target.max);

            if (newValue.length === 0) {
                if (e.target.id === "cashslider") {
                    newValue = maxValue/2;
                }
                else {
                    newValue = "";
                }
            } else {
                if (newValueInt > maxValue) {
                    newValue = maxValue;
                }
                else if (newValueInt < minValue) {
                    newValue = minValue;
                } else {
                    newValue = newValueInt;
                }
            }
            // TOOD: Somehow submit form here...
            stateSetter(newValue);

            const currentForm = calculatorRef.current;
            if (currentForm) {
                currentForm.requestSubmit();
            }
        }

        return validateInput;
    }

    function calculatePower(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(e);

        // Zero Power Initially
        let newPower = 0;

        // Tier5s. Max is 50,000 power
        if(tier5) {
            newPower += Math.min(tier5*6000, 50000);
        }

        // Upgrades. Max is 10,000 power
        if (towerUpgrade) {
            newPower += Math.min(towerUpgrade*100, 10000)
        }

        // Money Spent. Max is 60,000 power
        if (paragonCost) {
            let costPower = 0;

            // Money Spent
            if (moneySpent) {
                let spentRatio = paragonCost/20000;
                costPower += Math.floor(moneySpent/spentRatio);
            }

            // Cash Slider
            if (cashSlider) {
                let sliderRatio = paragonCost*1.05/20000;
                costPower += Math.floor(cashSlider/sliderRatio);
            }

            newPower += Math.min(costPower, 60000);
        }

        // Pops or Income. Max is 90,000 power
        let temp = 0;
        if (popCount) temp += Math.floor(popCount/180);
        if (incomeGenerated) temp += Math.floor(incomeGenerated/45);
        newPower += Math.min(temp, 90000);

        // Totems. No Max
        if (paragonTotems) newPower += paragonTotems*2000;

        // Capping Total Max Power
        newPower = Math.min(newPower, 200000);

        // Update state
        setCurrentPower(newPower);
        calculateDegree();
    }

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

    return <div>
        <div className="text-center pb-4 leading-normal">
            <h3 className="font-semibold text-xl">{formActive ? paragonData.name : "Please select a Paragon"}</h3>
            <h4 className={formActive ? "italic" : ""}>{formActive ? capitalise(gameDifficulty) : "-----"}</h4>
        </div>
        <form ref={calculatorRef} className="grid grid-cols-2 [&>label]:text-right [&>label]:m-1 [&>input]:m-1 [&>*>input]:m-1" onSubmit={calculatePower}>
            <label htmlFor="tier5"><Tooltip bodyText="Tier 5 Towers:" tooltipText="Excludes the first 3 Tier 5 towers that were placed down to enable the paragon purchase."/></label>
            <input type="number" id="tier5" min={0}  max={9} value={tier5} onChange={inputValidationWrapper(setTier5)}/>

            <label htmlFor="towerupgrades"><Tooltip bodyText="Non-Tier 5 Upgrades:" tooltipText="This includes all upgrade tiers spent on towers excluding any Tier 5 upgrades. Max is 100."/></label>
            <input type="number" id="towerupgrades" min={0} max={100} value={towerUpgrade} step={4} onChange={inputValidationWrapper(setTowerUpgrade)}/>

            <label htmlFor="moneyspent"><Tooltip bodyText="Money Spent (excluding initial 3):" tooltipText={`Total amount spent on towers excluding T5s. Max is $${paragonCost ? 3*paragonCost : 'N/A'}.`}/></label>
            <input type="number" id="moneyspent" min={0} max={paragonCost ? 3*paragonCost : 0} value={moneySpent} step={500} onChange={inputValidationWrapper(setMoneySpent)}/>

            <label htmlFor="popcount"><Tooltip bodyText="Bloons Popped:" tooltipText="Includes Bloons popped from every tower of the paragon type. Max is 16.2M."/></label>
            <input type="number" id="popcount" min={0} max={16200000} value={popCount} step={5000} onChange={inputValidationWrapper(setPopCount)}/>

            <label htmlFor="incomegenerated"><Tooltip bodyText="Cash Generated:" tooltipText="Applies to Buccaneer & Engineer. Shares same internal power limit as pops. Max is $4.05M."/></label>
            <input type="number" id="incomegenerated" min={0} max={4050000} value={incomeGenerated} step={1000} onChange={inputValidationWrapper(setIncomeGenerated)}/>

            <label htmlFor="paragontotems"><Tooltip bodyText="Geraldo Paragon Power Totems:" tooltipText="Has no max cap to increase paragon power."/></label>
            <input type="number" id="paragontotems" min={0} value={paragonTotems} onChange={inputValidationWrapper(setParagonTotems)}/>

            <label htmlFor="cashslider"><Tooltip bodyText="Cash Injection:" tooltipText={`This is the cash injection that is allowed to be spent on the paragon. This is 3.15 times the base paragon cost. Max is $${maxSliderCost}.`}/></label>
            <span id="cashslidercontainer" className="flex">
                <input type="range" id="cashslider" min={0} max={maxSliderCost} value={cashSlider} step={1} onChange={inputValidationWrapper(setCashSlider)}/>
                <input type="number" min={0} max={maxSliderCost} value={cashSlider} step={100} onChange={inputValidationWrapper(setCashSlider)}/>
            </span>
        </form>
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