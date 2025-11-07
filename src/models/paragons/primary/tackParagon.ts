import { type IParagonData } from "../../../interfaces/paragonInterface";

const tackParagon: IParagonData = {
    metadata: {
        paragonName: "Crucible of Steel and Flame",
        towerName: "Tack Shooter",
        wikiURL: "https://www.bloonswiki.com/Crucible_of_Steel_and_Flame",
        iconSrc: "https://www.bloonswiki.com/images/f/fd/BTD6_Paragon-CycloneOfFireAndMetal.png"
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