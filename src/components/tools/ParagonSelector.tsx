import { useState, useEffect } from "react";
import { Card, Divider, Flex } from "antd";
import { PARAGON_LIST } from "../../utils/paragonDataUtils";
import useParagonContext from "../../hooks/useParagonContext";
import { capitalise } from "../../utils/stringUtils";
import type { IParagonData, GameDifficultyType, TowerType } from "../../interfaces/paragonInterface";
import { DIFFICULTIES } from "../../models/difficultyData";


const TOWER_TYPE_STYLES: Record<TowerType, {imageBackground: string, cardBackground: string, borderColor: string}> = {
    primary: {
        imageBackground: "#91d1ef",
        cardBackground: "#24abe7",
        borderColor: "#07658c",
    },
    military: {
        imageBackground: "#9cee89",
        cardBackground: "#3bd026",
        borderColor: "#278913",
    },
    magic: {
        imageBackground: "#b890f7",
        cardBackground: "#7c48f3",
        borderColor: "#5b17b0",
    },
    support: {
        imageBackground: "#f7cb90",
        cardBackground: "#ed8428",
        borderColor: "#c45e30",
    },
}

function ParagonSelection(props: Readonly<{
        currentMonkeyName: string | null,
        updateParagon: React.Dispatch<React.SetStateAction<string | null>>
}>) {
    const paragonCards = [...PARAGON_LIST].map(([monkeyName, paragonObj], idx) => {
        const paragonMetadata = paragonObj.metadata;
        const currentlySelected = (monkeyName === props.currentMonkeyName);
        const towerStyle = TOWER_TYPE_STYLES[paragonMetadata.towerType] || TOWER_TYPE_STYLES["primary"];
        const cardBorderClass = currentlySelected ? `border-5!` : ""
        return <Card
            hoverable
            cover={
                <img
                    draggable={false}
                    alt={paragonMetadata.paragonName + " Cover Art"}
                    src={paragonMetadata.iconSrc}
                    className="aspect-square"
                    style={{backgroundColor: towerStyle.imageBackground}}
                />
            }
            key={monkeyName + idx}
            className={`min-w-32 max-w-48  ${cardBorderClass}`}
            style={
                {
                    backgroundColor: towerStyle.cardBackground,
                    ...(currentlySelected ? {borderColor: towerStyle.borderColor} : {}),
                }
            }
            onClick={() => props.updateParagon(monkeyName)}
        >
            <Card.Meta title={paragonMetadata.towerName} description={currentlySelected ? "Selected" : ""} className="[&>*>.ant-card-meta-title]:text-wrap!"/>
        </Card>
    });

    return paragonCards;
}

// const DIFFICULTY_STYLES = {
//     easy: {

//     }
// }

function DifficultySelection(props: Readonly<{
    currentGameDifficulty: GameDifficultyType,
    updateDifficulty: React.Dispatch<React.SetStateAction<GameDifficultyType>>
}>) {
    const difficultyCards = DIFFICULTIES.map((difficulty, idx) => {
        const displayName = capitalise(difficulty.name);
        const currentlySelected = (difficulty.name === props.currentGameDifficulty);
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
            className="w-40"
            onClick={() => props.updateDifficulty(difficulty.name)}
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

    // Update Difficulty Hook
    useEffect(() => {
        setParagonContextData({
            ...paragonContextData,
            selectorData: {
                ...paragonContextData.selectorData,
                difficulty: selectedDifficulty,
            }
        })
    }, [selectedDifficulty, setParagonContextData]);

    // Update Paragon Data Hook
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
            <Flex wrap gap="small" justify="center">
                <DifficultySelection
                    currentGameDifficulty={selectedDifficulty}
                    updateDifficulty={setSelectedDifficulty}
                />
            </Flex>
            <Divider orientation="left">Paragon</Divider>
            <Flex wrap gap="small" justify="center">
                <ParagonSelection
                    currentMonkeyName={selectedParagon}
                    updateParagon={setSelectedParagon}
                />
            </Flex>
            <Divider/>
            {/* Add full paragon card here */}
        </Flex>
    </div>
}

export default ParagonSelector