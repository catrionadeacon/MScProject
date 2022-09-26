import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { useParams } from "react-router-dom";
import { PromotionAnalysisComponent, PromotionPricesList, PromotionsList } from "../components/page-components/PromotionsComponents";
import "../styles/page.css";

export function Promotions() {

  return (
    <div className='page'>
      <div className='pageTop'>
        <BsIcons.BsGraphUp className='pageTitleIcon'/>
        <h2 className='pageTitle'>PROMOTIONS</h2>
      </div>
      <div className="pageCentre">
        <PromotionsList/>
      </div>
    </div>
  )
    
}

export function PromotionPrices() {

  const { id } = useParams();

  return (
    <div className='page'>
      <div className='pageTop'>
        <AiIcons.AiOutlineUnorderedList className='pageTitleIcon'/>
        <h2 className='pageTitle'>PROMOTION PRODUCTS</h2>
        <h2 className='titleSeparator'> | </h2>
        <h2 className='subTitle'>{id}</h2>
      </div>
      <div className="pageCentre">
        <PromotionPricesList id={id}/>
      </div>
    </div>
  )
}

export function PromotionAnalysis() {

  const { id } = useParams();

  return (
    <div className='page'>
      <div className='pageTop'>
        <AiIcons.AiOutlineBars className='pageTitleIcon'/>
        <h2 className='pageTitle'>PROMOTION ANALYSIS</h2>
        <h2 className='titleSeparator'> | </h2>
        <h2 className='subTitle'>{id}</h2>
      </div>
      <div className="pageCentre">
        <PromotionAnalysisComponent id={id}/>
      </div>
    </div>
  )
}