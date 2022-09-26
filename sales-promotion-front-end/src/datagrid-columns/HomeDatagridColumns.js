import Marker from "../components/general/Marker";

export const dashboardPromotionColumns = [
    { field: 'pafRef', headerName: 'Product Reference', width: 150 },
    { field: 'customerCode', headerName: 'Customer', width: 120 },
    { field: 'productGroup', headerName: 'Product Group', width: 160},
    { field: 'sageStart', headerName: 'Sage Start', width: 100},
    { field: 'sageEnd', headerName: 'Sage End', width: 100 },
    { field: 'storeStart', headerName: 'StoreStart', width: 100},
    { field: 'storeEnd', headerName: 'Store End', width: 100 },
    { field: 'promotionType', headerName: 'Promotion Type', width: 140, renderCell: (params) =>{
      return (
        <Marker type={params.row.promotionType}/>
      )
    } },
    { field: 'status', headerName: 'Status', width: 160, renderCell: (params) =>{
      return (
        <Marker type={params.row.status}/>
      )
    } }
];

export const dashboardChartData = [
    {
      name: 'Page A',
      sales: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      sales: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      sales: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      sales: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      sales: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      sales: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      sales: 3490,
      pv: 4300,
      amt: 2100,
    },
];

