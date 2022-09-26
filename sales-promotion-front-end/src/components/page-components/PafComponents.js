import { DataGrid } from '@mui/x-data-grid';
import Moment from 'moment';
import { useState } from 'react';
import { PostDataReturnSelfHref } from '../../adapters/GeneralAdapter';
import { PafCategoryOptions, PafCustomerOptions, PafGroupOptions, PafProductOptions } from "../../adapters/PafAdapter";
import { PafProductColumns } from '../../datagrid-columns/PafDatagridColumns';
import { Button } from '../general/Button';
import { FormInput, FormInputDate, FormRadio, FormSelect, ProductInputMedium, ProductInputSmall, ProductSelect } from '../general/FormInput';
import * as AiIcons from "react-icons/ai";
import "../../styles/form.css";
import "../../styles/component.css";
import { BASE_URL } from "../../Constants";

export function PafInputForm() {

    const CustomerOptionsMap = PafCustomerOptions();

    const CustomerOptions = Array.from(CustomerOptionsMap.values()).map((c) => {return {value: c.customerCode, text: c.customerCode + " " + c.name}});

    const CategoryOptions = PafCategoryOptions();

    const GroupOptions = PafGroupOptions();

    const date = Moment().format('DD/MM/YYYY');

    const PromoTypeOptions = [
        {name: "promoType", id:"retro", value: "RETRO", text: "Retro"},
        {name: "promoType", id:"oid", value: "OID", text: "OID"}
    ]

    const initialProducts = []

    const [products, setProducts] = useState(initialProducts);

    const [customer, setCustomer] = useState('ASA001');

    const [category, setCategory] = useState('06 - Ambient');

    const [group, setGroup] = useState('K1-Osem Kosher');

    const [pafResponse, setPafResponse] = useState('');

    const encodedCustomer = encodeURIComponent(customer);

    const encodedGroup = encodeURIComponent(group);

    const encodedCategory = encodeURIComponent(category);

    var pricebookUri = `${BASE_URL}/api/pricebooks/search/findByCustomerCodeAndProduct_CategoryAndProduct_ProductGroup?customerCode=${encodedCustomer}&productGroup=${encodedGroup}&productCategory=${encodedCategory}`;

    const pricebookMap = PafProductOptions({pricebookUri});

    const ProductOptions = Array.from(pricebookMap.values()).map((pb) => {return {value: pb.product.sku, text: pb.product.sku + " " + pb.product.description}});

    const [product, setProduct] = useState({
        productSku: '',
        promoPrice: '',
        offPromoVol: '',
        promoVol: '',
        retroFunding: '',
        customerInvestmentStandardBusiness: '',
        grossProfitStandardBusiness: '',
        promotionPriceReduction: '',
        expectedClaim: '',
        customerInvestmentOnPromo: '',
        grossProfitOnPromo: '',
        customerListPrice: '',
        standardPrice: '',
        landedCost: '',
        selfRef: '',
        promotionPriceRef: ''
    });

    const [pafObject, setPafObject] = useState({
        customerCode: '',
        productGroup: '',
        pafRef: '',
        promotionRef: '',
        promotionType: '',
        status: 'AWAITING_APPROVAL',
        sageStart: '',
        sageEnd: '',
        storeStart: '',
        storeEnd: '',
        mechanic: '',
        entryDate: date,
        customer: ''
    });

    const handleChangeOffPromoVol = (event) => {

        var iOffPromoVol = parseInt(event.target.value);

        setProduct({...product,
            offPromoVol : iOffPromoVol,
        });
    }

    const handleChangePromoVol = (event) => {

        var iExpectedClaim = 0;

        var iPromoVol = parseInt(event.target.value);

        iExpectedClaim = iPromoVol * product.retroFunding;

        setProduct({...product,
            promoVol : iPromoVol,
            expectedClaim : iExpectedClaim
        });
    }

    const handleChangePromoPrice = (event) => {

        var iPromoPrice = parseFloat(event.target.value);

        var iPromoPriceReduction = 0;

        var iCustomerInvestmentOnPromo = 0;

        var iGrossProfitOnPromo = 0;

        iPromoPriceReduction = parseFloat((((product.customerListPrice - iPromoPrice) / product.customerListPrice) * 100).toFixed(1));

        iCustomerInvestmentOnPromo = parseFloat((((product.standardPrice - iPromoPrice + product.retroFunding) / product.standardPrice) * 100).toFixed(1));

        iGrossProfitOnPromo = parseFloat((((iPromoPrice - product.retroFunding - product.landedCost) / product.standardPrice) * 100).toFixed(1));

        setProduct({...product,
            promoPrice : iPromoPrice,
            promotionPriceReduction : iPromoPriceReduction,
            customerInvestmentOnPromo : iCustomerInvestmentOnPromo,
            grossProfitOnPromo : iGrossProfitOnPromo
        });
    }

    const handleChangeRetroFunding = (event) => {
        var iExpectedClaim = 0;

        var iRetroFunding = parseFloat(event.target.value);

        var iCustomerInvestmentOnPromo = 0;

        var iGrossProfitOnPromo = 0;

        iExpectedClaim = product.promoVol * event.target.value;

        iGrossProfitOnPromo = parseFloat((((product.promoPrice - event.target.value - product.landedCost) / product.standardPrice) * 100).toFixed(1));

        iCustomerInvestmentOnPromo = parseFloat((((product.standardPrice - product.promoPrice + iRetroFunding) / product.standardPrice) * 100).toFixed(1));

        
        setProduct({...product,
            retroFunding : iRetroFunding,
            expectedClaim : iExpectedClaim,
            customerInvestmentOnPromo : iCustomerInvestmentOnPromo,
            grossProfitOnPromo : iGrossProfitOnPromo,

        });
    }

    const handleChangeProduct = (event) => {

        const pb = pricebookMap.get(event.target.value);

        let selfHref = pb.product._links.self.href.replace("{?projection}","");

        setProduct({...product,
            productSku : pb.product.sku,
            customerListPrice: pb.customerListPrice,
            landedCost: pb.product.landedCost,
            standardPrice: pb.product.standardPrice,
            customerInvestmentStandardBusiness: parseFloat((((pb.product.standardPrice - pb.customerListPrice) / pb.product.standardPrice) * 100).toFixed(1)),
            grossProfitStandardBusiness: parseFloat((((pb.customerListPrice - pb.product.landedCost) / pb.product.standardPrice) * 100).toFixed(1)),
            selfRef: selfHref
        });
    }

    const handleChangeCustomer = (event) => {

        const customer = CustomerOptionsMap.get(event.target.value);

        setCustomer(event.target.value);

        setPafObject({...pafObject,
            customer: customer._links.self.href,
            customerCode: event.target.value
        })
    }

    const handleChangeCategory = (event) => {

        setCategory(event.target.value);

    }

    const handleChangeGroup = (event) => {

        setGroup(event.target.value);

        setPafObject({...pafObject,
            productGroup: event.target.value
        })
    }

    const handleChangePaf = (event) => {
        setPafObject({...pafObject,
            [event.target.name] : event.target.value});
    }

    const handleChangePafDate = (event) => {
        setPafObject({...pafObject,
            [event.target.name] : Moment(event.target.value).format('DD/MM/YYYY')});
    }

    function HandleSubmit() {
        
        const url = `${BASE_URL}/api/promotions`;

        const newPaf = pafObject;

        const response = PostDataReturnSelfHref({url, newPaf});

        setPafResponse(response);

    }

    function HandleAdd() {

        const pb = pricebookMap.get(product.productSku);

        const url = pb.product._links.self.href;

        const postUrl = `${BASE_URL}/api/promotionPrices`;

        var newProduct = {
            promoPrice: product.promoPrice,
            promoVol: product.promoVol,
            offPromoVol: product.offPromoVol,
            retroFunding: product.retroFunding,
            productSku: product.productSku,
            product: url,
            promotion: pafResponse,
            pafReference: pafObject.pafRef,
            promotionPriceRef: '',
            sageStatus: 'AWAITING_CHANGE'
        };

        var newProductResponse = product;

        newProductResponse.promotionPriceRef = PostDataReturnSelfHref({postUrl, newProduct})

        const newProducts = products.concat(newProductResponse);

        setProducts(newProducts);
    }

    return (
        <div className='component'>
            <div className='titleContainer'>
                <AiIcons.AiOutlineForm className='componentTitleIcon'/>
                <h3 className='componentTitle'>Input New PAF</h3>
            </div>
            <div style={{border:'1px solid #00bcd4'}}>
                <div className="detailsSectionContainer">
                    <div className="wrapForm" style={{marginBottom:'0px', paddingBottom:'0px'}}>
                        <FormInput label="PAF Reference" name="pafRef" type="text" onChange={handleChangePaf}/>
                        <FormInput label="Promotion Reference" name="promotionRef" type="text" onChange={handleChangePaf}/>
                        <FormSelect label="Select Customer" name="selectCustomer" id="selectCustomer" options={CustomerOptions} onChange={handleChangeCustomer}/>
                        <FormRadio label="Select Promotion Type" name="promotionType" options={PromoTypeOptions} onChange={handleChangePaf}/>
                        <FormSelect label="Select Product Category" name="selectCategory" id="selectCategory" options={CategoryOptions} onChange={handleChangeCategory}/>
                        <FormSelect label="Select Product Group" name="selectGroup" id="selectGroup" options={GroupOptions} onChange={handleChangeGroup}/>
                        <FormInputDate label="Sage Start Date" name="sageStart" type="date" onChange={handleChangePafDate}/>
                        <FormInputDate label="Sage End Date" name="sageEnd" type="date" onChange={handleChangePafDate}/>
                        <FormInputDate label="Store Start Date" name="storeStart" type="date" onChange={handleChangePafDate}/>
                        <FormInputDate label="Store End Date" name="storeEnd" type="date" onChange={handleChangePafDate}/>
                        <FormInput label="Mechanic" name="mechanic" type="text" onChange={handleChangePaf}/>
                    </div>
                    
                </div>
                <div className="buttonContainer" style={{marginBottom:'20px', marginRight:'20px'}}>
                    <Button text="Save PAF" onClick={HandleSubmit}/>
                </div>
            </div>
            <div className='titleContainer'>
                <AiIcons.AiOutlineShopping className='componentTitleIcon'/>
                <h3 className='componentTitle'>Products</h3>
            </div>
            <div style={{border:'1px solid #00bcd4'}}>
                <div className="detailsSectionContainer">
                    <div className="wrapForm" style={{marginBottom:'0px', paddingBottom:'0px'}}>
                        <tr>
                            <td>
                                <ProductSelect label="Select Product" name="productSku" id="selectProduct" options={ProductOptions} onChange={handleChangeProduct}/>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">Landed Cost</label>
                                <p className="formVaueText">£{product.landedCost}</p>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">Standard Price</label>
                                <p className="formVaueText">£{product.standardPrice}</p>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">Customer List Price</label>
                                <p className="formVaueText">£{product.customerListPrice}</p>
                            </td>
                            <td>
                                <ProductInputSmall label="Promotion Price" name="promoPrice" type="number" step="0.01" onChange={handleChangePromoPrice}/>
                            </td>
                            <td>
                                <ProductInputMedium label="Volumes not Promoting" name="offPromoVol" type="number" onChange={handleChangeOffPromoVol}/>
                            </td>
                            <td>
                                <ProductInputMedium label="Volumes Promoting" name="promoVol" type="number" onChange={handleChangePromoVol}/>
                            </td>
                            <td>
                                <ProductInputSmall label="Retro Funding" name="retroFunding" type="number" step="0.01" onChange={handleChangeRetroFunding} defaultValue={0}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="formValue">
                                <label className="formValueHeader">CI Standard Business %</label>
                                <p className="formVaueText">{product.customerInvestmentStandardBusiness}</p>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">GP Standard Business %</label>
                                <p className="formVaueText">{product.grossProfitStandardBusiness}</p>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">Promotion Price Reduction %</label>
                                <p className="formVaueText">{product.promotionPriceReduction}</p>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">Expected Claim Total</label>
                                <p className="formVaueText">{product.expectedClaim}</p>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">CI On Promotion %</label>
                                <p className="formVaueText">{product.customerInvestmentOnPromo}</p>
                            </td>
                            <td className="formValue">
                                <label className="formValueHeader">GP On Promotion %</label>
                                <p className="formVaueText">{product.grossProfitOnPromo}</p>
                            </td>
                        </tr>
                    </div>
                </div>
                <div className="buttonContainer" style={{marginBottom:'20px', marginRight:'20px'}}>
                    <Button text="Add Product" onClick={HandleAdd}/>
                </div>
            </div>
            <div className="detailsSectionContainer" style={{marginTop: '30px', height: 220, width: '100%'}} >
                <DataGrid
                    rowHeight={35}
                    rows={products}
                    disableSelectionOnClick
                    columns={PafProductColumns}
                    checkboxSelection
                    getRowId={(row) => row.productSku}
                    sx={{borderColor: '#00bcd4'}}
                    hideFooter={true}
                />
            </div>
        </div>
    )


}