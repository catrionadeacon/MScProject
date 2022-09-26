import { Link } from "react-router-dom";
import { EditButton } from "../components/general/Button";

export const UserColumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'email', headerName: 'Email', width: 350 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'action', headerName: 'Action', width: 200, renderCell: (params) =>{
      return (
        <>
          <Link to= {"/edit_user/"+params.row.id}>
            <EditButton/>
          </Link>
        </> 
        )
    } }
];
