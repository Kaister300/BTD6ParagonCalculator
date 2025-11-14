import { type IParagonData } from "../../../interfaces/paragonInterface";
import navarchIcon from "../../../assets/paragons/navarchOfTheSeas.png";

const buccaneerParagon: IParagonData = {
    metadata: {
        paragonName: "Navarch of the Seas",
        towerName: "Monkey Buccaneer",
        wikiURL: "https://www.bloonswiki.com/Navarch_of_the_Seas",
        iconSrc: navarchIcon,
    },
    prices: {
        easy: 467500,
        medium: 550000,
        hard: 594000,
        impoppable: 660000,
    },
    attackContainer: [
        {
            name: "Turrets",
            attacks: [
                {
                    name: "Main Turret",
                    isDot: false,
                    damage: 60,
                    ceramic: 0,
                    moab: 60,
                    boss: 60,
                    elite: 180,
                    pierce: 28,
                    speed: 0.429,
                    cooldown: 0,
                },
                {
                    name: "Grape Shot Turret",
                    isDot: false,
                    damage: 25,
                    ceramic: 0,
                    moab: 30,
                    boss: 5,
                    elite: 85,
                    pierce: 10,
                    speed: 0.429,
                    cooldown: 0,
                },
            ],
        },
        {
            name: "Fighter Planes",
            attacks: [
                {
                    name: "Dart Plane",
                    isDot: false,
                    damage: 44,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 88,
                    pierce: 18,
                    speed: 0.15,
                    cooldown: 0,
                },
                {
                    name: "MOAB Missile Plane",
                    isDot: false,
                    damage: 200,
                    ceramic: 0,
                    moab: 0,
                    boss: 0,
                    elite: 400,
                    pierce: 10,
                    speed: 1.5,
                    cooldown: 0,
                },
            ],
        },
    ],
};

export default buccaneerParagon;
