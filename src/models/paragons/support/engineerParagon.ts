import { type IParagonData } from "../../../interfaces/paragonInterface";
import masterBuilderIcon from "../../../assets/paragons/masterBuilder.png";

const engineerParagon: IParagonData = {
    metadata: {
        paragonName: "Master Builder",
        towerName: "Engineer Monkey",
        towerType: "support",
        wikiURL: "https://www.bloonswiki.com/Master_Builder",
        iconSrc: masterBuilderIcon,
    },
    prices: {
        easy: 552500,
        medium: 650000,
        hard: 702000,
        impoppable: 780000,
    },
    attackContainer: [
        {
            name: "Main Guns",
            attacks : [
                {
                    name: "Nail Gun",
                    isDot: false,
                    damage: 100,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 200,
                    pierce: 15,
                    speed: 0.3,
                    cooldown: 0
                }
            ]
        },
        {
            name: "Green Mega Sentry",
            attacks: [
                {
                    name: "Green Mega Sentry",
                    isDot: false,
                    damage: 100,
                    ceramic: 0,
                    moab: 0,
                    boss: 200,
                    elite: 400,
                    pierce: 10,
                    speed: 0.2,
                    cooldown: 0
                },
                {
                    name: "Green Mega Sentry Beam",
                    isDot: false,
                    damage: 20,
                    ceramic: 0,
                    moab: 0,
                    boss: 10,
                    elite: 100,
                    pierce: 10,
                    speed: 0.2,
                    cooldown: 0
                },
                {
                    name: "Mega Sentry Explosion",
                    isDot: false,
                    damage: 30000,
                    ceramic: 0,
                    moab: 0,
                    boss: 10000,
                    elite: 70000,
                    pierce: 100,
                    speed: 0,
                    cooldown: 0
                }
            ]
        },
        {
            name: "Red Mega Sentry",
            attacks: [
                {
                    name: "Red Mega Sentry Plasma",
                    isDot: false,
                    damage: 5,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 0,
                    pierce: 10,
                    speed: 0.05,
                    cooldown: 0
                },
                {
                    name: "Mega Sentry Explosion",
                    isDot: false,
                    damage: 30000,
                    ceramic: 0,
                    moab: 0,
                    boss: 10000,
                    elite: 70000,
                    pierce: 100,
                    speed: 0,
                    cooldown: 0
                }
            ]
        },
        {
            name: "Blue Mega Sentry",
            attacks: [
                {
                    name: "Blue Mega Sentry Missile",
                    isDot: false,
                    damage: 3,
                    ceramic: 0,
                    moab: 747,
                    boss: 0,
                    elite: 750,
                    pierce: 20,
                    speed: 0.5,
                    cooldown: 0
                },
                {
                    name: "Blue Mega Sentry Missile Explosion",
                    isDot: false,
                    damage: 3,
                    ceramic: 0,
                    moab: 2,
                    boss: 1,
                    elite: 9,
                    pierce: 20,
                    speed: 0.5,
                    cooldown: 0
                },
                {
                    name: "Mega Sentry Explosion",
                    isDot: false,
                    damage: 30000,
                    ceramic: 0,
                    moab: 0,
                    boss: 10000,
                    elite: 70000,
                    pierce: 100,
                    speed: 0,
                    cooldown: 0
                }
            ]
        },
        {
            name: "Modified Paragon Sentry",
            attacks: [
                {
                    name: "Modified Paragon Sentry",
                    isDot: false,
                    damage: 4,
                    ceramic: 0,
                    moab: 2,
                    boss: 0,
                    elite: 10,
                    pierce: 5,
                    speed: 0.06,
                    cooldown: 0
                },
                {
                    name: "Modified Paragon Sentry Explosion",
                    isDot: false,
                    damage: 100,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 0,
                    pierce: 50,
                    speed: 0,
                    cooldown: 0
                }
            ]
        }
    ]
}

export default engineerParagon;