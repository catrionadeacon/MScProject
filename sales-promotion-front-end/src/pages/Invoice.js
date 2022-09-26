import { InvoiceRequestsTable, InvoiceDetailsComponentAccM, InvoiceDetailsComponentFinM, InvoiceListComponent, InvoiceInputForm } from "../components/page-components/InvoiceComponents"
import * as TbIcons from "react-icons/tb";
import * as AiIcons from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { InvoiceTabs } from "./page-tabs/InvoiceTabs";

export function Invoice() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <TbIcons.TbFileInvoice className='pageTitleIcon'/>
                <h2 className='pageTitle'>INVOICE</h2>
            </div>
            <InvoiceTabs/>
        </div>

    )
}

export function InputInvoice() {
    return (
        <div className='page'>
          <div className='pageCentre'>
            <InvoiceInputForm/>
          </div>
        </div>
    )
    
}

export function InvoiceList() {
    return (
        <div className='page'>
            <div className='pageCentre'>
                <InvoiceListComponent/>
            </div>
        </div>

    )
}

export function InvoiceRequests() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <TbIcons.TbFileInvoice className='pageTitleIcon'/>
                <h2 className='pageTitle'>INVOICE REQUESTS</h2>
            </div>
            <div className='pageCentre'>
                <InvoiceRequestsTable/>
            </div>
        </div>

    )
}

export function InvoiceDetails() {

    const { id } = useParams();

    var rolesJson = localStorage.getItem("roles");

    var userRoleCode = new Set();

    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }


    if(userRoleCode.has("AccM")){
        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineBars className='pageTitleIcon'/>
                    <h2 className='pageTitle'>INVOICE DETAILS | {id}</h2>
                </div>
                <div className="pageCentre">
                    <InvoiceDetailsComponentAccM id={id}/>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineBars className='pageTitleIcon'/>
                    <h2 className='pageTitle'>INVOICE DETAILS | {id}</h2>
                </div>
                <div className="pageCentre">
                    <InvoiceDetailsComponentFinM id={id}/>
                </div>
            </div>
        )
    }
}