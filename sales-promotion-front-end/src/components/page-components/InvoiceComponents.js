import { GetInvoiceCustomerOptions, GetInvoicesData, GetMatchingPromotions, InvoiceFetchCustomerProducts, PostInvoiceLines } from "../../adapters/InvoiceAdapter";
import { InvoiceColumns, InvoiceLineItemColumns, InvoicePafSelectColumns } from "../../datagrid-columns/InvoiceDatagridColumns";
import Table from "../general/Table";
import "../../styles/component.css";
import "../../styles/form.css";
import { ApproveButton, Button, RejectButton } from "../general/Button";
import Marker from "../general/Marker";
import { DeleteData, FetchData, GetSelfReference, PatchUpdatedData, PostDataReturnSelfHref } from "../../adapters/GeneralAdapter";
import { useNavigate } from "react-router-dom/dist";
import { DataGrid } from '@mui/x-data-grid';
import * as AiIcons from "react-icons/ai";
import { FormInput, FormInputDate, FormInputNumber, FormSelect } from "../general/FormInput";
import { useState } from "react";
import Moment from 'moment';
import { BASE_URL } from "../../Constants";

export function InvoiceRequestsTable() {

    const url = `${BASE_URL}/api/invoices/search/findByApprovalStatus?approvalStatus=AWAITING_APPROVAL`;

    const data = GetInvoicesData({url});

    return (
        <Table getRowId={(row) => row._links.self.href} columns={InvoiceColumns} data={data}/>
    )
}

export function InvoiceDetailsComponentAccM({id}) {

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/invoices/search/findByInvoiceReference?invoiceReference=${id}`;

    const data = FetchData({url});

    const selfRef = GetSelfReference({url});

    const handleReject = () => {

        const newInvoice = {
            invoiceDate: data.invoiceDate,
            entryDate: data.entryDate,
            periodStart: data.periodStart,
            periodEnd: data.periodEnd,
            invoiceReference: data.invoiceReference,
            approvalStatus: 'REJECTED',
            totalInvoiced: data.totalInvoiced
        }

        PatchUpdatedData({selfRef, newInvoice});

        navigate(-1);
    }

    const handleApprove = () => {

        const newInvoice = {
            invoiceDate: data.invoiceDate,
            entryDate: data.entryDate,
            periodStart: data.periodStart,
            periodEnd: data.periodEnd,
            invoiceReference: data.invoiceReference,
            approvalStatus: 'APPROVED',
            totalInvoiced: data.totalInvoiced
        }

        PatchUpdatedData({selfRef, newInvoice});

        navigate(-1);
    
    }

    return (
        <div className="component" style={{width: '450px'}}>
            <ul className='detailsList'>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Invoice Reference:</span>
                  <span className='detailsItemText'>{data.invoiceReference}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Invoice Total:</span>
                  <span className='detailsItemText'>{data.totalInvoiced}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Entry Date:</span>
                  <span className='detailsItemText'>{data.entryDate}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Invoice Date:</span>
                  <span className='detailsItemText'>{data.invoiceDate}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Invoice Period Start:</span>
                  <span className='detailsItemText'>{data.periodStart}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Invoice Period End:</span>
                  <span className='detailsItemText'>{data.periodEnd}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Status:</span>
                  <Marker type={data.approvalStatus}/>
                </li>
              </ul>
              <div className='buttonContainer'>
                <ApproveButton onClick={handleApprove}/>
                <RejectButton onClick={handleReject}/>
              </div>
        </div>
    )
}

export function InvoiceDetailsComponentFinM({id}) {

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/invoices/search/findByInvoiceReference?invoiceReference=${id}`;

    const data = FetchData({url});

    const selfRef = GetSelfReference({url});

    const handleCancelRequest = () => {

        DeleteData(selfRef);

        navigate(-1);
    
    }

    if(data.approvalStatus === 'AWAITING_APPROVAL'){

        return (
            <div className="component" style={{width: '450px'}}>
                <ul className='detailsList'>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Reference:</span>
                    <span className='detailsItemText'>{data.invoiceReference}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Total:</span>
                    <span className='detailsItemText'>{data.totalInvoiced}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Entry Date:</span>
                    <span className='detailsItemText'>{data.entryDate}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Date:</span>
                    <span className='detailsItemText'>{data.invoiceDate}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Period Start:</span>
                    <span className='detailsItemText'>{data.periodStart}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Period End:</span>
                    <span className='detailsItemText'>{data.periodEnd}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Status:</span>
                    <Marker type={data.approvalStatus}/>
                    </li>
                </ul>
                <div className='buttonContainer'>
                    <Button text="Cancel Request" onClick={handleCancelRequest}/>
                </div>
            </div>
        )
    }
    else {

        return (
            <div className="component" style={{width: '450px'}}>
                <ul className='detailsList'>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Reference:</span>
                    <span className='detailsItemText'>{data.invoiceReference}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Total:</span>
                    <span className='detailsItemText'>{data.totalInvoiced}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Entry Date:</span>
                    <span className='detailsItemText'>{data.entryDate}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Date:</span>
                    <span className='detailsItemText'>{data.invoiceDate}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Period Start:</span>
                    <span className='detailsItemText'>{data.periodStart}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Invoice Period End:</span>
                    <span className='detailsItemText'>{data.periodEnd}</span>
                    </li>
                    <li className='detailsItem'>
                    <span className='detailsHeaderText'>Status:</span>
                    <Marker type={data.approvalStatus}/>
                    </li>
                </ul>
            </div>
        )

    } 
}

export function InvoiceListComponent() {

    const url = `${BASE_URL}/api/invoices`;

    const data = GetInvoicesData({url});

    return (
        <Table getRowId={(row) => row._links.self.href} columns={InvoiceColumns} data={data}/>
    )

}

export function InvoiceInputForm() {

    const fetchBaseUrl = sessionStorage.getItem("fetchBaseUrl");

    const date = Moment().format('DD/MM/YYYY');

    const customerOptionsMap = GetInvoiceCustomerOptions();

    const customerOptions = Array.from(customerOptionsMap.values()).map((c) => {return {value: c.customerCode, text: c.customerCode + " " + c.name}});

    customerOptions.sort(function(a, b) {
        var textA = a.value.toUpperCase();
        var textB = b.value.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    const [customer, setCustomer] = useState('');

    const [invoiceResponse, setInvoiceResponse] = useState('');

    const [customerProducts, setCustomerProducts] = useState([]);

    const [productOptions, setProductOptions] = useState([]);

    const [productSku, setProductSku] = useState('');

    const [invoiceLines, setInvoiceLines] = useState([]);

    const [matchingPromotions, setMatchingPromotions] = useState([]);

    const [invoiceObject, setInvoiceObject] = useState({
        invoiceDate: '',
        entryDate: date,
        periodStart: '',
        periodEnd: '',
        invoiceReference: '',
        approvalStatus: 'AWAITING_APPROVAL',
        totalInvoiced: ''
    });

    const [productObject, setProductObject] = useState({
        reference: '',
        product: '',
        totalUnits: '',
        promoUnits: '',
        unitCharge: '',
        totalCost: '',
        vat: '',
        promoCases: ''
    });

    const handleChangeCustomer = (e) => {
        e.preventDefault();

        const iCustomer = e.target.value;
        setCustomer(iCustomer);
        const products = InvoiceFetchCustomerProducts(iCustomer);

        setCustomerProducts(products);

        const newProductOptions = Array.from(products.values()).map((p) => {return {value: p.sku, text: p.sku + " " + p.description}});
        newProductOptions.sort(function(a, b) {
            var textA = a.value.toUpperCase();
            var textB = b.value.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        setProductOptions(newProductOptions);
    }

    const handleChangeDate = (event) => {
        event.preventDefault();
        setInvoiceObject({...invoiceObject,
            [event.target.name] : Moment(event.target.value).format('DD/MM/YYYY')
        });
    }

    const handleChange = (event) => {
        event.preventDefault();
        setInvoiceObject({...invoiceObject,
            [event.target.name] : event.target.value
        });
    }

    const handleChangeInvoiceLine = (event) => {
        event.preventDefault();
        setProductObject({...productObject,
            [event.target.name] : event.target.value
        });
    }

    const handleChangeInvoiceLineProduct = (event) => {
        event.preventDefault();
        setProductSku(event.target.value);
    }

    function HandleAddInvoice() {

        const newInvoice = invoiceObject;

        const url = `${fetchBaseUrl}/api/invoices`;

        const selfRef = PostDataReturnSelfHref({url, newInvoice});

        setInvoiceResponse(selfRef);

        HandleFindMatchingPromotions();

    }

    function HandleAddInvoiceLine() {

        const productDetails = customerProducts.get(productSku);

        const newInvoiceLine = {
            invoice: invoiceResponse,
            reference: productSku,
            product: productDetails._links.self.href,
            totalUnits: productObject.totalUnits,
            promoUnits: productObject.promoUnits,
            unitCharge: productObject.unitCharge,
            totalCost: productObject.totalCost,
            vat: productObject.vat,
            invoiceLineRef: ''
        };

        const invoiceLinesBySku = PostInvoiceLines({newInvoiceLine});

        const newInvoiceLines = Array.from(invoiceLinesBySku.values());

        setInvoiceLines(newInvoiceLines);
    }

    function HandleFindMatchingPromotions() {

        const invoice = invoiceObject;

        const productSkus = invoiceLines;

        const customerCode = customer;

        var url = '';
        if(productSkus.length > 0) {
            var skus = productSkus.map(p => p.sku).toString();
            url = `${BASE_URL}/api/promotionPrices/search/findInvoiceDetailsByCustomerDateAndSku?status=APPROVED&customerCode=${customerCode}&startDate=${invoice.periodStart}&endDate=${invoice.periodEnd}&productSkus=${skus}&projection=PromotionPricePromotionView`;
        }
        else {
            url = `${BASE_URL}/api/promotionPrices/search/findInvoiceDetailsByCustomerAndDate?status=APPROVED&customerCode=${customerCode}&startDate=${invoice.periodStart}&endDate=${invoice.periodEnd}&projection=PromotionPricePromotionView`;
        }

        const promotions = GetMatchingPromotions({url});

        setMatchingPromotions(promotions);

    }


    return (
        <div className='componentBoxType1'>
            <div className='titleContainer'>
                <AiIcons.AiOutlineForm className='componentTitleIcon'/>
                <h3 className='componentTitle'>Input New Invoice</h3>
            </div>
            <div style={{border:'1px solid #00bcd4'}}>
                <div className="detailsSectionContainer">
                    <form className="wrapForm" style={{marginBottom:'0px', paddingBottom:'0px'}}>
                        <FormSelect label="Select Customer" options={customerOptions} onChange={handleChangeCustomer}/>
                        <FormInput name="invoiceReference" label="Invoice Reference" type="text" onChange={handleChange} style={{width:'200px'}}/>
                        <FormInputDate name="invoiceDate" label="Invoice Date" type="date" onChange={handleChangeDate}/>
                        <FormInputDate name="periodStart" label="Period Invoiced Start" type="date" onChange={handleChangeDate}/>
                        <FormInputDate name="periodEnd" label="Period Invoiced End" type="date" onChange={handleChangeDate}/>
                        <FormInputNumber name="totalInvoiced" label="Invoice Total" type="number" onChange={handleChange}/>
                    </form>
                </div>
                <div className="buttonContainer" style={{marginBottom:'20px', marginRight:'20px'}}>
                    <Button text="Add Invoice" onClick={HandleAddInvoice}/>
                </div>
            </div>
            <div className='titleContainer'>
                <AiIcons.AiOutlineShopping className='componentTitleIcon'/>
                <h3 className='componentTitle'>Add Invoiced Product</h3>
            </div>
            <div style={{border:'1px solid #00bcd4'}}>
                <div className="detailsSectionContainer">
                    <form className="wrapForm" style={{marginBottom:'0px', paddingBottom:'0px'}}>
                        <FormSelect label="Product Reference" options={productOptions}  onChange={handleChangeInvoiceLineProduct}/>
                        <FormInputNumber name="totalUnits" label="Total Units Sold" type="number" onChange={handleChangeInvoiceLine}/>
                        <FormInputNumber name="promoUnits" label="Promo Units Sold" type="number" onChange={handleChangeInvoiceLine}/>
                        <FormInputNumber name="unitCharge" label="Charge per Unit" type="number" step="0.01" onChange={handleChangeInvoiceLine}/>
                        <FormInputNumber name="totalCost" label="Total Cost" type="number" step="0.01" onChange={handleChangeInvoiceLine}/>
                        <FormInputNumber name="vat" label="VAT" type="number" step="0.01" onChange={handleChangeInvoiceLine}/>
                    </form>
                </div>
                <div className="buttonContainer" style={{marginBottom:'20px', marginRight:'20px'}}>
                    <Button text="Add Product" onClick={HandleAddInvoiceLine}/>
                </div>
                <div className="detailsSectionContainer" style={{marginTop: '30px', height: 220, width: '100%'}} >
                    <DataGrid
                            rowHeight={35}
                            rows={invoiceLines}
                            disableSelectionOnClick
                            columns={InvoiceLineItemColumns}
                            checkboxSelection
                            getRowId={(row) => row.reference}
                            sx={{border: 'none'}}
                            hideFooter={true}
                    />
                </div>
            </div>
            <div className='titleContainer'>
                <AiIcons.AiOutlineShopping className='componentTitleIcon'/>
                <h3 className='componentTitle'>Select Matching Promotion</h3>
            </div>
            <div className="detailsSectionContainer" style={{marginTop: '10px', height: 220, width: '100%'}} >
                <DataGrid
                        rowHeight={35}
                        rows={matchingPromotions}
                        disableSelectionOnClick
                        columns={InvoicePafSelectColumns}
                        checkboxSelection
                        getRowId={(row) => row.pafRef}
                        sx={{borderColor: '#00bcd4'}}
                        hideFooter={true}
                />
            </div>
        </div>
    )

}