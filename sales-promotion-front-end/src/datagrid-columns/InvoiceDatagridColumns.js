import { Link } from "react-router-dom";
import Marker from "../components/general/Marker";
import { ViewButton } from "../components/general/Button";

export const InvoiceColumns = [
    { field: 'invoiceReference', headerName: 'Invoice Reference', width: 300 },
    { field: 'invoiceDate', headerName: 'Invoice Date', width: 200 },
    { field: 'entryDate', headerName: 'Entry Date', width: 150 },
    { field: 'periodStart', headerName: 'Period Invoiced Start', width: 200 },
    { field: 'periodEnd', headerName: 'Period Invoiced End', width: 200 },
    { field: 'totalInvoiced', headerName: 'Total Invoiced', width: 150 },
    { field: 'approvalStatus', headerName: 'Approval Status', width: 175, renderCell: (params) =>{
        return (
          <Marker type={params.row.approvalStatus}/>
        )
    } },
    { field: 'details', headerName: 'Details', width: 150, renderCell: (params) =>{
        return (
          <Link to= {"/invoice_details/"+params.row.invoiceReference}>
              <ViewButton/>
          </Link>
        )
    } }
];

export const InvoiceLineItemColumns = [
    { field: 'reference', headerName: 'Product Reference', width: 350 },
    { field: 'totalUnits', headerName: 'Total Units Sold', width: 200 },
    { field: 'promoUnits', headerName: 'Promo Units Sold', width: 195},
    { field: 'unitCharge', headerName: 'Charge per Unit', width: 195},
    { field: 'totalCost', headerName: 'Total Cost', width: 195 },
    { field: 'vat', headerName: 'VAT', width: 195 }
];

export const InvoicePafSelectColumns = [
    { field: 'id', headerName: 'Paf Reference', width: 125, valueGetter: ({row}) => row.pafRef },
    { field: 'promoRef', headerName: 'Promotion Reference', width: 250, valueGetter: ({row}) => row.promotionRef },
    { field: 'promotionType', headerName: 'Promotion Type', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.promotionType}/>
        )
      } },
    { field: 'entryDate', headerName: 'Entry Date', width: 120 },
    { field: 'storeStart', headerName: 'Store Start', width: 120 },
    { field: 'storeEnd', headerName: 'Store End', width: 120 },
    { field: 'mechanic', headerName: 'Mechanic', width: 125, valueGetter: ({row}) => {
        if((row.mechanic !== undefined) && (row.mechanic !== null)) {
            return row.mechanic.replace('Â', '');
        }
        return "";
    }},
    { field: 'status', headerName: 'Status', width: 160, renderCell: (params) =>{
      return (
        <Marker type={params.row.status}/>
      )
    } }
  ];

