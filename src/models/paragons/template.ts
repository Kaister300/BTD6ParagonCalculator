import { type IParagonData } from "../../interfaces/paragonInterface";

const paragon: IParagonData = {
    metadata: {
        paragonName: "Template",
        towerName: "Template Tower",
        wikiURL: "https://www.bloonswiki.com/Apex_Plasma_Master",
        iconSrc: "https://www.bloonswiki.com/images/5/52/BTD6_Paragon-ApexPlasmaMaster.png"
    },
    prices: {
        easy: 20,
        medium: 30,
        hard: 40,
        impoppable: 50,
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

export default paragon;