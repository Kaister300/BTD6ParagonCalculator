import { type IParagonData } from "../../../interfaces/paragonInterface";
import nauticSeigeIcon from "../../../assets/paragons/nauticSeigeCore.png";

const subParagon: IParagonData = {
    metadata: {
        paragonName: "Nautic Siege Core",
        towerName: "Monkey Sub",
        towerType: "military",
        wikiURL: "https://www.bloonswiki.com/Nautic_Siege_Core",
        iconSrc: nauticSeigeIcon,
    },
    prices: {
        easy: 340000,
        medium: 400000,
        hard: 432000,
        impoppable: 480000,
    },
    attackContainer: [
        {
            name: "Main",
            attacks: [
                {
                    name: "Attack",
                    isDot: false,
                    damage: 20,
                    ceramic: 30,
                    moab: 0,
                    boss: 60,
                    elite: 200,
                    pierce: 200,
                    speed: 0.35,
                    cooldown: 0
                }
            ]
        }
    ]
}

export default subParagon;