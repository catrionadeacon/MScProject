import { Link } from "react-router-dom";
import { ViewButton } from "../components/general/Button";
import Marker from "../components/general/Marker";
import Moment from 'moment';

export const OffInvoicePriceChangeInColumns = [
    { field: 'pafReference', headerName: 'Paf Reference', width: 200 },
    { field: 'promotionType', headerName: 'Promotion Type', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.promotion.promotionType}/>
        )
      } },
    { field: 'status', headerName: 'Promotion Status', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.promotion.status}/>
        )
    } },
    { field: 'productSku', headerName: 'Product Sku', width: 350 },
    { field: 'customer', headerName: 'Customer', width: 350, valueGetter: ({row}) => row.promotion.customerCode + " " + row.promotion.customer.name},
    { field: 'sageStart', headerName: 'Sage Start', width: 350, valueGetter: ({row}) => Moment(row.promotion.sageStart).format('DD/MM/YYYY')},
    { field: 'promoPrice', headerName: 'Promotion Price', width: 200 },
    { field: 'sageStatus', headerName: 'Sage Status', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.sageStatus}/>
        )
    } },
    { field: 'details', headerName: 'Details', width: 150, renderCell: (params) =>{
        return (
            <Link to= {"/price_change_in_details/"+params.row.pafReference+"/"+params.row.productSku}>
                <ViewButton/>
            </Link>
        )
    } }
];

export const OffInvoicePriceChangeOutColumns = [
    { field: 'pafReference', headerName: 'Paf Reference', width: 200 },
    { field: 'promotionType', headerName: 'Promotion Type', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.promotion.promotionType}/>
        )
      } },
    { field: 'status', headerName: 'Promotion Status', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.promotion.status}/>
        )
    } },
    { field: 'productSku', headerName: 'Product Sku', width: 350 },
    { field: 'customer', headerName: 'Customer', width: 350, valueGetter: ({row}) => row.promotion.customerCode + " " + row.promotion.customer.name},
    { field: 'sageEnd', headerName: 'Sage End', width: 350, valueGetter: ({row}) => Moment(row.promotion.sageEnd).format('DD/MM/YYYY')},
    { field: 'customerListPrice', headerName: 'Customer List Price', width: 200 },
    { field: 'sageStatus', headerName: 'Sage Status', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.sageStatus}/>
        )
    } },
    { field: 'details', headerName: 'Details', width: 150, renderCell: (params) =>{
        return (
            <Link to= {"/price_change_out_details/"+params.row.pafReference+"/"+params.row.productSku}>
                <ViewButton/>
            </Link>
        )
    } }
];

