import dartParagon from "../models/paragons/primary/dartParagon";
import boomerangParagon from "../models/paragons/primary/boomerangParagon";
import tackParagon from "../models/paragons/primary/tackParagon";
import bombParagon from "../models/paragons/primary/bombParagon";
import buccaneerParagon from "../models/paragons/military/buccaneerParagon";
import aceParagon from "../models/paragons/military/aceParagon";
import subParagon from "../models/paragons/military/subParagon";
import ninjaParagon from "../models/paragons/magic/ninjaParagon";
import wizardParagon from "../models/paragons/magic/wizardParagon";
import engineerParagon from "../models/paragons/support/engineerParagon";
import spikeParagon from "../models/paragons/support/spikeParagon";
import type { IParagonData } from "../interfaces/paragonInterface";


/**
 * TODO: Find automated way to populate this list...
 */
const PARAGON_LIST: Map<string, IParagonData> = new Map(Object.entries({
    dartParagon,
    boomerangParagon,
    tackParagon,
    bombParagon,
    buccaneerParagon,
    aceParagon,
    subParagon,
    ninjaParagon,
    wizardParagon,
    engineerParagon,
    spikeParagon,
}));


export {
    PARAGON_LIST,
}