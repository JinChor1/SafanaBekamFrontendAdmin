import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

const options = {
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            },
            beginAtZero: true
        }
    },
    tension: 0.5,
    maintainAspectRatio: false,
    ticks: {
        precision:0
    }
}

const BookingLineChart = ({bookingLineData}) => {
    return(
        <div className='booking-insight-container'>
            <div className="line-container">
                 <Line 
                    data={bookingLineData}
                    options={options}
                    width={300}
                />
            </div>
        </div>
    )
}

export default BookingLineChart