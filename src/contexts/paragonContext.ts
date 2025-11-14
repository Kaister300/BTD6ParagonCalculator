import { createContext } from "react";
import type { IParagonSelectorData, IParagonData } from "../interfaces/paragonInterface";

class ParagonContextData {
    selectorData: IParagonSelectorData;
    paragonData: IParagonData | null;
    paragonLevel: number;

    constructor() {
        this.selectorData = {name: null, difficulty: "easy"};
        this.paragonData = null;
        this.paragonLevel = 1;
    }
}

type ParagonContextType = {
    paragonContextData: ParagonContextData,
    setParagonContextData: React.Dispatch<React.SetStateAction<ParagonContextData>>
}

const ParagonContext = createContext<ParagonContextType | null>(null);

export { ParagonContext, ParagonContextData }