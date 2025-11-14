import { useState, useEffect } from "react";
import { Card, Divider, Flex } from "antd";
import { PARAGON_LIST } from "../../utils/paragonDataUtils";
import useParagonContext from "../../hooks/useParagonContext";
import { capitalise } from "../../utils/stringUtils";
import type { IParagonData, GameDifficultyType } from "../../interfaces/paragonInterface";
import { DIFFICULTIES } from "../../models/difficultyData";


function createAvailableParagonList(currentMonkeyName: string | null, updateParagon: React.Dispatch<React.SetStateAction<string | null>>) {
    const paragonCards = [...PARAGON_LIST].map(([monkeyName, paragonObj], idx) => {
        const paragonMetadata = paragonObj.metadata;
        const currentlySelected = (monkeyName === currentMonkeyName);
        return <Card
            hoverable
            cover={
                <img
                    draggable={false}
                    alt={paragonMetadata.paragonName + " Cover Art"}
                    src={paragonMetadata.iconSrc}
                    className="aspect-square"
                />
            }
            key={monkeyName + idx}
            className="w-32"
            onClick={() => updateParagon(monkeyName)}
        >
            <Card.Meta title={paragonMetadata.towerName} description={currentlySelected ? "Selected" : ""}/>
        </Card>
    });

    return paragonCards;
}


function createDifficultyList(currentGameDifficulty: GameDifficultyType, updateDifficulty: React.Dispatch<React.SetStateAction<GameDifficultyType>>) {
    const difficultyCards = DIFFICULTIES.map((difficulty, idx) => {
        const displayName = capitalise(difficulty.name);
        const currentlySelected = (difficulty.name === currentGameDifficulty);
        return <Card
            hoverable
            cover={
                <img
                    draggable={false}
                    alt={displayName + " Icon Art"}
                    src={difficulty.iconSrc}
                />
            }
            key={difficulty.name + idx}
            className="w-32"
            onClick={() => updateDifficulty(difficulty.name)}
        >
            <Card.Meta title={displayName} description={currentlySelected ? "Selected" : ""}/>
        </Card>
    });

    return difficultyCards
}

function ParagonSelector() {
    const {paragonContextData, setParagonContextData} = useParagonContext();
    const selectorData = paragonContextData.selectorData;

    // "Form" states
    const [selectedDifficulty, setSelectedDifficulty] = useState(selectorData.difficulty);
    const [selectedParagon, setSelectedParagon] = useState(selectorData.name);

    // 
    useEffect(() => {
        setParagonContextData({
            ...paragonContextData,
            selectorData: {
                ...paragonContextData.selectorData,
                difficulty: selectedDifficulty,
            }
        })
    }, [selectedDifficulty, setParagonContextData]);

    useEffect(() => {
        let newParagonData: IParagonData | null = paragonContextData.paragonData;
        let newSelectorName: string | null = paragonContextData.selectorData.name;
        if (!selectedParagon) {
            newParagonData = null;
            newSelectorName = null;
        } else if (!paragonContextData.paragonData || paragonContextData.selectorData.name !== selectedParagon) {
            const selectedParagonObj: IParagonData | undefined = PARAGON_LIST.get(selectedParagon);
            if (selectedParagonObj) {
                newParagonData = selectedParagonObj;
                newSelectorName = selectedParagon;
            }
        }
        setParagonContextData({
            paragonLevel: 1,
            paragonData: newParagonData,
            selectorData: {
                ...paragonContextData.selectorData,
                name: newSelectorName
            },
        })
    }, [selectedParagon, setParagonContextData]);


    return <div className="m-[5px] self-center">
        <Flex vertical>
            <Divider orientation="left">Difficulty</Divider>
            <span><span>Selected Difficulty:</span> <span>{capitalise(selectedDifficulty)}</span></span>
            <Flex wrap gap="small">
                {createDifficultyList(selectedDifficulty, setSelectedDifficulty)}
            </Flex>
            <Divider orientation="left">Paragon</Divider>
            <span><span>Selected Paragon:</span> <span>{paragonContextData.paragonData?.metadata.towerName || "N/A"}</span></span>
            <Flex wrap gap="small">
                {createAvailableParagonList(selectedParagon, setSelectedParagon)}
            </Flex>
            <Divider/>
            {/* Add full paragon card here */}
        </Flex>
    </div>
}

export default ParagonSelector