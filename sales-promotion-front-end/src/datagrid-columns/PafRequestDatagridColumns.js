import { Link } from "react-router-dom";
import { ViewButton } from "../components/general/Button";
import Marker from "../components/general/Marker";

export const PafRequestColumns = [
    { field: 'id', headerName: 'Paf Reference', width: 125, valueGetter: ({row}) => row.pafRef },
    { field: 'promoRef', headerName: 'Promotion Reference', width: 250, valueGetter: ({row}) => row.promotionRef },
    { field: 'accountManager', headerName: 'Account Manager', width: 150 },
    { field: 'customer', headerName: 'Customer', width: 125, valueGetter: ({row}) => row.customerCode },
    { field: 'promoType', headerName: 'Promotion Type', width: 150, renderCell: (params) =>{
        return (
          <Marker type={params.row.promotionType} text={params.row.promotionType}/>
        )
    } },
    { field: 'entryDate', headerName: 'Request Date', width: 130 },
    { field: 'sageStart', headerName: 'Start In Sage', width: 130 },
    { field: 'sageEnd', headerName: 'End In Sage', width: 130 },
    { field: 'storeStart', headerName: 'Start In Store', width: 130 },
    { field: 'storeEnd', headerName: 'End In Store', width: 130 },
    { field: 'mechanic', headerName: 'Mechanic', width: 125, valueGetter: ({row}) => {
        if((row.mechanic !== undefined) && (row.mechanic !== null)) {
            return row.mechanic.replace('Â', '');
        }
        return "";
    }},
    { field: 'pafDetails', headerName: 'Paf Details', width: 130, renderCell: (params) =>{
        return (
            <Link to= {"/paf_details/"+params.row.pafRef}>
                <ViewButton/>
            </Link>
        )
    } }
];
