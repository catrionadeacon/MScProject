import "../../styles/component.css";
import { Link } from "react-router-dom";
import { Button } from "../general/Button";
import { FetchCustomerData, FetchPricebookData } from "../../adapters/CustomerAdapter"
import { FetchData } from "../../adapters/GeneralAdapter";
import Table from "../general/Table";
import { PricebookColumns } from "../../datagrid-columns/CustomerDatagridColumns";
import { BASE_URL } from "../../Constants";

export function CustomerListComponentAccM() {

    const username = sessionStorage.getItem("username");

    const url = `${BASE_URL}/api/customers/search/findByManager_Username?username=${username}`;

    const data = FetchCustomerData({url});

    return (
        <div className='component'>
            <div className='titleContainer'>
                <span className="componentTitle">Select Customer</span>
            </div>
            <div className='customerListBottom'>
                <table>
                    {
                        data.map((item) =>
                            <tr className="customerItem">
                                <td className="customerText">{item.customerCode}</td>
                                <td className="customerText">{item.name}</td>
                                <td className="pricebookButton">
                                    <Link to= {`/pricebook/${item.customerCode}`}>
                                        <Button text="View Pricebook"/>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

export function CustomerListComponent() {

    const url = `${BASE_URL}/customers`;

    const data = FetchData({url});

    return (
        <div className='component'>
            <div className='titleContainer'>
                <span className="componentTitle">Select Customer</span>
            </div>
            <div className='customerListBottom'>
                <table>
                    {
                        data.map((item) =>
                            <tr className="customerItem">
                                <td className="customerText">{item.customerCode}</td>
                                <td className="customerText">{item.name}</td>
                                <td className="pricebookButton">
                                    <Link to= {`/pricebook/${item.customerCode}`}>
                                        <Button text="View Pricebook"/>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

export function PricebookComponent({id}) {

    const url = `${BASE_URL}/api/pricebooks/search/findByCustomerCode?customerCode=${id}`;

    const data = FetchPricebookData({url});

    return (
        <Table getRowId={(row) => row.product.sku} data={data} columns={PricebookColumns}/>
    )
}