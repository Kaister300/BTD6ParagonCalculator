import { useRef } from "react";
import useParagonContext from "../../hooks/useParagonContext";
import { capitalise } from "../../utils/stringUtils";
import { ParagonContextData } from "../../contexts/paragonContext";
import type { IParagonData, GameDifficultyType } from "../../interfaces/paragonInterface";


// NOTE: Might move into util or another file
// Original had this in separate file
const AVAILABLE_PARAGONS = {
    "primary": {
        "dart": "Dart Monkey",
        "boomerangm": "Boomerang Monkey",  // Has to be "boomerangm" to avoid conflict with "boomerang"
        "tack": "Tack Shooter",
    },
    "military": {
        "buccaneer": "Monkey Buccaneer",
        "ace": "Monkey Ace",
        "sub": "Monkey Sub"
    },
    "magic": {
        "ninja": "Ninja Monkey",
        "wizard": "Wizard Monkey",
    },
    "support": {
        "engineer": "Engineer Monkey",
    }
};

function createAvailableParagonList() {
    return <select id="paragon" className="m-1">
        <option value="">Please choose an option</option>
        {Object.entries(AVAILABLE_PARAGONS).map(([monkeyType, monkeyEntry], indexOuter) => (
            <optgroup label={capitalise(monkeyType)} key={indexOuter}>
                {Object.entries(monkeyEntry).map(([monkeyName, paragonName], indexInner) => {
                    const optionName = `${monkeyType};${monkeyName}`;
                    return <option value={optionName} key={indexInner}>{paragonName}</option>
                })}
            </optgroup>
        ))}
    </select>
}

const DIFFICULTUES: GameDifficultyType[] = ["easy", "medium", "hard", "impoppable"]

function createDifficultyList() {
    return <select id="difficulty" className="m-1">
        {DIFFICULTUES.map((difficulty, index) => (
            <option value={difficulty} key={index}>{capitalise(difficulty)}</option>
        ))}
    </select>
}

function createParagonWikiLink(paragonName: string) {
    const paragonRoute = paragonName.replace(/ /g, "_");
    const paragonUrl = new URL(paragonRoute, "https://www.bloonswiki.com/");
    return paragonUrl.href;
}

function ParagonSelector() {
    const {paragonContextData, setParagonContextData} = useParagonContext();
    const selectorData = paragonContextData.selectorData;
    const paragonName = paragonContextData.paragonData?.name;
    const paragonForm = useRef(null);

    async function updateFormAction() {
        // TODO: Fix this up. Might just use a state setter for monkey name & game difficulty
        const formRef = paragonForm.current;  // @ts-ignore
        if (formRef && formRef.difficulty && formRef.paragon) {  // @ts-ignore
            const newMonkeyName: string | null = formRef?.paragon.value;  // @ts-ignore
            const newGameDifficulty: GameDifficultyType = formRef?.difficulty?.value;
            if (!newMonkeyName) {
                const cleanParagonContextData = new ParagonContextData();
                cleanParagonContextData.selectorData.difficulty = newGameDifficulty;
                setParagonContextData(cleanParagonContextData);
            }
            else if (!paragonContextData.paragonData || selectorData.name !== newMonkeyName) {
                const arr = newMonkeyName.split(";");
                const paragonDataUrl = new URL(`${window.location.href}paragons/${arr[0]}/${arr[1]}.json`);
                await fetch(paragonDataUrl)
                .then(response => response.json())
                .then(data => {
                    setParagonContextData({
                        ...paragonContextData,
                        paragonData: data as IParagonData,
                        selectorData: {
                            ...paragonContextData.selectorData,
                            name: newMonkeyName,
                        }
                    });
                });
            }
            if (paragonContextData.selectorData.difficulty !== newGameDifficulty) {
                setParagonContextData({
                    ...paragonContextData,
                    selectorData: {
                        ...paragonContextData.selectorData,
                        difficulty: newGameDifficulty
                    }
                })
            }
        }
    }

    return <div className="m-[5px]">
        <form ref={paragonForm} onChange={updateFormAction} className="grid grid-cols-[160px_minmax(0,_250px)]">
            <label htmlFor="paragon" className="m-1">Chooose Paragon:</label>
            {createAvailableParagonList()}
            <label htmlFor="difficulty" className="m-1">Choose Difficulty:</label>
            {createDifficultyList()}

        </form>
        {paragonName && selectorData.difficulty && (
            <div className="pt-4 pb-2">
                <p className="my-2"><strong>Paragon Wiki Entry:</strong> <a href={createParagonWikiLink(paragonName)} className="text-blue-600 visited:text-purple-900 underline">{paragonName}</a></p>
            </div>
        )}
    </div>
}

export default ParagonSelector