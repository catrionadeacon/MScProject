import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { useParams } from "react-router-dom";
import { PriceChangesInList, PriceChangesOutList, PrinceChangeInDetailsComponent, PrinceChangeOutDetailsComponent } from "../components/page-components/OffInvoicePriceChangeComponents";
import "../styles/page.css";
import { OffInvoicePriceChangeTabs } from "./page-tabs/OffInvoicePriceChangeTabs";

export function OffInvoicePriceChanges() {
    return (
        <div className='page'>
            <div className='titleAndTabs'>
                <div className='pageTop'>
                    <IoIcons.IoIosRefresh className='pageTitleIcon'/>
                    <h2 className='pageTitle'>OFF INVOICE PRICE CHANGES</h2>
                </div>
                <OffInvoicePriceChangeTabs/>
            </div>
        </div>

    )
}

export function PriceChangesIn() {
    return (
        <div className='page'>
            <div className='pageCentre'>
                <PriceChangesInList/>
            </div>
        </div>

    )
}

export function PriceChangesOut() {
    return (
        <div className='page'>
            <div className='pageCentre'>
                <PriceChangesOutList/>
            </div>
        </div>

    )
}

export function PriceChangeInDetails() {

    const { pafRef, sku } = useParams();

    return (
        <div className="page">
            <div className='pageTop'>
                <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                <h2 className='pageTitle'>PRICE CHANGE IN DETAILS | {pafRef} | {sku}</h2>
            </div>
        <div className="pageCentre">
            <PrinceChangeInDetailsComponent pafRef={pafRef} sku={sku}/>
        </div>
        </div>
    )
}

export function PriceChangeOutDetails() {

    const { pafRef, sku } = useParams();

    return (
        <div className="page">
            <div className='pageTop'>
                <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                <h2 className='pageTitle'>PRICE CHANGE OUT DETAILS | {pafRef} | {sku}</h2>
            </div>
            <div className="pageCentre">
                <PrinceChangeOutDetailsComponent pafRef={pafRef} sku={sku}/>
            </div>
        </div>
    )
}