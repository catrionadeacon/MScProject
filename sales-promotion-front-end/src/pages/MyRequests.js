import * as BsIcons from "react-icons/bs";
import { MyRequestsComponent } from "../components/page-components/MyRequestsComponents";
import "../styles/page.css";

export function MyRequests() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <BsIcons.BsQuestionCircle className='pageTitleIcon'/>
                <h2 className='pageTitle'>PAF REQUESTS</h2>
            </div>
            <div className='pageCentre'>
            <MyRequestsComponent/>
            </div>
        </div>
    )
}