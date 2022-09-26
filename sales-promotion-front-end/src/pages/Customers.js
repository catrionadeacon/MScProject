import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { CustomerListComponent, CustomerListComponentAccM, PricebookComponent } from "../components/page-components/CustomersComponents";
import { Link, useParams } from 'react-router-dom';
import { Button } from "../components/general/Button";

export function Customers() {

    const userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));

    if(userRoleCode.has("AccM")){
        return (
            <div className='page'>
                <div className='pageTop'>
                    <MdIcons.MdOutlinePeopleAlt className='pageTitleIcon'/>
                    <h2 className='pageTitle'>CUSTOMERS</h2>
                </div>
                <div className='pageCentre'>
                    <CustomerListComponentAccM/>
                </div>
            </div>
    
        )
    }
    else {
        return (
            <div className='page'>
                <div className='pageTop'>
                    <MdIcons.MdOutlinePeopleAlt className='pageTitleIcon'/>
                    <h2 className='pageTitle'>CUSTOMERS</h2>
                </div>
                <div className='pageCentre'>
                    <CustomerListComponent/>
                </div>
            </div>
    
        )
    }
}

export function Pricebook(){

    var rolesJson = localStorage.getItem("roles");
    var userRoleCode = new Set();
    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    const { id } = useParams();

    if(userRoleCode.has("AccM")){
        return (
            <div className='page'>
                <div className='pageTopContainer'>
                    <div className='pageTop'>
                        <RiIcons.RiPriceTag2Line className='pageTitleIcon'/>
                        <h2 className='pageTitle'>PRICEBOOK | {id}</h2>
                    </div>
                    <div>
                        <Link to={`/pricebook/${id}/price_change`}>
                            <Button text="Request Price Change"/>
                        </Link>
                    </div>
                </div>
                <div className='pageCentre'>
                    <PricebookComponent id={id}/>
                </div>
            </div>
    
        )
    }
    else {
        return (
            <div className='page'>
                <div className='pageTop'>
                    <RiIcons.RiPriceTag2Line className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PRICEBOOK | {id}</h2>
                </div>
                <div className='pageCentre'>
                    <PricebookComponent id={id}/>
                </div>
            </div>
    
        )
    }
}