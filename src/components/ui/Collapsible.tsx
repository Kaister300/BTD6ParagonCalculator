import { useState, type PropsWithChildren } from "react"

type CollapsibleProps = {
    title: string,
    subtitle?: string,
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

    return <section className="bg-[#EAFFFD] block max-w-208 mx-auto mt-3 rounded-b-2xl">
        <div className={headerClasses}>
            <div>
                <h1 className="m-0 text-[2rem] font-semibold leading-none">{props.title}</h1>
                {props.subtitle && (
                    <h2 className="italic text-[1rem]">{props.subtitle}</h2>
                )}
            </div>
            <button className="ml-auto cursor-pointer" onClick={handleCollapsibleClick}>{cardOpen ? "Close" : "Open"}</button>
        </div>
        {/* Shows children if card is opened */}
        {cardOpen ? (
            <div className="p-4">
                {cardOpen ? props.children : null}
            </div>
        ) : null}
    </section>
}

export default Collapsible