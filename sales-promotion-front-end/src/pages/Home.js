import "../styles/page.css"
import * as AiIcons from "react-icons/ai";
import { Dashboard } from "../components/page-components/HomeComponents";

export function Home() {
    return (
        <div className="page">
            <div className="pageTop">
                <AiIcons.AiOutlineHome className='pageTitleIcon'/>
                <h2 className='pageTitle'>DASHBOARD</h2>
            </div>
            <div className="pageCentre">
                <Dashboard/>
            </div>
        </div>
    )
}