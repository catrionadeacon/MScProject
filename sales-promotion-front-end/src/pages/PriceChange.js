import * as IoIcons from "react-icons/io";
import { useParams } from 'react-router-dom';
import { PricebookPriceChangeForm, ProductPriceChangeForm } from "../components/page-components/PriceChangeComponents";
import "../styles/page.css";

export function ProductPriceChange() {

    const { id } = useParams();

    return (
        <div className='page'>
          <div className='pageTop'>
            <IoIcons.IoIosRefresh className='pageTitleIcon'/>
            <h2 className='pageTitle'>PRODUCT PRICE CHANGE</h2>
          </div>
          <div className='pageCentre'>
            <ProductPriceChangeForm id={id}/>
          </div>
        </div>
      )
    
}

export function PricebookPriceChange() {

    const {id} = useParams();

    return (
        <div className='page'>
            <div className='pageTop'>
                <IoIcons.IoIosRefresh className='pageTitleIcon'/>
                <h2 className='pageTitle'>PRICEBOOK PRICE CHANGE</h2>
            </div>
            <div className='pageCentre'>
                <PricebookPriceChangeForm id={id}/>
            </div>
        </div>
    )
}