import "../../styles/dashboard.css"
import { dashboardPromotionColumns, dashboardChartData } from "../../datagrid-columns/HomeDatagridColumns"
import { GetDashboardPromotionsData } from "../../adapters/HomeAdapter"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import Moment from 'moment';
import { BASE_URL } from "../../Constants";

export function Dashboard() {

    return (
        <div className="dashContainer">
            <div className="dashComponents">
                <div className="generalDash">
                    <OngoingPromotions/>
                    <UpcomingPromotions/>
                    <DashboardAnalysisChart/>
                </div>
            </div>
        </div>
    )
}

function OngoingPromotions() {

    const todayDate = Moment().format('DD/MM/YYYY');

    const url = `${BASE_URL}/api/promotions/search/findByStatusNotAndStoreStartLessThanEqualAndStoreEndGreaterThanEqual?status=REJECTED&start=${todayDate}&end=${todayDate}`;
    
    const data = GetDashboardPromotionsData({url});

    return (
        <TableWidget title="Ongoing Promotions" data={data} columns={dashboardPromotionColumns}/>
    )

}

function UpcomingPromotions() {

    const todayDate = Moment().format('DD/MM/YYYY');

    const nextMonth = Moment().add(1, 'months').format('DD/MM/YYYY');

    const url = `${BASE_URL}/api/promotions/search/findByStatusNotAndStoreStartGreaterThanEqualAndStoreStartLessThanEqual?status=REJECTED&start=${todayDate}&end=${nextMonth}`;

    const data = GetDashboardPromotionsData({url});

    return (
        <TableWidget title="Upcoming Promotions" data={data} columns={dashboardPromotionColumns}/>
    )
}

function DashboardAnalysisChart() {

    return (
        <div className="homeWidget" style={{height:'600px'}}>
            <div className='titleContainer'>
                <AiIcons.AiOutlineAreaChart className='componentTitleIcon'/>
                <h3 className='componentTitle'>This Month Promotions Analytics</h3>
            </div>
            <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart data={dashboardChartData}>
                    <XAxis dataKey="name" stroke="grey"/>
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#00bcd4" fill="#00bcd4"/>
                    <Area type="monotone" dataKey="pv" stroke="#42c3d4" fill="#42c3d4"/>
                    <Area type="monotone" dataKey="amt" stroke="#78cbd5" fill="#78cbd5"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
      )
    
}

export default function TableWidget({title, columns, data}) {
    return (
      <div className='homeWidget'>
          <div className='titleContainer'>
              <BsIcons.BsGraphUp className='componentTitleIcon'/>
              <h3 className='componentTitle'>{title}</h3>
          </div>
          <DataGrid
              rowHeight={35}
              rows={data}
              disableSelectionOnClick
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.pafRef}
              sx={{borderColor: '#00bcd4'}}
              hideFooter={true}
          />
      </div>
    )
  }
  