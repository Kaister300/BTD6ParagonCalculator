import { useState } from "react";
import Collapsible from "./ui/Collapsible";
import ParagonSelector from "./tools/ParagonSelector";
import ParagonLevelCalculator from "./tools/ParagonLevelCalculator";
import { ParagonContext, ParagonContextData } from "../contexts/paragonContext";

function ParagonTools() {
    // const [paragonContextData, setParagonContextData] = useState(new ParagonContextData());
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
         </ParagonContext>
    </div>
}

export default ParagonTools