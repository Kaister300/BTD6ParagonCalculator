import { type IParagonData } from "../../../interfaces/paragonInterface";
import spikeFactoryIcon from "../../../assets/paragons/spikeFactoryParagon.png";

const spikeParagon: IParagonData = {
    metadata: {
        paragonName: "Mega Massive Munitions Factory",
        towerName: "Spike Factory",
        wikiURL: "https://www.bloonswiki.com/Mega_Massive_Munitions_Factory",
        iconSrc: spikeFactoryIcon,
    },
    prices: {
        easy: 637500,
        medium: 750000,
        hard: 810000,
        impoppable: 900000,
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

export default spikeParagon;