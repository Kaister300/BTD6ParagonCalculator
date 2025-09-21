import { useState } from "react";
import Collapsible from "./ui/Collapsible";
import ParagonSelector from "./tools/ParagonSelector";
import ParagonLevelCalculator from "./tools/ParagonLevelCalculator";
import ParagonDamageCalculator from "./tools/ParagonDamageCalculator";
import LegacyParagonDegreeCalculator from "./tools/LegacyParagonDegreeCalculator";
import { ParagonContext, ParagonContextData } from "../contexts/paragonContext";

function ParagonTools() {
    const [paragonContextData, setParagonContextData] = useState(new ParagonContextData());

    return <div className="grow">
        {/*
        Have selector provider wrap the following:
            1. Paragon Selector
            2. Paragon Degree Calculator
            3. Paragon Damage Calculator
         */}
         <ParagonContext value={{
            paragonContextData,
            setParagonContextData,
        }}>
            <Collapsible title="Paragon Selector">
                <ParagonSelector/>
            </Collapsible>

            <Collapsible title="Paragon Degree Calculator" subtitle="Post Game Version 39.0">
                <ParagonLevelCalculator/>
            </Collapsible>

            <Collapsible title="Paragon Damage Calculator" subtitle="WIP - Placeholder for now">
                <ParagonDamageCalculator/>
            </Collapsible>

            <Collapsible title="Legacy Paragon Degree Calculator" subtitle="Pre Game Version 39.0">
                <LegacyParagonDegreeCalculator/>
            </Collapsible>
         </ParagonContext>
    </div>
}

export default ParagonTools