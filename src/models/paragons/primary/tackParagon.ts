import { type IParagonData } from "../../../interfaces/paragonInterface";
import cycloneIcon from "../../../assets/paragons/cycloneOfFireAndMetal.png";

const tackParagon: IParagonData = {
    metadata: {
        paragonName: "Crucible of Steel and Flame",
        towerName: "Tack Shooter",
        towerType: "primary",
        wikiURL: "https://www.bloonswiki.com/Crucible_of_Steel_and_Flame",
        iconSrc: cycloneIcon,
    },
    prices: {
        easy: 170000,
        medium: 200000,
        hard: 216000,
        impoppable: 240000,
    },
    attackContainer: [
        {
            name: "Blade Attack",
            attacks: [
                {
                    name: "Blade",
                    isDot: false,
                    damage: 1,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 0,
                    pierce: 0,
                    speed: 0.14,
                    cooldown: 0
                },
                {
                    name: "Tack",
                    isDot: false,
                    damage: 1,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 0,
                    pierce: 0,
                    speed: 0.12,
                    cooldown: 0
                }
            ]
        }
    ]
}

export default tackParagon;