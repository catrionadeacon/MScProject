import { FetchPromotionsData } from "../../adapters/PafAdapter";
import { MyPafRequestColumns } from "../../datagrid-columns/PafDatagridColumns";
import Table from "../general/Table";
import { BASE_URL } from "../../Constants";

export function MyRequestsComponent() {

    const username = sessionStorage.getItem("username");

    const url = `${BASE_URL}/api/promotions/search/findByStatusNotAndCustomer_Manager_Username?status=APPROVED&username=${username}`;

    console.log(url);

    const data = FetchPromotionsData({url});

    console.log(url);

    return (
        <Table getRowId={(row) => row._links.self.href} columns={MyPafRequestColumns} data={data}/>
    )
}