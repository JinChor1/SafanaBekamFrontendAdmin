import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const options = {
    responsive: true,
}

const InsightDoughnut = ({bookingInsightData}) => {
    return(
        <div className='booking-insight-container'>
            <div className="doughnut-container">
                 <Doughnut 
                    data={bookingInsightData.data}
                    options={options}
                    width={200}
                    height={200}
                />
            </div>
           
            <div className="booking-insight-percentage">
                <div className='insight-percentage'>
                    <h1>{bookingInsightData.percentageData.upcomingBooking.upcomingBookingPercentage}</h1>
                    <h4>{bookingInsightData.percentageData.upcomingBooking.display}</h4>
                </div>
                <div className='insight-percentage'>
                    <h1>{bookingInsightData.percentageData.completedBooking.completedBookingPercentage}</h1>
                    <h4>{bookingInsightData.percentageData.completedBooking.display}</h4>
                </div>
                <div className='insight-percentage'>
                    <h1>{bookingInsightData.percentageData.cancelledBooking.cancelledBookingPercentage}</h1>
                    <h4>{bookingInsightData.percentageData.cancelledBooking.display}</h4>
                </div>
            </div>
        </div>
    )
}

export default InsightDoughnut