import { Link } from "react-router-dom";
import { ViewButton } from "../components/general/Button";
import Marker from "../components/general/Marker";

export const PromotionColumns = [
    { field: 'pafRef', headerName: 'PAF Reference', width: 150 },
    { field: 'promotionRef', headerName: 'Promotion Reference', width: 300 },
    { field: 'customerCode', headerName: 'Customer Code', width: 150},
    { field: 'productGroup', headerName: 'Customer Code', width: 150},
    { field: 'promotionType', headerName: 'Promotion Type', width: 150, renderCell: (params) =>{
        return (
            <Marker type={params.row.promotionType}/>
        )
    } },
    { field: 'sageStart', headerName: 'Sage Start', width: 150 },
    { field: 'sageEnd', headerName: 'Sage End', width: 150 },
    { field: 'storeStart', headerName: 'Store Start', width: 150 },
    { field: 'storeEnd', headerName: 'Store End', width: 150 },
    { field: 'mechanic', headerName: 'Mechanic', width: 125, valueGetter: ({row}) => {
        if((row.mechanic !== undefined) && (row.mechanic !== null)) {
            return row.mechanic.replace('Â', '');
        }
        return "";
    }},
    { field: 'entryDate', headerName: 'Entry Date', width: 150 },
    { field: 'products', headerName: 'Products', width: 150, renderCell: (params) =>{
      return (
          <Link to= {"/promotion_prices/"+params.row.pafRef}>
              <ViewButton/>
          </Link>
      )
  } },
    { field: 'details', headerName: 'Details', width: 150, renderCell: (params) =>{
        return (
            <Link to= {"/promotion_analysis/"+params.row.pafRef}>
                <ViewButton/>
            </Link>
        )
    } }
];

export const PromotionPriceColumns = [
    { field: 'productSku', headerName: 'Product Sku', width: 150 },
    { field: 'category', headerName: 'Product Category', width: 300, valueGetter: ({row}) => row.product.category },
    { field: 'productGroup', headerName: 'Product Group', width: 200, valueGetter: ({row}) => row.product.productGroup },
    { field: 'description', headerName: 'Product Description', width: 300, valueGetter: ({row}) => row.product.description },
    { field: 'landedCost', headerName: 'Landed Cost', width: 150, valueGetter: ({row}) => row.product.landedCost },
    { field: 'standardPrice', headerName: 'Standard Price', width: 150, valueGetter: ({row}) => row.product.standardPrice },
    { field: 'customerListPrice', headerName: 'Customer List Price', width: 150},
    { field: 'promoPrice', headerName: 'Promotional Price', width: 150},
    { field: 'offPromoVol', headerName: 'Volumes Not Promoting', width: 200 },
    { field: 'promoVol', headerName: 'Volumes Promoting', width: 200 },
    { field: 'retroFunding', headerName: 'Retro Funding per Case', width: 200 }
  ];
  
