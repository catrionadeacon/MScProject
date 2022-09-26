import * as AiIcons from "react-icons/ai";
import { PafInputForm } from "../components/page-components/PafComponents";

export function Paf() {
    return (
        <div className='page'>
            <div className='pageTop'>
                <AiIcons.AiOutlineForm className='pageTitleIcon'/>
                <h2 className='pageTitle'>PAF INPUT</h2>
            </div>
            <div className='pageCentre'>
                <PafInputForm/>
            </div>
        </div>

    )
}