import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import "../styles/page.css";
import PriceChangeRequestTabs from "./page-tabs/PriceChangeRequestTabs"
import { PricebookPriceChangeRequestDetailsAccM, PricebookPriceChangeRequestDetailsCommM, PricebookPriceChangeRequestList, ProductPriceChangeRequestDetailsAccM, ProductPriceChangeRequestDetailsCommM, ProductPriceChangeRequestList } from "../components/page-components/PriceChangeRequestComponents";
import { useParams } from "react-router-dom";

export function PriceChangeRequests() {
    return (
        <div className='page'>
          <div className='titleAndTabs'>
            <div className='pageTop'>
              <IoIcons.IoIosRefresh className='pageTitleIcon'/>
              <h2 className='pageTitle'>PRICE CHANGE REQUESTS</h2>
            </div>
            <PriceChangeRequestTabs/>
          </div>
        </div>
      )
    
}

export function ProductPriceChangeRequests() {
    return (
        <ProductPriceChangeRequestList/>
    )
}

export function PricebookPriceChangeRequests() {
    return (
        <PricebookPriceChangeRequestList/>
    )
}

export function ProductPriceChangeRequestDetails() {

    const { id } = useParams();

    var rolesJson = localStorage.getItem("roles");
    
    var userRoleCode = new Set();

    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    if(userRoleCode.has("AccM")) {

        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PRICE CHANGE REQUEST DETAILS | {id}</h2>
                </div>
                <div className="pageCentre">
                    <ProductPriceChangeRequestDetailsAccM id={id}/>
                </div>
            </div>
        )

    }
    if(userRoleCode.has("CommM")) {

        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PRICE CHANGE REQUEST DETAILS | {id}</h2>
                </div>
                <div className="pageCentre">
                    <ProductPriceChangeRequestDetailsCommM id={id}/>
                </div>
            </div>
        )

    }
}

export function PricebookPriceChangeRequestDetails() {

    const { customerCode, id } = useParams();

    var rolesJson = localStorage.getItem("roles");
    
    var userRoleCode = new Set();

    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    if(userRoleCode.has("AccM")) {

        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PRICE CHANGE REQUEST DETAILS | {customerCode} | {id}</h2>
                </div>
                <div className="pageCentre">
                    <PricebookPriceChangeRequestDetailsAccM id={id} customerCode={customerCode}/>
                </div>
            </div>
        )

    }
    if(userRoleCode.has("CommM")) {

        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PRICE CHANGE REQUEST DETAILS | {customerCode} | {id}</h2>
                </div>
                <div className="pageCentre">
                    <PricebookPriceChangeRequestDetailsCommM id={id} customerCode={customerCode}/>
                </div>
            </div>
        )

    }
}