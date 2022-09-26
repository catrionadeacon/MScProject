import { Link } from "react-router-dom";
import { Button } from "../components/general/Button";

export const ProductColumns = [
    { field: 'sku', headerName: 'Sku', width: 200 },
    { field: 'description', headerName: 'Description', width: 350 },
    { field: 'category', headerName: 'Category', width: 350 },
    { field: 'units', headerName: 'Units Per Case', width: 200 },
    { field: 'landedCost', headerName: 'Landed Cost', width: 200 },
    { field: 'standardPrice', headerName: 'Standard Price', width: 200 },
];

export const ProductColumnsAccM = [
    { field: 'sku', headerName: 'Sku', width: 200 },
    { field: 'description', headerName: 'Description', width: 350 },
    { field: 'category', headerName: 'Category', width: 350 },
    { field: 'units', headerName: 'Units Per Case', width: 200 },
    { field: 'landedCost', headerName: 'Landed Cost', width: 200 },
    { field: 'standardPrice', headerName: 'Standard Price', width: 200 },
    { field: 'priceChange', headerName: 'Price Change', width: 150, renderCell: (params) =>{
        return (
            <Link to= {"/product_price_change/"+params.row.id}>
                <Button text="Request"/>
            </Link>
        )
    }}
];
