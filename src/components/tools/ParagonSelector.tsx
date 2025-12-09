import { useState, useEffect } from "react";
import { Card, Divider, Flex } from "antd";
import { PARAGON_LIST } from "../../utils/paragonDataUtils";
import useParagonContext from "../../hooks/useParagonContext";
import { capitalise } from "../../utils/stringUtils";
import type { IParagonData, GameDifficultyType, TowerType } from "../../interfaces/paragonInterface";
import { DIFFICULTIES } from "../../models/difficultyData";
import { renderToString } from "react-dom/server";


/**
 * Generates inline-URL for svg required for card backgrounds
 * @param fillColor 
 * @returns URL + base64 encoded svg string
 */
function generateCardBackground(fillColor: string) {
    const baseSvg = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill={fillColor}>
        <path d='M 0 0 L 25 9 L 50 0 V 40 H 0 Z'></path>
    </svg>
    return "data:image/svg+xml;base64," + encodeURIComponent(btoa(renderToString(baseSvg)));
}

// TOOD: Potentially move this into separate file
type CustomCardTheme = {
    imageBackground: string,
    cardBackground: string,
    borderColor: string
}

const TOWER_TYPE_STYLES: Record<TowerType, CustomCardTheme> = {
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
        const cardBorderClass = currentlySelected ? "border-5!" : "border-0!"
        const generatedCardBackground = generateCardBackground(towerStyle.cardBackground);
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
            className={`min-w-32 max-w-48 ${cardBorderClass}`}
            style={{
                overflow: "hidden",
                background: `no-repeat bottom/100% 40% url("${generatedCardBackground}") ${towerStyle.imageBackground}`,
                ...(currentlySelected ? {borderColor: towerStyle.borderColor} : {}),
            }}
            onClick={() => props.updateParagon(monkeyName)}
        >
            <Card.Meta title={paragonMetadata.towerName} className="[&>*>.ant-card-meta-title]:text-wrap!"/>
        </Card>
    });

    return paragonCards;
}

const DIFFICULTY_STYLES: Record<GameDifficultyType, CustomCardTheme> = {
    easy: {
        imageBackground: "#96d4ef",
        cardBackground: "#52bddc",
        borderColor: "#c82eb5"
    },
    medium: {
        imageBackground: "#68ae4b",
        cardBackground: "#3f9236",
        borderColor: "#bec32f"
    },
    hard: {
        imageBackground: "#779bbd",
        cardBackground: "#5f7c98",
        borderColor: "#bf172f",
    },
    impoppable: {
        imageBackground: "#00b58c",
        cardBackground: "#008e7f",
        borderColor: "#005f61"
    },
}

function DifficultySelection(props: Readonly<{
    currentGameDifficulty: GameDifficultyType,
    updateDifficulty: React.Dispatch<React.SetStateAction<GameDifficultyType>>
}>) {
    const difficultyCards = DIFFICULTIES.map((difficulty, idx) => {
        
        const displayName = capitalise(difficulty.name);
        const difficultyStyle = DIFFICULTY_STYLES[difficulty.name] || DIFFICULTY_STYLES["easy"]
        const currentlySelected = (difficulty.name === props.currentGameDifficulty);
        const cardBorderClass = currentlySelected ? "border-5!" : "border-0!"
        const generatedCardBackground = generateCardBackground(difficultyStyle.cardBackground);
        return <Card
            hoverable
            cover={
                <img
                    draggable={false}
                    alt={displayName + " Icon Art"}
                    src={difficulty.iconSrc}
                    className="aspect-square"
                />
            }
            key={difficulty.name + idx}
            className={`w-40 ${cardBorderClass}`}
            style={{
                overflow: "hidden",
                background: `no-repeat bottom/100% 40% url("${generatedCardBackground}") ${difficultyStyle.imageBackground}`,
                ...(currentlySelected ? {borderColor: difficultyStyle.borderColor} : {}),
            }}
            onClick={() => props.updateDifficulty(difficulty.name)}
        >
            <Card.Meta title={displayName}/>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        </Flex>
    </div>
}

export default ParagonSelector