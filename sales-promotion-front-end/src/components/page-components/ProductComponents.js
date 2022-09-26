import { FetchData } from "../../adapters/GeneralAdapter";
import { ProductColumns, ProductColumnsAccM } from "../../datagrid-columns/ProductDatagridColumns";
import Table from "../general/Table";
import { BASE_URL } from "../../Constants";

export function ProductsList() {

    var rolesJson = localStorage.getItem("roles");
    
    var userRoleCode = new Set();

    if(rolesJson !== "[object Set]") {
        userRoleCode = new Set(JSON.parse(localStorage.getItem("roles")));
    }

    const url = `${BASE_URL}/products`;

    const data = FetchData({url});

    if(userRoleCode.has("AccM")) {
        return (
            <Table data={data} columns={ProductColumnsAccM}/>
        )
    }
    else {
        return (
            <Table data={data} columns={ProductColumns}/>
        )
    }

}