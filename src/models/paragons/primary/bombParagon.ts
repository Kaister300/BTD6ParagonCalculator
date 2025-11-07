import { type IParagonData } from "../../../interfaces/paragonInterface";

const bombParagon: IParagonData = {
    metadata: {
        paragonName: "Ballistic Obliteration Missile Bunker",
        towerName: "Bomb Shooter",
        wikiURL: "https://www.bloonswiki.com/Ballistic_Obliteration_Missile_Bunker",
        iconSrc: "https://www.bloonswiki.com/images/d/df/BTD6_Paragon-BallisticObliterationMissileBunker.png"
    },
    prices: {
        easy: 510000,
        medium: 600000,
        hard: 648000,
        impoppable: 720000,
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

export default bombParagon;