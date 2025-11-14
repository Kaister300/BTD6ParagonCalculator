/**
 * Interface File for Paragon Data
 * Used by Paragon Model files to properly type-cast data
*/

// TODO: Maybe move into types file
type GameDifficultyType = "easy" | "medium" | "hard" | "impoppable";
type TowerType = "primary" | "military" | "magic" | "support";

interface IParagonPrices {
    easy: number;
    medium: number;
    hard: number;
    impoppable: number;
}


interface IParagonMetadata {
    paragonName: string;
    towerName: string;
    towerType: TowerType;
    wikiURL: string;
    iconSrc: string;
}

// TODO: Define attack types as enum
// OR, create separate interface for each attack type
// Could include "explosion", "ability", etc...
interface IParagonAttack {
    name: string;
    isDot: boolean;
    damage: number;
    ceramic: number;
    moab: number;
    boss: number;
    elite: number;
    pierce: number;
    speed: number;
    cooldown: number;
}

interface IParagonAttackContainer {
    name: string;
    attacks: IParagonAttack[];
}

interface IParagonData {
    metadata: IParagonMetadata;
    prices: IParagonPrices;
    attackContainer: IParagonAttackContainer[]
}

interface IParagonSelectorData {
    name: string | null;
    difficulty: GameDifficultyType;
}

export type {
    IParagonPrices,
    IParagonAttack,
    IParagonAttackContainer,
    IParagonData,
    IParagonSelectorData,
    GameDifficultyType,
    TowerType,
}