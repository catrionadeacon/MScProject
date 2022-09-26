export const PricebookColumns = [
    { field: 'productSku', headerName: 'Sku', width: 200, valueGetter: ({row}) => row.product.sku},
    { field: 'productDescription', headerName: 'Description', width: 350, valueGetter: ({row}) => row.product.description},
    { field: 'productCategory', headerName: 'Category', width: 300, valueGetter: ({row}) => row.product.category},
    { field: 'productUnits', headerName: 'Units Per Case', width: 175, valueGetter: ({row}) => row.product.units},
    { field: 'customerListPrice', headerName: 'Customer List Price', width: 175 },
    { field: 'standardPrice', headerName: 'Standard Price', width: 175, valueGetter: ({row}) => row.product.standardPrice},
    { field: 'landedCost', headerName: 'Landed Cost', width: 175, valueGetter: ({row}) => row.product.landedCost}
];
