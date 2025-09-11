import { useState, type PropsWithChildren } from "react"

type CollapsibleProps = {
    title: string,
    initialOpen?: boolean,
}

function Collapsible(props: Readonly<PropsWithChildren<CollapsibleProps>>) {
    const [cardOpen, setCardOpen] = useState(props.initialOpen ?? true);

    function handleCollapsibleClick() {
        setCardOpen(!cardOpen);
    }

    const headerClasses = "bg-[#C9F0FF] flex p-[1rem] " + (
        cardOpen ? "rounded-t-2xl border-b-2" : "rounded-2xl"
    );

    return <section className="bg-[#EAFFFD] block max-w-208 mx-auto mt-2 rounded-b-2xl">
        <div className={headerClasses}>
            <h1 className="inline m-0 text-[2rem] font-semibold">{props.title}</h1>
            <button className="ml-auto cursor-pointer" onClick={handleCollapsibleClick}>{cardOpen ? "Close" : "Open"}</button>
        </div>
        {/* Shows children if card is opened */}
        {cardOpen ? (
            <div className="p-3">
                {cardOpen ? props.children : null}
            </div>
        ) : null}
    </section>
}

export default Collapsible