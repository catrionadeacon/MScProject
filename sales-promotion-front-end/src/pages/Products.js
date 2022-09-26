import "../styles/page.css";
import * as AiIcons from "react-icons/ai";
import { ProductsList } from "../components/page-components/ProductComponents";

export function Products() {
    return (
        <div className='page'>
          <div className='pageTopContainer'>
            <div className='pageTop'>
              <AiIcons.AiOutlineShopping className='pageTitleIcon'/>
              <h2 className='pageTitle'>PRODUCTS</h2>
            </div>
          </div>
          <div className='pageCentre'>
            <ProductsList/>
          </div>
        </div>

    )
}