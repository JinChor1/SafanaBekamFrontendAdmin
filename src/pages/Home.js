import { useEffect, useState } from "react"
import CardWidget from "../components/CardWidget"
import InsightDoughnut from "../components/InsightDoughnut"
import BookingLineChart from "../components/BookingLineChart"
import TopService from "../components/TopService"
import { useAuthAPI } from "../hooks/useAuthAPI"
import Skeleton from 'react-loading-skeleton'

const Home = () => {
    const [dashboard, setDashboard] = useState(null)
    const { callAPI, isLoading, error } = useAuthAPI()

    useEffect(()=>{
        const fetchDashboardData = async () => {
            const dashboardData = await callAPI({
                method: "GET",
                apiRoute: "/api/admin/dashboard",
                payload: ""
            })        
            
            if (dashboardData) {
                setDashboard(dashboardData)
            }
        }
        
        fetchDashboardData()
    },[callAPI])

    return(
        <div className="react-body">
            { dashboard && isLoading===false ?
                <div className="react-container dashboard-container">
                    <div className="dashboard-container-row flex-wrap">
                        <div className="dashboard-card-module-left dashboard-first-module-left">
                            <h3>This Week's Appointments</h3>
                            <p>Summary</p>
                            <CardWidget widgetData={dashboard.widgetData}/>
                        </div>
                        <div className="dashboard-card-module col">
                            <h3>Insights</h3>
                            <InsightDoughnut bookingInsightData={dashboard.bookingInsightData}/>
                        </div>  
                    </div> 
                    <div className="dashboard-container-row flex-wrap">
                        <div className="dashboard-card-module-left dashboard-second-module-left">
                            <h3>Past Weeks' Appointments</h3>
                            <BookingLineChart bookingLineData={dashboard.bookingLineData}/>
                        </div>
                        <div className="dashboard-card-module col">
                            <h3>Top Booked Service</h3>
                            <TopService topServiceData={dashboard.topServiceData}/>
                        </div>  
                    </div> 
                </div>
            :
                <div className="react-container dashboard-container">
                    <div className="dashboard-container-row flex-wrap">
                        <Skeleton containerClassName="dashboard-card-skeleton-left dashboard-card-skeleton dashboard-first-module-left" height={400}/>
                        <Skeleton containerClassName="col dashboard-card-skeleton" height={400}/>
                    </div>
                    <div className="dashboard-container-row flex-wrap">
                        <Skeleton containerClassName="dashboard-card-skeleton-left dashboard-card-skeleton dashboard-second-module-left" height={380}/>
                        <Skeleton containerClassName="col dashboard-card-skeleton" height={380}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home