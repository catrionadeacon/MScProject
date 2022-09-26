import { Link } from "react-router-dom";
import { ViewButton } from "../components/general/Button";
import Marker from "../components/general/Marker";

export const PafProductColumns = [
    { field: 'productSku', headerName: 'Product Sku', width: 100 },
    { field: 'landedCost', headerName: 'Landed Cost', width: 120 },
    { field: 'standardPrice', headerName: 'Standard Price', width: 120},
    { field: 'customerListPrice', headerName: 'Customer List Price', width: 150},
    { field: 'promoPrice', headerName: 'Promotional Price', width: 150 },
    { field: 'offPromoVol', headerName: 'Volumes Standard Business', width: 195 },
    { field: 'promoVol', headerName: 'Volumes on Promotion', width: 195 },
    { field: 'retroFunding', headerName: 'Retro Funding', width: 120},
    { field: 'customerInvestmentStandardBusiness', headerName: 'CI Standard Business %', width: 195 },
    { field: 'grossProfitStandardBusiness', headerName: 'GP Standard Business %', width: 195 },
    { field: 'promotionPriceReduction', headerName: 'Promotion Price Reduction %', width: 195 },
    { field: 'expectedClaim', headerName: 'Expected Claim', width: 150},
    { field: 'customerInvestmentOnPromo', headerName: 'CI On Promotion %', width: 165 },
    { field: 'grossProfitOnPromo', headerName: 'GP On Promotion %', width: 165 }
];

export const MyPafRequestColumns = [
    { field: 'id', headerName: 'Paf Reference', width: 125, valueGetter: ({row}) => row.pafRef },
    { field: 'promoRef', headerName: 'Promotion Reference', width: 250, valueGetter: ({row}) => row.promotionRef },
    { field: 'customerCode', headerName: 'Customer', width: 125 },
    { field: 'promotionType', headerName: 'Promotion Type', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.promotionType}/>
        )
      } },
    { field: 'entryDate', headerName: 'Entry Date', width: 120 },
    { field: 'sageStart', headerName: 'Sage Start', width: 120 },
    { field: 'sageEnd', headerName: 'Sage End', width: 120 },
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
    } },
    { field: 'details', headerName: 'Details', width: 100, renderCell: (params) =>{
        return (
          <Link to= {"/paf_details/"+params.row.pafRef}>
            <ViewButton/>
          </Link>
        )
    } }
  ];
