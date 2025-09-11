import Collapsible from "./ui/Collapsible"

function ParagonTools() {
    return <div className="grow">
        {/*
        Have selector provider wrap the following:
            1. Paragon Selector
            2. Paragon Degree Calculator
            3. Paragon Damage Calculator
         */}
         <Collapsible title="Paragon Selector">
            <button onClick={() => alert("Hii")}>Hello</button>
         </Collapsible>
    </div>
}

export default ParagonTools