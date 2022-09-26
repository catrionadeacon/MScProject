import { useState } from "react";
import { FetchData, GetSelfReference, PostData } from "../../adapters/GeneralAdapter";
import { Button } from "../general/Button";
import { FormInput, FormSelect } from "../general/FormInput";
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Moment from 'moment';
import "../../styles/component.css";
import { GetPricebookProductOptions } from "../../adapters/PriceChangeAdapter";
import { BASE_URL } from "../../Constants";

export function ProductPriceChangeForm({id}) {

    const navigate = useNavigate();

    const userLink = sessionStorage.getItem("userLink");

    const date = Moment().format('DD/MM/YYYY');

    const url = `${BASE_URL}/api/products/${id}`;

    const data = FetchData({url});

    const selfRef = GetSelfReference({url});

    const [newPrice, setNewPrice] = useState(0);

    const handleChange = (e) => {
        e.preventDefault();
        setNewPrice(e.target.value);
    }

    const handleSubmit =() =>{

        const postUrl = `${BASE_URL}/api/priceChanges`;

        const submitPrice = newPrice;

        const newPriceChange = {
            product : selfRef,
            accountManager : userLink,
            date : date,
            status : 'AWAITING_APPROVAL',
            price : parseFloat(submitPrice)
        }

        PostData({postUrl, newPriceChange});

        navigate(-1);
    }

    return (
        <div className='component' style={{width: '450px'}}>
            <div className='titleContainer'>
                <AiIcons.AiOutlineForm className='componentTitleIcon'/>
                <h3 className='componentTitle'>Request New Price Change</h3>
            </div>
            <div>
                <div className='detailsTopRow'>
                    <ul className='detailsListBorder'>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>CATEGORY</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>PRODUCT</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>LANDED COST</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>STANDARD PRICE</span>
                        </li>
                    </ul>
                    <ul className='detailsList'>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>{data.category}</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>{data.sku} {data.description}</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>£{data.landedCost}</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>£{data.standardPrice}</span>
                        </li>
                    </ul>
                </div>
                <div className='detailsTitleContainer'>
                    <span className='detailsTitle'>NEW PRICE</span>
                </div>
                <form className="form">
                    <FormInput label="Requested Standard Price" type="number" step="0.01" onChange={handleChange}/>
                </form>
                <div className="buttonContainer">
                    <Button text="Submit Request" onClick={handleSubmit}/>
                    <Button text="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </div>
        </div>
    )


}

export function PricebookPriceChangeForm({id}) {

    const navigate = useNavigate();

    const date = Moment().format('DD/MM/YYYY');

    const url = `${BASE_URL}/api/customers/search/findByCustomerCode?customerCode=${id}`;

    const customerUrl = GetSelfReference({url});

    const productOptionsMap = GetPricebookProductOptions({id});

    const productOptions = Array.from(productOptionsMap.values()).map((p) => {return {value: p.product.sku, text: p.product.sku + " " + p.product.description}});

    const [price, setPrice] = useState(0);

    const [customerListPrice, setCustomerListPrice] = useState('')

    const [productData, setProductData] = useState('')

    const [selfRef, setSelfRef] = useState('');

    const handleChangePrice = (e) => {

        e.preventDefault();

        const newPrice = e.target.value;

        setPrice(newPrice);
    }

    const handleChange = (event) => {

        const pb = productOptionsMap.get(event.target.value);

        setProductData(pb.product);

        setCustomerListPrice(pb.customerListPrice);

        const refUrl = `${BASE_URL}/api/products/search/findBySku?sku=${event.target.value}`;

        const productRef = GetSelfReference({refUrl});

        setSelfRef(productRef);
    }

    const handleSubmit = () => {

        const userLink = sessionStorage.getItem("userLink");

        const submitPrice = price;

        const newPriceChange = {
            product : selfRef,
            accountManager : userLink,
            date : date,
            status : 'AWAITING_APPROVAL',
            price : parseFloat(submitPrice),
            customer: customerUrl
        }

        const postUrl = `${BASE_URL}/api/priceChanges`;

        PostData({postUrl, newPriceChange});

        navigate(-1);
    }

    return (
        <div className='component' style={{width: '450px'}}>
            <div className='titleContainer'>
                <AiIcons.AiOutlineForm className='componentTitleIcon'/>
                <h3 className='componentTitle'>Request New Price Change | {id}</h3>
            </div>
            <div className='content'>
                <div className='detailsTitleContainer'>
                    <span className='detailsTitle'>PRODUCT DETAILS</span>
                </div>
                <div className='detailsTopRow'>
                    <ul className='detailsListBorder'>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>CATEGORY</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>PRODUCT</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>LANDED COST</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>STANDARD PRICE</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsTitle'>CUSTOMER LIST PRICE</span>
                        </li>
                    </ul>
                    <ul className='detailsList'>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>{productData.category}</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>{productData.sku} {productData.description}</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>£{productData.landedCost}</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>£{productData.standardPrice}</span>
                        </li>
                        <li className='detailsItem'>
                            <span className='detailsItemText'>£{customerListPrice}</span>
                        </li>
                    </ul>
                </div>
                <div className='detailsTitleContainer'>
                    <span className='detailsTitle'>NEW PRICE</span>
                </div>
                <form className="form">
                    <FormSelect label="Select Product" options={productOptions} onChange={handleChange}/>
                    <FormInput label="Requested Customer List Price" type="number" step="0.01" onChange={handleChangePrice}/>
                </form>
                <div className="buttonContainer">
                    <Button text="Submit Request" onClick={handleSubmit}/>
                    <Button text="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </div>
        </div>
    )

}
