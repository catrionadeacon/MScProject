import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "../../styles/component.css";

export default function Table({data, columns, getRowId}) {
    return (
      <div className = "tableComponent" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
    );
  }
  