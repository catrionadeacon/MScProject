import { Link } from "react-router-dom";
import { ViewButton } from "../components/general/Button";
import Marker from "../components/general/Marker";
import Moment from 'moment';

export const ProductPriceRequestColumns = [
    { field: 'accountManager', headerName: 'Account Manager', width: 150, valueGetter: ({row}) => row.accountManager.firstName + ' ' + row.accountManager.lastName},
    { field: 'sku', headerName: 'Sku', width: 120, valueGetter: ({row}) => row.product.sku },
    { field: 'description', headerName: 'Description', width: 350, valueGetter: ({row}) => row.product.description },
    { field: 'category', headerName: 'Category', width: 275, valueGetter: ({row}) => row.product.category },
    { field: 'date', headerName: 'Date', width: 100, valueGetter: ({row}) => Moment(row.date).format('DD/MM/YYYY') },
    { field: 'landedCost', headerName: 'Landed Cost', width: 120, valueGetter: ({row}) => row.product.landedCost },
    { field: 'originalPrice', headerName: 'Standard Price', width: 120, valueGetter: ({row}) => row.product.standardPrice },
    { field: 'price', headerName: 'Requested Standard Price', width: 190 },
    { field: 'status', headerName: 'Status', width: 160, renderCell: (params) =>{
      return (
        <Marker type={params.row.status}/>
      )
    } },
    { field: 'details', headerName: 'View Details', width: 150, renderCell: (params) =>{
        return (
            <Link to={`/product_request_details/${params.row.product.sku}`}>
                <ViewButton/>
            </Link>
        )
    } }
];

export const PricebookPriceRequestColumns = [
    { field: 'accountManager', headerName: 'Account Manager', width: 150, valueGetter: ({row}) => row.accountManager.firstName + ' ' + row.accountManager.lastName},
    { field: 'customer', headerName: 'Customer', width: 200, valueGetter: ({row}) => row.customer.customerCode + ' ' + row.customer.name},
    { field: 'sku', headerName: 'Sku', width: 120, valueGetter: ({row}) => row.product.sku },
    { field: 'description', headerName: 'Description', width: 350, valueGetter: ({row}) => row.product.description },
    { field: 'category', headerName: 'Category', width: 200, valueGetter: ({row}) => row.product.category },
    { field: 'date', headerName: 'Date', width: 100, valueGetter: ({row}) => Moment(row.date).format('DD/MM/YYYY') },
    { field: 'landedCost', headerName: 'Landed Cost', width: 120, valueGetter: ({row}) => row.product.landedCost },
    { field: 'standardPrice', headerName: 'Standard Price', width: 120, valueGetter: ({row}) => row.product.standardPrice },
    { field: 'price', headerName: 'Requested Customer List Price', width: 200 },
    { field: 'status', headerName: 'Status', width: 160, renderCell: (params) =>{
      return (
        <Marker type={params.row.status}/>
      )
    } },
    { field: 'details', headerName: 'View Details', width: 150, renderCell: (params) =>{
        return (
            <Link to={`/pricebook_request_details/${params.row.customer.customerCode}/${params.row.product.sku}`}>
                <ViewButton/>
            </Link>
        )
    } }
];
