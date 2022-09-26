import { useNavigate } from "react-router-dom/dist";
import { DeleteData, FetchData, GetSelfReference, PatchUpdatedData } from "../../adapters/GeneralAdapter";
import { FetchCommercialManager } from "../../adapters/PafAdapter";
import { FetchCustomerPrice, FetchPriceChangeAccountManager, FetchPriceChangeCustomer, FetchPriceChangeData, FetchPriceChangeProduct } from "../../adapters/PriceChangeAdapter";
import { PricebookPriceRequestColumns, ProductPriceRequestColumns } from "../../datagrid-columns/PriceChangeDatagridColumns";
import { ApproveButton, Button, RejectButton } from "../general/Button";
import Marker from "../general/Marker";
import Table from "../general/Table";
import Moment from 'moment';
import "../../styles/component.css";
import { BASE_URL } from "../../Constants";

export function ProductPriceChangeRequestList () {

    var rolesJson = localStorage.getItem("roles");

    var userRoleCode = new Set();

    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    const urlCommM = `${BASE_URL}/api/priceChanges/search/findByStatusAndCustomerIsNull?status=AWAITING_APPROVAL&projection=PriceChangeProductView`;

    const urlAccM = `${BASE_URL}/api/priceChanges/search/findByCustomerIsNull?projection=PriceChangeProductView`;

    const dataCommM = FetchPriceChangeData({urlCommM});

    const dataAccM = FetchPriceChangeData({urlAccM});

    if(userRoleCode.has("AccM")) {

        return (
            <Table getRowId={(row) => row._links.self.href} columns={ProductPriceRequestColumns} data={dataAccM}/>
        )

    }
    if(userRoleCode.has("CommM")) {

        return (
            <Table getRowId={(row) => row._links.self.href} columns={ProductPriceRequestColumns} data={dataCommM}/>
        )

    }
}

export function PricebookPriceChangeRequestList() {

  const fetchBaseUrl = sessionStorage.getItem("fetchBaseUrl");

    var rolesJson = localStorage.getItem("roles");
    var userRoleCode = new Set();
    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    const urlCommM = `${fetchBaseUrl}/api/priceChanges/search/findByStatusAndCustomerIsNotNull?status=AWAITING_APPROVAL&projection=PriceChangeProductView`;

    const urlAccM = `${fetchBaseUrl}/api/priceChanges/search/findByCustomerIsNotNull?projection=PriceChangeProductView`;

    const dataCommM = FetchPriceChangeData({urlCommM});

    const dataAccM = FetchPriceChangeData({urlAccM});

    if(userRoleCode.has("AccM")) {

        return (
            <Table getRowId={(row) => row._links.self.href} columns={PricebookPriceRequestColumns} data={dataAccM}/>
        )

    }
    if(userRoleCode.has("CommM")) {

        return (
            <Table getRowId={(row) => row._links.self.href} columns={PricebookPriceRequestColumns} data={dataCommM}/>
        )

    }
}

export function ProductPriceChangeRequestDetailsAccM({id}) {

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/priceChanges/search/findByProduct_SkuAndCustomerIsNull?sku=${id}&projection=PriceChangeProductView`;

    const data = FetchData({url});

    const product = FetchPriceChangeProduct({url});

    const accM = FetchPriceChangeAccountManager({url});

    const rUrl = GetSelfReference({url});

    const commM = FetchCommercialManager({url});

    const handleCancelRequest = () => {

        DeleteData({rUrl});

        navigate(-1);
    }

    if((data.status === 'AWAITING_APPROVAL') || (data.status === 'REJECTED')) {
        return (
            <div className='component'>
              <span className='detailsTitle'>PRODUCT DETAILS</span>
              <ul className='detailsList'>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Sku:</span>
                  <span className='detailsItemText'>{product.sku}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Category:</span>
                  <span className='detailsItemText'>{product.category}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Description:</span>
                  <span className='detailsItemText'>{product.description}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Landed Cost:</span>
                  <span className='detailsItemText'>£{product.landedCost}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Standard Price:</span>
                  <span className='detailsItemText'>£{product.standardPrice}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Margin %:</span>
                  <span className='detailsItemText'>{(((product.standardPrice - product.landedCost) / product.standardPrice) * 100).toFixed(2)}</span>
                </li>
              </ul>
              <span className='detailsTitle'>PRICE CHANGE DETAILS</span>
              <ul className='detailsList'>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Account Manager:</span>
                  <span className='detailsItemText'>{accM.firstName} {accM.lastName}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>commercialManager:</span>
                  <span className='detailsItemText'>{commM}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Request Date:</span>
                  <span className='detailsItemText'>{Moment(data.date).format('DD/MM/YYYY')}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Requested Standard Price:</span>
                  <span className='detailsItemText'>£{data.price}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Status:</span>
                  <Marker type={data.status}/>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>New Margin %:</span>
                  <span className='detailsItemText'>{(((data.price - product.landedCost) / data.price) * 100).toFixed(2)}</span>
                </li>
              </ul>
              <div className='buttonContainer'>
                <Button text="Cancel Request" onClick={handleCancelRequest}/>
              </div>
            </div>
        )
    }
    if(data.status === 'APPROVED') {
        return (
            <div className='component'>
              <span className='detailsTitle'>PRODUCT DETAILS</span>
              <ul className='detailsList'>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Sku:</span>
                  <span className='detailsItemText'>{product.sku}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Category:</span>
                  <span className='detailsItemText'>{product.category}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Description:</span>
                  <span className='detailsItemText'>{product.description}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Landed Cost:</span>
                  <span className='detailsItemText'>£{product.landedCost}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Standard Price:</span>
                  <span className='detailsItemText'>£{product.standardPrice}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Margin %:</span>
                  <span className='detailsItemText'>{(((product.standardPrice - product.landedCost) / product.standardPrice) * 100).toFixed(2)}</span>
                </li>
              </ul>
              <span className='detailsTitle'>PRICE CHANGE DETAILS</span>
              <ul className='detailsList'>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Account Manager:</span>
                  <span className='detailsItemText'>{accM.firstName} {accM.lastName}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>commercialManager:</span>
                  <span className='detailsItemText'>{commM}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Request Date:</span>
                  <span className='detailsItemText'>{Moment(data.date).format('DD/MM/YYYY')}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Requested Standard Price:</span>
                  <span className='detailsItemText'>£{data.price}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>New Margin %:</span>
                  <span className='detailsItemText'>{(((data.price - product.landedCost) / data.price) * 100).toFixed(2)}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Status:</span>
                  <Marker type={data.status}/>
                </li>
              </ul>
              <div className='buttonContainer'>
                <Button text="Change Price in System"/>
                <Button text="Cancel Request" onClick={handleCancelRequest}/>
              </div>
            </div>
        )
    }
}

export function ProductPriceChangeRequestDetailsCommM({id}) {

    const userUrl = sessionStorage.getItem("userLink");

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/priceChanges/search/findByProduct_SkuAndCustomerIsNull?sku=${id}&projection=PriceChangeProductView`;

    const data = FetchData({url});

    const product = FetchPriceChangeProduct({url});

    const accM = FetchPriceChangeAccountManager({url});

    const rUrl = GetSelfReference({url});

    const commM = FetchCommercialManager({url});

    const handleReject = () => {

        const newPriceChange = {
            date: Moment(data.date).format('DD/MM/YYYY'),
            status: 'REJECTED',
            price: data.price,
            commercialManager: userUrl
        }

        PatchUpdatedData({rUrl, newPriceChange});

        navigate(-1);
    }

    const handleApprove = () => {

        const newPriceChange = {
            date: Moment(data.date).format('DD/MM/YYYY'),
            status: 'APPROVED',
            price: data.price,
            commercialManager: userUrl
        }

        PatchUpdatedData({rUrl, newPriceChange});

        navigate(-1);
    }

    return (
        <div className='component'>
            <span className='detailsTitle'>PRODUCT DETAILS</span>
            <ul className='detailsList'>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Sku:</span>
                  <span className='detailsItemText'>{product.sku}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Category:</span>
                  <span className='detailsItemText'>{product.category}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Product Description:</span>
                  <span className='detailsItemText'>{product.description}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Landed Cost:</span>
                  <span className='detailsItemText'>£{product.landedCost}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Standard Price:</span>
                  <span className='detailsItemText'>£{product.standardPrice}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Margin %:</span>
                  <span className='detailsItemText'>{(((product.standardPrice - product.landedCost) / product.standardPrice) * 100).toFixed(2)}</span>
                </li>
            </ul>
            <span className='detailsTitle'>PRICE CHANGE DETAILS</span>
            <ul className='detailsList'>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Account Manager:</span>
                  <span className='detailsItemText'>{accM.firstName} {accM.lastName}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>commercialManager:</span>
                  <span className='detailsItemText'>{commM}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Request Date:</span>
                  <span className='detailsItemText'>{Moment(data.date).format('DD/MM/YYYY')}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Requested Standard Price:</span>
                  <span className='detailsItemText'>£{data.price}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>New Margin %:</span>
                  <span className='detailsItemText'>{(((data.price - product.landedCost) / data.price) * 100).toFixed(2)}</span>
                </li>
                <li className='detailsItem'>
                  <span className='detailsHeaderText'>Status:</span>
                  <Marker type={data.status}/>
                </li>
            </ul>
            <div className='buttonContainer'>
                <ApproveButton onClick={handleApprove}/>
                <RejectButton onClick={handleReject}/>
            </div>
        </div>

    )
    
}

export function PricebookPriceChangeRequestDetailsAccM({id, customerCode}) {

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/priceChanges/search/findByCustomer_CustomerCodeAndProduct_SkuAndCustomerIsNotNull?customerCode=${customerCode}&sku=${id}&projection=PriceChangeProductView`;

    const data = FetchData({url});

    const product = FetchPriceChangeProduct({url});

    const customer = FetchPriceChangeCustomer({url});

    const accM = FetchPriceChangeAccountManager({url});

    const rUrl = GetSelfReference({url});

    const commM = FetchCommercialManager({url});

    const priceUrl = `${BASE_URL}/api/pricebooks/search/findByCustomerCodeAndProduct_Sku?customerCode=${customerCode}&sku=${id}`;

    const customerPrice = FetchCustomerPrice({priceUrl});

    const handleCancelRequest = () => {

        DeleteData({rUrl});

        navigate(-1);
    }

    if((data.status === 'AWAITING_APPROVAL') || (data.status === 'REJECTED')) {
        return (
            <div className='component'>
            <span className='detailsTitle'>CUSTOMER DETAILS</span>
            <ul className='detailsList'>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer Code:</span>
                <span className='detailsItemText'>{customer.customerCode}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer Name:</span>
                <span className='detailsItemText'>{customer.name}</span>
              </li>
            </ul>
            <span className='detailsTitle'>PRODUCT DETAILS</span>
            <ul className='detailsList'>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Sku:</span>
                <span className='detailsItemText'>{product.sku}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Category:</span>
                <span className='detailsItemText'>{product.category}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Description:</span>
                <span className='detailsItemText'>{product.description}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Landed Cost:</span>
                <span className='detailsItemText'>£{product.landedCost}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Standard Price:</span>
                <span className='detailsItemText'>£{product.standardPrice}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer List Price:</span>
                <span className='detailsItemText'>£{customerPrice}</span>
              </li>
              <li className='detailsItem'>
                  <span className='detailsHeaderText'>Margin %:</span>
                  <span className='detailsItemText'>{(((customerPrice - product.landedCost) / customerPrice) * 100).toFixed(2)}</span>
              </li>
            </ul>
            <span className='detailsTitle'>PRICE CHANGE DETAILS</span>
                <ul className='detailsList'>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Account Manager:</span>
                    <span className='detailsItemText'>{accM.firstName} {accM.lastName}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>commercialManager:</span>
                    <span className='detailsItemText'>{commM}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Request Date:</span>
                    <span className='detailsItemText'>{Moment(data.date).format('DD/MM/YYYY')}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Requested Customer List Price:</span>
                    <span className='detailsItemText'>£{data.price}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>New Margin %:</span>
                    <span className='detailsItemText'>{(((data.price - product.landedCost) / data.price) * 100).toFixed(2)}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Status:</span>
                    <Marker type={data.status}/>
                  </li>
                </ul>
            <div className='buttonContainer'>
              <Button text="Cancel Request" onClick={handleCancelRequest}/>
            </div>
          </div>
        )
    }
    if(data.status === 'APPROVED') {
        return (
            <div className='component'>
            <span className='detailsTitle'>CUSTOMER DETAILS</span>
            <ul className='detailsList'>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer Code:</span>
                <span className='detailsItemText'>{customer.customerCode}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer Name:</span>
                <span className='detailsItemText'>{customer.name}</span>
              </li>
            </ul>
            <span className='detailsTitle'>PRODUCT DETAILS</span>
            <ul className='detailsList'>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Sku:</span>
                <span className='detailsItemText'>{product.sku}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Category:</span>
                <span className='detailsItemText'>{product.category}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Description:</span>
                <span className='detailsItemText'>{product.description}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Landed Cost:</span>
                <span className='detailsItemText'>£{product.landedCost}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Standard Price:</span>
                <span className='detailsItemText'>£{product.standardPrice}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer List Price:</span>
                <span className='detailsItemText'>£{customerPrice}</span>
              </li>
              <li className='detailsItem'>
                  <span className='detailsHeaderText'>Margin %:</span>
                  <span className='detailsItemText'>{(((customerPrice - product.landedCost) / customerPrice) * 100).toFixed(2)}</span>
              </li>
            </ul>
            <span className='detailsTitle'>PRICE CHANGE DETAILS</span>
                <ul className='detailsList'>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Account Manager:</span>
                    <span className='detailsItemText'>{accM.firstName} {accM.lastName}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>commercialManager:</span>
                    <span className='detailsItemText'>{commM}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Request Date:</span>
                    <span className='detailsItemText'>{Moment(data.date).format('DD/MM/YYYY')}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Requested Customer List Price:</span>
                    <span className='detailsItemText'>£{data.price}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>New Margin %:</span>
                    <span className='detailsItemText'>{(((data.price - product.landedCost) / data.price) * 100).toFixed(2)}</span>
                  </li>
                  <li className='detailsItem'>
                    <span className='detailsHeaderText'>Status:</span>
                    <Marker type={data.status}/>
                  </li>
                </ul>
            <div className='buttonContainer'>
              <Button text="Change Price in System"/>
              <Button text="Cancel Request" onClick={handleCancelRequest}/>
            </div>
          </div>
        )
    }
    
}

export function PricebookPriceChangeRequestDetailsCommM({id, customerCode}) {

    const userUrl = sessionStorage.getItem("userLink");

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/priceChanges/search/findByCustomer_CustomerCodeAndProduct_SkuAndCustomerIsNotNull?customerCode=${customerCode}&sku=${id}&projection=PriceChangeProductView`;

    const data = FetchData({url});

    const product = FetchPriceChangeProduct({url});

    const customer = FetchPriceChangeCustomer({url});

    const accM = FetchPriceChangeAccountManager({url});

    const rUrl = GetSelfReference({url});

    const commM = FetchCommercialManager({url});

    const priceUrl = `${BASE_URL}/api/pricebooks/search/findByCustomerCodeAndProduct_Sku?customerCode=${customerCode}&sku=${id}`;

    const customerPrice = FetchCustomerPrice({priceUrl});

    const handleReject = () => {
        
        const newPriceChange = {
          date: Moment(data.date).format('DD/MM/YYYY'),
          status: 'REJECTED',
          price: data.price,
          commercialManager: userUrl
        }
    
        PatchUpdatedData({rUrl, newPriceChange})
    
        navigate(-1);
    }
    
    const handleApprove = () => {
        
        const newPriceChange = {
          date: Moment(data.date).format('DD/MM/YYYY'),
          status: 'APPROVED',
          price: data.price,
          commercialManager: userUrl
        }
        
        PatchUpdatedData({rUrl, newPriceChange});
    
        navigate(-1);
    }
    

    return (
        <div className='component'>
            <span className='detailsTitle'>CUSTOMER DETAILS</span>
            <ul className='detailsList'>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer Code:</span>
                <span className='detailsItemText'>{customer.customerCode}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer Name:</span>
                <span className='detailsItemText'>{customer.name}</span>
              </li>
            </ul>
            <span className='detailsTitle'>PRODUCT DETAILS</span>
            <ul className='detailsList'>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Sku:</span>
                <span className='detailsItemText'>{product.sku}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Category:</span>
                <span className='detailsItemText'>{product.category}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Product Description:</span>
                <span className='detailsItemText'>{product.description}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Landed Cost:</span>
                <span className='detailsItemText'>£{product.landedCost}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Standard Price:</span>
                <span className='detailsItemText'>£{product.standardPrice}</span>
              </li>
              <li className='detailsItem'>
                <span className='detailsHeaderText'>Customer List Price:</span>
                <span className='detailsItemText'>£{customerPrice}</span>
              </li>
              <li className='detailsItem'>
                  <span className='detailsHeaderText'>Margin %:</span>
                  <span className='detailsItemText'>{(((customerPrice - product.landedCost) / customerPrice) * 100).toFixed(2)}</span>
              </li>
            </ul>
            <span className='detailsTitle'>PRICE CHANGE DETAILS</span>
            <ul className='detailsList'>
                <li className='detailsItem'>
                    <span className='detailsHeaderText'>Account Manager:</span>
                    <span className='detailsItemText'>{accM.firstName} {accM.lastName}</span>
                </li>
                <li className='detailsItem'>
                    <span className='detailsHeaderText'>commercialManager:</span>
                    <span className='detailsItemText'>{commM}</span>
                </li>
                <li className='detailsItem'>
                    <span className='detailsHeaderText'>Request Date:</span>
                    <span className='detailsItemText'>{Moment(data.date).format('DD/MM/YYYY')}</span>
                </li>
                <li className='detailsItem'>
                    <span className='detailsHeaderText'>Requested Customer List Price:</span>
                    <span className='detailsItemText'>£{data.price}</span>
                </li>
                <li className='detailsItem'>
                    <span className='detailsHeaderText'>New Margin %:</span>
                    <span className='detailsItemText'>{(((data.price - product.landedCost) / data.price) * 100).toFixed(2)}</span>
                </li>
                <li className='detailsItem'>
                    <span className='detailsHeaderText'>Status:</span>
                    <Marker type={data.status}/>
                </li>
            </ul>
            <div className='buttonContainer'>
              <ApproveButton onClick={handleApprove}/>
              <RejectButton onClick={handleReject}/>
            </div>
        </div>
    )
    
}
