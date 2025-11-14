import { type IParagonData } from "../../../interfaces/paragonInterface";
import apexPlasmaIcon from "../../../assets/paragons/apexPlasmaMaster.png";

const dartParagon: IParagonData = {
    metadata: {
        paragonName: "Apex Plasma Master",
        towerName: "Dart Monkey",
        towerType: "primary",
        wikiURL: "https://www.bloonswiki.com/Apex_Plasma_Master",
        iconSrc: apexPlasmaIcon,
    },
    prices: {
        easy: 127500,
        medium: 150000,
        hard: 162000,
        impoppable: 180000,
    },
    attackContainer: [
        {
            name: "Main Attack",
            attacks: [
                {
                    name: "Dart",
                    isDot: false,
                    damage: 20,
                    ceramic: 30,
                    moab: 0,
                    boss: 60,
                    elite: 200,
                    pierce: 200,
                    speed: 0.4,
                    cooldown: 0
                }
            ]
        },
        {
            name: "Juggernaut Balls",
            attacks: [
                {
                    name: "Single Ball",
                    isDot: false,
                    damage: 20,
                    ceramic: 30,
                    moab: 0,
                    boss: 60,
                    elite: 200,
                    pierce: 200,
                    speed: 0.4,
                    cooldown: 0
                }
            ]
        }
    ]
}

export default dartParagon;