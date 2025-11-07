import { type IParagonData } from "../../../interfaces/paragonInterface";

const boomerangParagon: IParagonData = {
    metadata: {
        paragonName: "Glaive Dominus",
        towerName: "Boomerang Monkey",
        wikiURL: "https://www.bloonswiki.com/Glaive_Dominus",
        iconSrc: "https://www.bloonswiki.com/images/d/d4/BTD6_ParagonGlaiveDominus.png"
    },
    prices: {
        easy: 212500,
        medium: 250000,
        hard: 270000,
        impoppable: 300000,
    },
    attackContainer: [
        {
            name: "Glaives",
            attacks : [
                {
                    name : "Main Glaive",
                    isDot : false,
                    damage: 20,
                    ceramic: 0,
                    moab: 0,
                    boss: 40,
                    elite: 80,
                    pierce: 100,
                    speed: 0.04,
                    cooldown: 0
                },
                {
                    name : "Orbital Glaive",
                    isDot : false,
                    damage: 42,
                    ceramic: 20,
                    moab: 20,
                    boss: 118,
                    elite: 444,
                    pierce: 1000,
                    speed: 0.1,
                    cooldown: 0
                }
            ]
        },
        {
            name: "Anti-MOAB Glave",
            attacks: [
                {
                    name : "Anti-MOAB Glaive",
                    isDot : false,
                    damage: 1,
                    ceramic: 0,
                    moab: 19,
                    boss: 0,
                    elite: 20,
                    pierce: 300,
                    speed: 2.5,
                    cooldown: 0
                },
                {
                    name : "Anti-MOAB Glaive Explosion",
                    isDot : false,
                    damage: 2500,
                    ceramic: 0,
                    moab: 0,
                    boss: 2500,
                    elite: 7500,
                    pierce: 20,
                    speed: 2.5,
                    cooldown: 0
                },
                {
                    name : "Explosion Burn",
                    isDot : true,
                    damage: 500,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 500,
                    pierce: 0,
                    speed: 4,
                    cooldown: 0
                }
            ]
        }
    ]
}

export default boomerangParagon;