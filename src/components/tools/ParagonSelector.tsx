import { useRef } from "react";
import { AVAILABLE_PARAGONS } from "../../utils/paragonDataUtils";
import useParagonContext from "../../hooks/useParagonContext";
import { capitalise } from "../../utils/stringUtils";
import { ParagonContextData } from "../../contexts/paragonContext";
import type { IParagonData, GameDifficultyType } from "../../interfaces/paragonInterface";


function createAvailableParagonList(currentMonkeyName: string | null) {
    return <select id="paragon" className="m-1 p-1 border rounded-xl border-blue-800 bg-blue-100" defaultValue={currentMonkeyName || ""}>
        <option value="">Please choose an option</option>
        {Object.entries(AVAILABLE_PARAGONS).map(([monkeyType, monkeyEntry], indexOuter) => (
            <optgroup label={capitalise(monkeyType)} key={indexOuter}>
                {Object.entries(monkeyEntry).map(([monkeyName, paragonObj], indexInner) => {
                    const optionName = `${monkeyType};${monkeyName}`;
                    return <option value={optionName} key={indexInner}>{paragonObj.metadata.towerName}</option>
                })}
            </optgroup>
        ))}
    </select>
}

const DIFFICULTUES: GameDifficultyType[] = ["easy", "medium", "hard", "impoppable"]

function createDifficultyList(currentGameDifficulty: GameDifficultyType) {
    return <select id="difficulty" className="m-1 p-1 border rounded-xl border-blue-800 bg-blue-100" defaultValue={currentGameDifficulty}>
        {DIFFICULTUES.map((difficulty, index) => (
            <option value={difficulty} key={index}>{capitalise(difficulty)}</option>
        ))}
    </select>
}

function ParagonSelector() {
    const {paragonContextData, setParagonContextData} = useParagonContext();
    const selectorData = paragonContextData.selectorData;
    const paragonName = paragonContextData.paragonData?.metadata.paragonName;
    const paragonMetadata = paragonContextData.paragonData?.metadata;
    const paragonForm = useRef<HTMLFormElement>(null);

    async function updateFormAction() {
        // TODO: Fix this up. Might just use a state setter for monkey name & game difficulty
        const formRef = paragonForm.current;
        if (formRef?.difficulty && formRef.paragon) {
            const newMonkeyName: string | null = formRef?.paragon.value;
            const newGameDifficulty: GameDifficultyType = formRef?.difficulty?.value;
            if (!newMonkeyName) {
                const cleanParagonContextData = new ParagonContextData();
                cleanParagonContextData.selectorData.difficulty = newGameDifficulty;
                setParagonContextData(cleanParagonContextData);
            }
            else if (!paragonContextData.paragonData || selectorData.name !== newMonkeyName) {
                const arr = newMonkeyName.split(";");
                const selectedParagonObj: IParagonData | undefined = AVAILABLE_PARAGONS[arr[0]][arr[1]];
                console.log(selectedParagonObj);
                if (selectedParagonObj) {
                    setParagonContextData({
                        ...paragonContextData,
                        paragonData: selectedParagonObj,
                        selectorData: {
                            ...paragonContextData.selectorData,
                            name: newMonkeyName,
                        }
                    })
                } else {
                    // Handle issues better
                    console.log("Unknown paragon");
                }
                
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

    return <div className="m-[5px] self-center">
        <form ref={paragonForm} onChange={updateFormAction} className="grid grid-cols-[160px_minmax(0,_250px)]">
            <label htmlFor="paragon" className="m-1">Chooose Paragon:</label>
            {createAvailableParagonList(selectorData.name)}
            <label htmlFor="difficulty" className="m-1">Choose Difficulty:</label>
            {createDifficultyList(selectorData.difficulty)}

        </form>
        {paragonName && paragonMetadata && selectorData.difficulty && (
            <div className="pt-4 pb-2 flex items-center">
                <img src="https://www.bloonswiki.com/images/8/8b/BTD6_tutorial_ParagonIcon.png" alt="BTD6 Paragon Icon" width={"50"} height={"50"}/>
                <p className="my-2 pl-3"><strong>Paragon Wiki Entry:</strong> <a href={paragonMetadata.wikiURL} className="text-blue-600 visited:text-purple-900 underline">{paragonName}</a></p>
            </div>
        )}
    </div>
}

export default ParagonSelector