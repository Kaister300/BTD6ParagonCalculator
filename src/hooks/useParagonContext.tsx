import { useContext } from "react";
import { ParagonContext } from "../contexts/paragonContext";

function useParagonContext() {
    const currentContext = useContext(ParagonContext);
    if (!currentContext) {
        throw Error("Context must be initialise before using");
    }
    return currentContext;
}

export default useParagonContext;