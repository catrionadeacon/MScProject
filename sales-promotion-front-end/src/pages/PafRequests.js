import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { PafRequestDetailsAccM, PafRequestDetailsCommM, PafRequestDetailsStkM, PafRequestsList } from "../components/page-components/PafRequestsComponents";
import "../styles/page.css";
import { useParams } from "react-router-dom";


export function PafRequests() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <IoIcons.IoIosPaper className='pageTitleIcon'/>
            <h2 className='pageTitle'>PAF REQUESTS</h2>
        </div>
            <div className='pageCentre'>
                <PafRequestsList/>
            </div>
        </div>

    )
}

export function PafRequestDetails() {

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
                    <AiIcons.AiOutlineBars className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PAF REQUEST DETAILS</h2>
                    <h2 className='titleSeparator'> | </h2>
                    <h2 className='subTitle'>{id}</h2>
                </div>
                <div className="pageCentre">
                    <PafRequestDetailsAccM id={id}/>
                </div>
            </div>
        )
    }
    if(userRoleCode.has("StkM")) {
        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineBars className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PAF REQUEST DETAILS</h2>
                    <h2 className='titleSeparator'> | </h2>
                    <h2 className='subTitle'>{id}</h2>
                </div>
                <div className="pageCentre">
                    <PafRequestDetailsStkM id={id}/>
                </div>
            </div>
        )
    }
    if(userRoleCode.has("CommM")){
        return (
            <div className="page">
                <div className='pageTop'>
                    <AiIcons.AiOutlineBars className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PAF REQUEST DETAILS</h2>
                    <h2 className='titleSeparator'> | </h2>
                    <h2 className='subTitle'>{id}</h2>
                </div>
                <div className="pageCentre">
                    <PafRequestDetailsCommM id={id}/>
                </div>
            </div>
        )
    }
}