import { useNavigate } from "react-router-dom/dist";
import { DeleteData, FetchData, GetSelfReference, PatchUpdatedData } from "../../adapters/GeneralAdapter";
import { FetchCommercialManager, FetchPafProducts, FetchPromotionPricesHref, FetchPromotionsData, FetchStockManager } from "../../adapters/PafAdapter";
import { PafRequestColumns } from "../../datagrid-columns/PafRequestDatagridColumns";
import Table from "../general/Table";
import Moment from 'moment';
import { ApproveButton, Button, RejectButton } from "../general/Button";
import Marker from "../general/Marker";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar } from 'recharts';
import "../../styles/component.css";
import { BASE_URL } from "../../Constants";

export function PafRequestsList() {

    var rolesJson = localStorage.getItem("roles");

    var userRoleCode = new Set();

    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    const urlStkM = `${BASE_URL}/api/promotions/search/findByStatusAndStockManagerIsNull?status=AWAITING_APPROVAL`;

    const urlCommM = `${BASE_URL}/api/promotions/search/findByStatusAndStockManagerIsNotNull?status=AWAITING_APPROVAL`;

    const dataStkM = FetchPromotionsData({urlStkM});

    const dataCommM = FetchPromotionsData({urlCommM});

    if(userRoleCode.has("StkM")) {
        return (
            <Table getRowId={(row) => row.pafRef} columns={PafRequestColumns} data={dataStkM}/>
        )
    }
    if(userRoleCode.has("CommM")) {
        return (
            <Table getRowId={(row) => row.pafRef} columns={PafRequestColumns} data={dataCommM}/>
        )
    }
}

export function PafRequestDetailsAccM({id}) {

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/promotions/search/findByPafRef?projection=PromotionCustomerView&pafRef=${id}`;

    const data = FetchData({url});

    const promoUrl = GetSelfReference({url});

    const stkM = FetchStockManager({url});

    const commM = FetchCommercialManager({url});

    const promoPriceUrl = FetchPromotionPricesHref({url});

    const rUrl = promoPriceUrl.replace('{?projection}', '?projection=PromotionPriceProductView');

    const products = FetchPafProducts(rUrl);

    const AnalysisData = GetAnalysisData(products);

    const ProfitDataOnPromo = GetProfitOnPromo(products);

    const ProfitDataStandardBusiness = GetProfitStandardBusiness(products);

    const handleDelete = () => {

        DeleteData({promoUrl});

        navigate(-1);
    }

    return (

        <div className='component'>
            <div className='componentSectionContainer'>
              <div className='titleContainer'>
                <h3 className='componentTitle'>PAF Details</h3>
              </div>
              <div className='componentSection'>
                <table>
                  <tr>
                    <th>
                      <label className="formTableHeader">Paf Reference</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Promotion Reference</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Customer Code</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Product Group</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Promotion Type</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Mechanic</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Entry Date</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Sage Start</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Sage End</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Store Start</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Store End</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Stock Manager</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Commercial Manager</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Status</label>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <p className="formTableText">{data.pafRef}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.promotionRef}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.customerCode}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.productGroup}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.promotionType}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.mechanic}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.entryDate}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.sageStart}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.sageEnd}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.storeStart}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.storeEnd}</p>
                    </td>
                    <td>
                      <p className="formTableText">{stkM}</p>
                    </td>
                    <td>
                      <p className="formTableText">{commM}</p>
                    </td>
                    <td>
                      <p className="formTableText">
                        <Marker type={data.status}/>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              <div className='titleContainer'>
                <h3 className='componentTitle'>Product Details</h3>
              </div>
              <div className='componentSection'>
                <table>
                  <tr>
                    <th>
                         <label className="formTableHeader">Product Sku</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Landed Cost</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Standard Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Customer List Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Promotion Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Volumes Not Promoting</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Volumes Promoting</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Retro Funding per Case</label>
                    </th>
                    <th>
                        <label className="formTableHeader">CI Standard Business %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">GP Standard Business %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Promotion Price Reduction %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Expected Claim Total</label>
                    </th>
                    <th>
                        <label className="formTableHeader">CI On Promotion %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">GP On Promotion %</label>
                    </th>
                  </tr>
                  {
                    products.map((item) => {
                      return (
                        <tr>
                          <td>
                            <p className="formTableText">{item.productSku}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.product.landedCost}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.product.standardPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.customerListPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.promoPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">{item.offPromoVol}</p>
                          </td>
                          <td>
                            <p className="formTableText">{item.promoVol}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.retroFunding}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.product.standardPrice - item.customerListPrice) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.customerListPrice - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.customerListPrice - item.promoPrice) / item.customerListPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{(item.promoVol * item.retroFunding).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.product.standardPrice - item.promoPrice + item.retroFunding) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.promoPrice - item.retroFunding - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                        </tr>
                      )
                    })
                  }
                </table>
              </div>
              <div className='titleContainer'>
                <h3 className='componentTitle'>Analysis</h3>
              </div>
              <div className='componentSection'>
                <div className='analysisSection'>
                  <div className='subTitleContainer'>
                    <h3 className='componentSubTitle'>Profit And Loss Standard Business</h3>
                  </div>
                  <ul className='detailsList'>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Sales: </span>
                      <span className='detailsItemText'>£{ProfitDataStandardBusiness.grossSales}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit: </span>
                      <span className='detailsItemText'>£{ProfitDataStandardBusiness.grossProfit}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit %: </span>
                      <span className='detailsItemText'>{ProfitDataStandardBusiness.grossProfitPercentage}</span>
                    </li>
                  </ul>
                  <div className='subTitleContainer'>
                    <h3 className='componentSubTitle'>Profit And Loss On Promotion</h3>
                  </div>
                  <ul className='detailsList'>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Sales: </span>
                      <span className='detailsItemText'>£{ProfitDataOnPromo.grossSales}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit: </span>
                      <span className='detailsItemText'>£{ProfitDataOnPromo.grossProfit}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit %: </span>
                      <span className='detailsItemText'>{ProfitDataOnPromo.grossProfitPercentage}</span>
                    </li>
                  </ul>
                </div>
                <div className='chartSection'>
                    <AnalysisBarChart data={AnalysisData}/>
                </div>
              </div>
            </div>
            <div className='buttonContainer'>
                <Button text="Cancel PAF Request" onClick={handleDelete}/>
            </div>
        </div>

    )
    

}

export function PafRequestDetailsCommM({id}) {

    const navigate = useNavigate();

    const userLink = sessionStorage.getItem("userLink");

    const url = `${BASE_URL}/api/promotions/search/findByPafRef?projection=PromotionCustomerView&pafRef=${id}`;

    const data = FetchData({url});

    const promoUrl = GetSelfReference({url});

    const stkM = FetchStockManager({url});

    const commM = FetchCommercialManager({url});

    const promoPriceUrl = FetchPromotionPricesHref({url});

    const rUrl = promoPriceUrl.replace('{?projection}', '?projection=PromotionPriceProductView');

    const products = FetchPafProducts(rUrl);

    const AnalysisData = GetAnalysisData(products);

    const ProfitDataOnPromo = GetProfitOnPromo(products);

    const ProfitDataStandardBusiness = GetProfitStandardBusiness(products);

    const handleApprove = () => {

        const newPaf = {
            customerCode: data.customerCode,
            entryDate: Moment(data.entryDate).format('DD/MM/YYYY'),
            mechanic: data.mechanic,
            pafRef: data.pafRef,
            productGroup: data.productGroup,
            promotionRef: data.promotionRef,
            promotionType: data.promotionType,
            sageEnd: Moment(data.sageEnd).format('DD/MM/YYYY'),
            sageStart: Moment(data.sageStart).format('DD/MM/YYYY'),
            status: 'APPROVED',
            storeEnd: Moment(data.storeEnd).format('DD/MM/YYYY'),
            storeStart: Moment(data.storeStart).format('DD/MM/YYYY'),
            commercialManager: userLink
        };

        PatchUpdatedData({promoUrl, newPaf});

        navigate(-1);
    }

    const handleReject = () => {

        const newPaf = {
            customerCode: data.customerCode,
            entryDate: Moment(data.entryDate).format('DD/MM/YYYY'),
            mechanic: data.mechanic,
            pafRef: data.pafRef,
            productGroup: data.productGroup,
            promotionRef: data.promotionRef,
            promotionType: data.promotionType,
            sageEnd: Moment(data.sageEnd).format('DD/MM/YYYY'),
            sageStart: Moment(data.sageStart).format('DD/MM/YYYY'),
            status: 'REJECTED',
            storeEnd: Moment(data.storeEnd).format('DD/MM/YYYY'),
            storeStart: Moment(data.storeStart).format('DD/MM/YYYY'),
            commercialManager: userLink
        };

        PatchUpdatedData({promoUrl, newPaf});

        navigate(-1);
    }

    return (
        <div className='componentBoxType1'>
            <div className='componentSectionContainer'>
              <div className='titleContainer'>
                <h3 className='componentTitle'>PAF Details</h3>
              </div>
              <div className='componentSection'>
                <table>
                  <tr>
                    <th>
                      <label className="formTableHeader">Paf Reference</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Promotion Reference</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Customer Code</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Product Group</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Promotion Type</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Mechanic</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Entry Date</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Sage Start</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Sage End</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Store Start</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Store End</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Stock Manager</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Commercial Manager</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Status</label>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <p className="formTableText">{data.pafRef}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.promotionRef}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.customerCode}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.productGroup}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.promotionType}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.mechanic}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.entryDate}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.sageStart}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.sageEnd}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.storeStart}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.storeEnd}</p>
                    </td>
                    <td>
                      <p className="formTableText">{stkM}</p>
                    </td>
                    <td>
                      <p className="formTableText">{commM}</p>
                    </td>
                    <td>
                      <p className="formTableText">
                        <Marker type={data.status}/>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              <div className='titleContainer'>
                <h3 className='componentTitle'>Product Details</h3>
              </div>
              <div className='componentSection'>
                <table>
                  <tr>
                  <th>
                         <label className="formTableHeader">Product Sku</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Landed Cost</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Standard Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Customer List Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Promotion Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Volumes Not Promoting</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Volumes Promoting</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Retro Funding per Case</label>
                    </th>
                    <th>
                        <label className="formTableHeader">CI Standard Business %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">GP Standard Business %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Promotion Price Reduction %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Expected Claim Total</label>
                    </th>
                    <th>
                        <label className="formTableHeader">CI On Promotion %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">GP On Promotion %</label>
                    </th>
                  </tr>
                  {
                    products.map((item) => {
                      return (
                        <tr>
                          <td>
                            <p className="formTableText">{item.productSku}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.product.landedCost}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.product.standardPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.customerListPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.promoPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">{item.offPromoVol}</p>
                          </td>
                          <td>
                            <p className="formTableText">{item.promoVol}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.retroFunding}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.product.standardPrice - item.customerListPrice) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.customerListPrice - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.customerListPrice - item.promoPrice) / item.customerListPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{(item.promoVol * item.retroFunding).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.product.standardPrice - item.promoPrice + item.retroFunding) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.promoPrice - item.retroFunding - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                        </tr>
                      )
                    })
                  }
                </table>
              </div>
              <div className='titleContainer'>
                <h3 className='componentTitle'>Analysis</h3>
              </div>
              <div className='componentSection'>
                <div className='analysisSection'>
                  <div className='subTitleContainer'>
                    <h3 className='componentSubTitle'>Profit And Loss Standard Business</h3>
                  </div>
                  <ul className='detailsList'>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Sales: </span>
                      <span className='detailsItemText'>£{ProfitDataStandardBusiness.grossSales}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit: </span>
                      <span className='detailsItemText'>£{ProfitDataStandardBusiness.grossProfit}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit %: </span>
                      <span className='detailsItemText'>{ProfitDataStandardBusiness.grossProfitPercentage}</span>
                    </li>
                  </ul>
                  <div className='subTitleContainer'>
                    <h3 className='componentSubTitle'>Profit And Loss On Promotion</h3>
                  </div>
                  <ul className='detailsList'>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Sales: </span>
                      <span className='detailsItemText'>£{ProfitDataOnPromo.grossSales}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit: </span>
                      <span className='detailsItemText'>£{ProfitDataOnPromo.grossProfit}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit %: </span>
                      <span className='detailsItemText'>{ProfitDataOnPromo.grossProfitPercentage}</span>
                    </li>
                  </ul>
                </div>
                <div className='chartSection'>
                    <AnalysisBarChart data={AnalysisData}/>
                </div>
              </div>
            </div>
            <div className='buttonContainer'>
                <ApproveButton onClick={handleApprove}/>
                <RejectButton onClick={handleReject}/>
            </div>
        </div>
    )

}

export function PafRequestDetailsStkM({id}) {

    const navigate = useNavigate();

    const userLink = sessionStorage.getItem("userLink");

    const url = `${BASE_URL}/api/promotions/search/findByPafRef?projection=PromotionCustomerView&pafRef=${id}`;

    const data = FetchData({url});

    const promoUrl = GetSelfReference({url});

    const stkM = FetchStockManager({url});

    const commM = FetchCommercialManager({url});

    const promoPriceUrl = FetchPromotionPricesHref({url});

    const rUrl = promoPriceUrl.replace('{?projection}', '?projection=PromotionPriceProductView');

    const products = FetchPafProducts(rUrl);

    const AnalysisData = GetAnalysisData(products);

    const ProfitDataOnPromo = GetProfitOnPromo(products);

    const ProfitDataStandardBusiness = GetProfitStandardBusiness(products);

    const handleApprove = () => {

        const newPaf = {
            customerCode: data.customerCode,
            entryDate: Moment(data.entryDate).format('DD/MM/YYYY'),
            mechanic: data.mechanic,
            pafRef: data.pafRef,
            productGroup: data.productGroup,
            promotionRef: data.promotionRef,
            promotionType: data.promotionType,
            sageEnd: Moment(data.sageEnd).format('DD/MM/YYYY'),
            sageStart: Moment(data.sageStart).format('DD/MM/YYYY'),
            status: 'AWAITING_APPROVAL',
            storeEnd: Moment(data.storeEnd).format('DD/MM/YYYY'),
            storeStart: Moment(data.storeStart).format('DD/MM/YYYY'),
            stockManager: userLink
        };

        PatchUpdatedData({promoUrl, newPaf});

        navigate(-1);
    }

    const handleReject = () => {

        const newPaf = {
            customerCode: data.customerCode,
            entryDate: Moment(data.entryDate).format('DD/MM/YYYY'),
            mechanic: data.mechanic,
            pafRef: data.pafRef,
            productGroup: data.productGroup,
            promotionRef: data.promotionRef,
            promotionType: data.promotionType,
            sageEnd: Moment(data.sageEnd).format('DD/MM/YYYY'),
            sageStart: Moment(data.sageStart).format('DD/MM/YYYY'),
            status: 'REJECTED',
            storeEnd: Moment(data.storeEnd).format('DD/MM/YYYY'),
            storeStart: Moment(data.storeStart).format('DD/MM/YYYY'),
            stockManager: userLink
        };

        PatchUpdatedData({promoUrl, newPaf});

        navigate(-1);
    }

    return (

        <div className='component'>
            <div className='componentSectionContainer'>
              <div className='titleContainer'>
                <h3 className='componentTitle'>PAF Details</h3>
              </div>
              <div className='componentSection'>
                <table>
                  <tr>
                    <th>
                      <label className="formTableHeader">Paf Reference</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Promotion Reference</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Customer Code</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Product Group</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Promotion Type</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Mechanic</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Entry Date</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Sage Start</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Sage End</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Store Start</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Store End</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Stock Manager</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Commercial Manager</label>
                    </th>
                    <th>
                      <label className="formTableHeader">Status</label>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <p className="formTableText">{data.pafRef}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.promotionRef}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.customerCode}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.productGroup}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.promotionType}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.mechanic}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.entryDate}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.sageStart}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.sageEnd}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.storeStart}</p>
                    </td>
                    <td>
                      <p className="formTableText">{data.storeEnd}</p>
                    </td>
                    <td>
                      <p className="formTableText">{stkM}</p>
                    </td>
                    <td>
                      <p className="formTableText">{commM}</p>
                    </td>
                    <td>
                      <p className="formTableText">
                        <Marker type={data.status}/>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              <div className='titleContainer'>
                <h3 className='componentTitle'>Product Details</h3>
              </div>
              <div className='componentSection'>
                <table>
                  <tr>
                    <th>
                         <label className="formTableHeader">Product Sku</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Landed Cost</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Standard Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Customer List Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Promotion Price</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Volumes Not Promoting</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Volumes Promoting</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Retro Funding per Case</label>
                    </th>
                    <th>
                        <label className="formTableHeader">CI Standard Business %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">GP Standard Business %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Promotion Price Reduction %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">Expected Claim Total</label>
                    </th>
                    <th>
                        <label className="formTableHeader">CI On Promotion %</label>
                    </th>
                    <th>
                        <label className="formTableHeader">GP On Promotion %</label>
                    </th>
                  </tr>
                  {
                    products.map((item) => {
                      return (
                        <tr>
                          <td>
                            <p className="formTableText">{item.productSku}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.product.landedCost}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.product.standardPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.customerListPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.promoPrice}</p>
                          </td>
                          <td>
                            <p className="formTableText">{item.offPromoVol}</p>
                          </td>
                          <td>
                            <p className="formTableText">{item.promoVol}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{item.retroFunding}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.product.standardPrice - item.customerListPrice) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.customerListPrice - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.customerListPrice - item.promoPrice) / item.customerListPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">£{(item.promoVol * item.retroFunding).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.product.standardPrice - item.promoPrice + item.retroFunding) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                          <td>
                            <p className="formTableText">{(((item.promoPrice - item.retroFunding - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1)}</p>
                          </td>
                        </tr>
                      )
                    })
                  }
                </table>
              </div>
              <div className='titleContainer'>
                <h3 className='componentTitle'>Analysis</h3>
              </div>
              <div className='componentSection'>
                <div className='analysisSection'>
                  <div className='subTitleContainer'>
                    <h3 className='componentSubTitle'>Profit And Loss Standard Business</h3>
                  </div>
                  <ul className='detailsList'>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Sales: </span>
                      <span className='detailsItemText'>£{ProfitDataStandardBusiness.grossSales}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit: </span>
                      <span className='detailsItemText'>£{ProfitDataStandardBusiness.grossProfit}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit %: </span>
                      <span className='detailsItemText'>{ProfitDataStandardBusiness.grossProfitPercentage}</span>
                    </li>
                  </ul>
                  <div className='subTitleContainer'>
                    <h3 className='componentSubTitle'>Profit And Loss On Promotion</h3>
                  </div>
                  <ul className='detailsList'>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Sales: </span>
                      <span className='detailsItemText'>£{ProfitDataOnPromo.grossSales}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit: </span>
                      <span className='detailsItemText'>£{ProfitDataOnPromo.grossProfit}</span>
                    </li>
                    <li className='detailsItem'>
                      <span className='detailsHeaderText'>Gross Profit %: </span>
                      <span className='detailsItemText'>{ProfitDataOnPromo.grossProfitPercentage}</span>
                    </li>
                  </ul>
                </div>
                <div className='chartSection'>
                    <AnalysisBarChart data={AnalysisData}/>
                </div>
              </div>
            </div>
            <div className='buttonContainer'>
                <ApproveButton onClick={handleApprove}/>
                <RejectButton onClick={handleReject}/>
            </div>
        </div>

    )

}

export function GetAnalysisData({data}) {

    const AnalysisData = []

    data.map((item) => {
        const gp = {
        name : item.productSku,
        grossProfitOnPromo : (((item.promoPrice - item.retroFunding - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1),
        grossProfitStandardBusiness: (((item.customerListPrice - item.product.landedCost) / item.product.standardPrice) * 100).toFixed(1)
        };

        AnalysisData.push(gp);  
    })

    console.log(AnalysisData);

    return AnalysisData;

}

export function GetProfitOnPromo({data}) {

    var grossSalesTotal = 0;

    var grossProfitTotal = 0;

    var gpp = 0;

    data.map((item) => {
        const grossSales = (item.product.standardPrice * item.promoVol);
        grossSalesTotal = grossSalesTotal + grossSales;

        const grossProfit = (item.promoPrice - item.retroFunding - item.product.landedCost);
        grossProfitTotal = grossProfitTotal + grossProfit;
    })

    gpp = grossProfitTotal / grossSalesTotal;

    const grossProfitData = {
        grossSales: grossSalesTotal.toFixed(2),
        grossProfit: grossProfitTotal.toFixed(2),
        grossProfitPercentage: gpp.toFixed(2)
    }

    return grossProfitData;


}

export function GetProfitStandardBusiness({data}) {

    var grossSalesTotal = 0;

    var grossProfitTotal = 0;

    var gpp = 0;

    data.map((item) => {
        const grossSales = (item.product.standardPrice * item.offPromoVol);
        grossSalesTotal = grossSalesTotal + grossSales;

        const grossProfit = ((item.customerListPrice - item.product.landedCost) * item.offPromoVol);
        grossProfitTotal = grossProfitTotal + grossProfit;
    })

    gpp = grossProfitTotal / grossSalesTotal;

    const grossProfitData = {
        grossSales: grossSalesTotal.toFixed(2),
        grossProfit: grossProfitTotal.toFixed(2),
        grossProfitPercentage: gpp.toFixed(2)
    }

    return grossProfitData;
}

export function AnalysisBarChart({data}){
    return (
      <div>
          <div className='titleContainer'>
              <h3 className='componentSubTitle'>Gross Profit % Standard Business vs On Promotion per Sku</h3>
          </div>
          <ResponsiveContainer width="100%" aspect={3}>
            <BarChart width={730} height={250} data={data} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="grossProfitStandardBusiness" fill="#00bcd4" />
              <Bar dataKey="grossProfitOnPromo" fill="#7bd0db" />
            </BarChart>
          </ResponsiveContainer>
      </div>
    );
  }
  