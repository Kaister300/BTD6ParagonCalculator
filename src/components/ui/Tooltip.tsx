import { type PropsWithChildren } from "react";

type TooltipProps = {
    bodyText: string;
    tooltipText: string;
}

function Tooltip(props: Readonly<PropsWithChildren<TooltipProps>>) {
    return <div className="group relative inline-block">
        <span className="underline decoration-dotted">{props.bodyText}</span>
        {props.children}
        <span className="invisible w-50 bg-black text-white text-center rounded-md p-1 absolute z-1 bottom-5/4 left-1/2 ml-[-60px] opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100">{props.tooltipText}</span>
    </div>
}

export default Tooltip