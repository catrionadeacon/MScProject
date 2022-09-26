import { FetchData } from "../../adapters/GeneralAdapter";
import { FetchCommercialManager, FetchPafProducts, FetchPromotionPricesHref, FetchPromotionsData, FetchStockManager } from "../../adapters/PafAdapter";
import { PromotionColumns, PromotionPriceColumns } from "../../datagrid-columns/PromotionDatagridColumns";
import Table from "../general/Table";
import * as AiIcons from "react-icons/ai";
import { AnalysisBarChart, GetAnalysisData, GetProfitOnPromo, GetProfitStandardBusiness } from "./PafRequestsComponents";
import { FetchPromotionPricesData } from "../../adapters/PromotionPricesAdapter";
import { BASE_URL } from "../../Constants";

export function PromotionsList() {

    const url = `${BASE_URL}/api/promotions/search/findByStatus?status=APPROVED`;

    console.log(url);

    const data = FetchPromotionsData({url});

    return (
        <Table getRowId={(row) => row.pafRef} data={data} columns={PromotionColumns}/>
    )
}

export function PromotionAnalysisComponent({id}) {

    const url = `${BASE_URL}/api/promotions/search/findByPafRef?projection=PromotionCustomerView&pafRef=${id}`;

    const data = FetchData({url});

    const stkM = FetchStockManager({url});

    const commM = FetchCommercialManager({url});

    const promoPriceUrl = FetchPromotionPricesHref({url});

    const rUrl = promoPriceUrl.replace('{?projection}', '?projection=PromotionPriceProductView');

    const products = FetchPafProducts(rUrl);

    const AnalysisData = GetAnalysisData(products);

    const ProfitDataOnPromo = GetProfitOnPromo(products);

    const ProfitDataStandardBusiness = GetProfitStandardBusiness(products);

    return (
        <div className='page'>
              <div className='pageTop'>
                <AiIcons.AiOutlineBars className='pageTitleIcon'/>
                <h2 className='pageTitle'>PAF REQUEST DETAILS</h2>
              </div>
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
              </div>
            </div>
      )
    
}

export function PromotionPricesList({id}) {

    const url = `${BASE_URL}/api/promotions/search/findByPafRef?pafRef=${id}`;

    const data = FetchPromotionPricesData({url});

    return (
        <Table getRowId={(row) => row.productSku} data={data} columns={PromotionPriceColumns}/>
    )

}