import { type IParagonData } from "../../../interfaces/paragonInterface";
import magnusPerfectusIcon from "../../../assets/paragons/magusPerfectus.png";

const wizardParagon: IParagonData = {
    metadata: {
        paragonName: "Magus Perfectus",
        towerName: "Wizard Monkey",
        wikiURL: "https://www.bloonswiki.com/Magus_Perfectus",
        iconSrc: magnusPerfectusIcon,
    },
    prices: {
        easy: 680000,
        medium: 800000,
        hard: 864000,
        impoppable: 960000,
    },
    attackContainer: [
        {
            name: "Arcane Blast",
            attacks : [
                {
                    name: "Arcane Blast",
                    isDot: false,
                    damage: 50,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 450,
                    pierce: 25,
                    speed: 0.275,
                    cooldown: 0,
                },
                {
                    name: "Zombie Bloons",
                    isDot: false,
                    damage: 150,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 300,
                    pierce: 50,
                    speed: 0,
                    cooldown: 0,
                }
            ]
        },
        {
            name: "Drain Beam",
            attacks: [
                {
                    name: "Drain Beam",
                    isDot: false,
                    damage: 200,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 200,
                    pierce: 1,
                    speed: 0.05,
                    cooldown: 0,
                }
            ]
        },
        {
            name: "Dark Phoenix",
            attacks: [
                {
                    name: "Dark Fireballs",
                    isDot: false,
                    damage: 400,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 800,
                    pierce: 100,
                    speed: 2,
                    cooldown: 0,
                },
                {
                    name: "Dark Flame",
                    isDot: false,
                    damage: 200,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 250,
                    pierce: 100,
                    speed: 0.2,
                    cooldown: 0,
                }
            ]
        }
    ]
}

export default wizardParagon;