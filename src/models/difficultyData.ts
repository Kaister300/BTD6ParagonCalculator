import easyIcon from '../assets/difficulties/EasyDifficulty.png';
import mediumIcon from '../assets/difficulties/MediumDifficulty.png';
import hardIcon from '../assets/difficulties/HardDifficulty.png';
import impoppableIcon from '../assets/difficulties/ImpoppableDifficulty.png';
import type { GameDifficultyType } from "../interfaces/paragonInterface"


const DIFFICULTIES: {name: GameDifficultyType, iconSrc: string}[] = [
    {
        name: "easy",
        iconSrc: easyIcon,
    },
    {
        name: "medium",
        iconSrc: mediumIcon,
    },
    {
        name: "hard",
        iconSrc: hardIcon,
    },
    {
        name: "impoppable",
        iconSrc: impoppableIcon,
    }
]


export {
    DIFFICULTIES
}