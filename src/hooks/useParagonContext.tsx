import { useContext } from "react";
import { ParagonContext } from "../contexts/paragonContext";

function useParagonContext() {
    const currentContext = useContext(ParagonContext);
    if (!currentContext) {
        throw new Error("Context must be initialise before using");
    }
    return currentContext;
}

export default useParagonContext;