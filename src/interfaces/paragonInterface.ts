/**
 * Interface File for Paragon Data
 * Used by data loader to type-cast JSON data files
 * 
 * TODO: Refactor JSON files into TS data files to
 * be pre-loaded into the web app instead of requiring
 * web call on swapping to any paragon.
 * 
*/

interface IParagonPrices {
    easy: number;
    medium: number;
    hard: number;
    impoppable: number;
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
    attackContainer: IParagonAttack[];
}

interface IParagonData {
    name: string;
    prices: IParagonPrices;
    attacks: IParagonAttackContainer[]
}

// TODO: Maybe move into types file
type GameDifficultyType = "easy" | "medium" | "hard" | "impoppable";

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
    GameDifficultyType
}