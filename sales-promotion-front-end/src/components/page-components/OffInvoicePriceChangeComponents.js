import { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom/dist";
import { FetchData, PatchUpdatedData } from "../../adapters/GeneralAdapter";
import { FetchPromotionPricesData } from "../../adapters/PromotionPricesAdapter";
import { OffInvoicePriceChangeInColumns, OffInvoicePriceChangeOutColumns } from "../../datagrid-columns/OffInvoicePriceChangeDatagrid";
import { Button } from "../general/Button";
import Marker from "../general/Marker";
import * as AiIcons from "react-icons/ai";
import "../../styles/component.css";
import { BASE_URL } from "../../Constants";

export function PriceChangesInList() {

    const url = `${BASE_URL}/api/promotionPrices/search/findBySageStatusAndPromotion_StatusAndPromotion_PromotionType?sageStatus=AWAITING_CHANGE&status=APPROVED&promotionType=OID&projection=PromotionPricePromotionView`;

    const data = FetchPromotionPricesData({url});

    return (
        <Table getRowId={(row) => row._links.self.href} columns={OffInvoicePriceChangeInColumns} data={data}/>
    )
}

export function PriceChangesOutList() {
    
    const url = `${BASE_URL}/api/promotionPrices/search/findBySageStatusNotAndPromotion_StatusAndPromotion_PromotionType?sageStatus=AWAITING_CHANGE&status=APPROVED&promotionType=OID&projection=PromotionPricePromotionView`;

    const data = FetchPromotionPricesData({url});

    return (
        <Table getRowId={(row) => row._links.self.href} columns={OffInvoicePriceChangeOutColumns} data={data}/>
    )
}

export function PrinceChangeInDetailsComponent({pafRef, sku}) {

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/promotions/search/findByPafRef?pafRef=${pafRef}`;

    const data = FetchData({url});

    const products = FetchPromotionPricesData({url});

    const product = products.filter(pp => pp.productSku === sku)[0];

    const[promoPriceLink, setPromoPriceLink] = useState([]);

    setPromoPriceLink(product._links.self.href.replace('{?projection}', ''));

    const handleClick = () => {

        const newPromotionPrice = {
            productSku: product.productSku,
            pafReference: product.pafReference,
            promoPrice: product.promoPrice,
            promoVol: product.promoVol,
            offPromoVol: product.offPromoVol,
            retroFunding: product.retroFunding,
            customerListPrice: product.customerListPrice,
            sageStatus: 'CHANGED_IN_SAGE'
        }

        PatchUpdatedData({promoPriceLink, newPromotionPrice});

        navigate(-1);
    }

    if(product.product !== undefined){
        return(
            <div className='page'>
                <div className='pageTop'>
                    <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PRICE CHANGE IN DETAILS | {pafRef} | {sku}</h2>
                </div>
                <div className='pageCentre'>
                    <div className='component'>
                        <span className='detailsTitle'>PROMOTION DETAILS</span>
                        <ul className='detailsList'>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Paf Reference:</span>
                                <span className='detailsItemText'>{pafRef}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Promotion Type:</span>
                                <span className='detailsItemText'><Marker type={data.promotionType}/></span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Customer:</span>
                                <span className='detailsItemText'>{data.customerCode}</span>
                            </li>
                        </ul>
                        <span className='detailsTitle'>PRODUCT DETAILS</span>
                        <ul className='detailsList'>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Sku:</span>
                                <span className='detailsItemText'>{sku}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Cetegory:</span>
                                <span className='detailsItemText'>{product.product.category}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Group:</span>
                                <span className='detailsItemText'>{product.product.productGroup}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Description:</span>
                                <span className='detailsItemText'>{product.product.description}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Standard Price:</span>
                                <span className='detailsItemText'>£{product.product.standardPrice}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Landed Cost:</span>
                                <span className='detailsItemText'>£{product.product.landedCost}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Customer List Price:</span>
                                <span className='detailsItemText'>£{product.customerListPrice}</span>
                            </li>
                        </ul>
                        <span className='detailsTitle'>SAGE PRICE CHANGE DETAILS</span>
                        <ul className='detailsList'>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Change In Date:</span>
                                <span className='detailsItemText'>{data.sageStart}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Promotional Price:</span>
                                <span className='detailsItemText'>£{product.promoPrice}</span>
                            </li>
                        </ul>
                        <div className='buttonContainer'>
                            <Button text={'Changes Submitted in Sage'} onClick={handleClick}/>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export function PrinceChangeOutDetailsComponent({pafRef, sku}) {

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/promotions/search/findByPafRef?pafRef=${pafRef}`;

    const data = FetchData({url});

    const products = FetchPromotionPricesData({url});

    const product = products.filter(pp => pp.productSku === sku)[0];

    const[promoPriceLink, setPromoPriceLink] = useState([]);

    setPromoPriceLink(product._links.self.href.replace('{?projection}', ''));

    const handleClick = () => {

        const newPromotionPrice = {
            productSku: product.productSku,
            pafReference: product.pafReference,
            promoPrice: product.promoPrice,
            promoVol: product.promoVol,
            offPromoVol: product.offPromoVol,
            retroFunding: product.retroFunding,
            customerListPrice: product.customerListPrice,
            sageStatus: 'COMPLETE'
        }

        PatchUpdatedData({promoPriceLink, newPromotionPrice});

        navigate(-1);
    }

    if(product.product !== undefined){
        return(
            <div className='page'>
                <div className='pageTop'>
                    <AiIcons.AiOutlineAlignLeft className='pageTitleIcon'/>
                    <h2 className='pageTitle'>PRICE CHANGE OUT DETAILS | {pafRef} | {sku}</h2>
                </div>
                <div className='pageCentre'>
                    <div className='component'>
                        <span className='detailsTitle'>PROMOTION DETAILS</span>
                        <ul className='detailsList'>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Paf Reference:</span>
                                <span className='detailsItemText'>{pafRef}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Promotion Type:</span>
                                <span className='detailsItemText'><Marker type={data.promotionType}/></span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Customer:</span>
                                <span className='detailsItemText'>{data.customerCode}</span>
                            </li>
                        </ul>
                        <span className='detailsTitle'>PRODUCT DETAILS</span>
                        <ul className='detailsList'>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Sku:</span>
                                <span className='detailsItemText'>{sku}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Cetegory:</span>
                                <span className='detailsItemText'>{product.product.category}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Group:</span>
                                <span className='detailsItemText'>{product.product.productGroup}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Product Description:</span>
                                <span className='detailsItemText'>{product.product.description}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Standard Price:</span>
                                <span className='detailsItemText'>£{product.product.standardPrice}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Landed Cost:</span>
                                <span className='detailsItemText'>£{product.product.landedCost}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Customer List Price:</span>
                                <span className='detailsItemText'>£{product.customerListPrice}</span>
                            </li>
                        </ul>
                        <span className='detailsTitle'>SAGE PRICE CHANGE DETAILS</span>
                        <ul className='detailsList'>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Change Out Date:</span>
                                <span className='detailsItemText'>{data.sageEnd}</span>
                            </li>
                            <li className='detailsItem'>
                                <span className='detailsHeaderText'>Customer List Price:</span>
                                <span className='detailsItemText'>£{product.customerListPrice}</span>
                            </li>
                        </ul>
                        <div className='buttonContainer'>
                            <Button text={'Changes Reverted in Sage'} onClick={handleClick}/>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
