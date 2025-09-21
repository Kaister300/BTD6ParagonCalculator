import { useState, useEffect, type ChangeEventHandler } from "react";
import Tooltip from "../ui/Tooltip";
import { paragonLevelsGenerator } from "../../utils/createParagonLevels";

const PARAGON_LEVELS = paragonLevelsGenerator();

function LegacyParagonDegreeCalculator() {
    // Calculator States
    const [currentDegree, setCurrentDegree] = useState(1);
    const [currentPower, setCurrentPower] = useState(0);

    // Form States
    const [tier5, setTier5] = useState(0);
    const [towerUpgrade, setTowerUpgrade] = useState(0);
    const [moneySpent, setMoneySpent] = useState(0);
    const [popCount, setPopCount] = useState(0);
    const [incomeGenerated, setIncomeGenerated] = useState(0);
    const [paragonTotems, setParagonTotems] = useState(0);

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
            stateSetter(newValue);
        }

        return validateInput;
    }

    function calculatePower() {
        // Zero Power Initially
        let newPower = 0;

        // Tier5s. Max is 90,000 power
        if(tier5) {
            newPower += Math.min(tier5*10000, 90000);
        }

        // Upgrades. Max is 10,000 power
        if (towerUpgrade) {
            newPower += Math.min(towerUpgrade*100, 10000);
        }

        // Money Spent. Max is 10,000 power
        if (moneySpent) {
            newPower += Math.min(Math.floor(moneySpent/25), 10000);
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
    }

    useEffect(() => {
        calculatePower();
    }, [tier5, towerUpgrade, moneySpent, popCount, incomeGenerated, paragonTotems])

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
        setCurrentDegree(newCurrentDegree);
    }

    useEffect(() => {
        calculateDegree();
    }, [currentPower]);

    return <div>
        <form className="grid grid-cols-2 [&>label]:text-right [&>label]:m-1 [&>input]:m-1 [&>*>input]:m-1">
            <label htmlFor="tier5"><Tooltip bodyText="Tier 5 Towers:" tooltipText="Excludes the first 3 Tier 5 towers that were placed down to enable the paragon purchase."/></label>
            <input type="number" id="tier5" min={0}  max={9} value={tier5} onChange={inputValidationWrapper(setTier5)}/>

            <label htmlFor="towerupgrades"><Tooltip bodyText="Non-Tier 5 Upgrades:" tooltipText="This includes all upgrade tiers spent on towers excluding any Tier 5 upgrades. Max is 100."/></label>
            <input type="number" id="towerupgrades" min={0} max={100} value={towerUpgrade} step={4} onChange={inputValidationWrapper(setTowerUpgrade)}/>

            <label htmlFor="moneyspent"><Tooltip bodyText="Money Spent (excluding initial 3):" tooltipText={`Total amount spent on towers excluding T5s. Max is $250k.`}/></label>
            <input type="number" id="moneyspent" min={0} max={250000} value={moneySpent} step={500} onChange={inputValidationWrapper(setMoneySpent)}/>

            <label htmlFor="popcount"><Tooltip bodyText="Bloons Popped:" tooltipText="Includes Bloons popped from every tower of the paragon type. Max is 16.2M."/></label>
            <input type="number" id="popcount" min={0} max={16200000} value={popCount} step={5000} onChange={inputValidationWrapper(setPopCount)}/>

            <label htmlFor="incomegenerated"><Tooltip bodyText="Cash Generated:" tooltipText="Applies to Buccaneer & Engineer. Shares same internal power limit as pops. Max is $4.05M."/></label>
            <input type="number" id="incomegenerated" min={0} max={4050000} value={incomeGenerated} step={1000} onChange={inputValidationWrapper(setIncomeGenerated)}/>

            <label htmlFor="paragontotems"><Tooltip bodyText="Geraldo Paragon Power Totems:" tooltipText="Has no max cap to increase paragon power."/></label>
            <input type="number" id="paragontotems" min={0} value={paragonTotems} onChange={inputValidationWrapper(setParagonTotems)}/>
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
    </div>
}

export default LegacyParagonDegreeCalculator