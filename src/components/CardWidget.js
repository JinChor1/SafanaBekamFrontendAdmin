import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faClock,
    faUserPlus,
    faDollar,
    faCheck
 } from '@fortawesome/free-solid-svg-icons'

const CardWidget = ({widgetData}) => {
    return(
        <div className="card-widget-container row">
            <div className="card-widget col" widget-type={"upcomingBooking"}>
                <h2><FontAwesomeIcon icon={faClock} className='card-widget-icon'/></h2>
                <h1>{widgetData.upcomingBooking.count}</h1>
                <h4>Upcoming bookings this week</h4>
                <p>{widgetData.upcomingBooking.percentage} from last week</p>
            </div>
            <div className="card-widget col" widget-type={"completedBooking"}>
                <h2><FontAwesomeIcon icon={faCheck} className='card-widget-icon'/></h2>
                <h1>{widgetData.completedBooking.count}</h1>
                <h4>Completed bookings this week</h4>
                <p>{widgetData.completedBooking.percentage} from last week</p>
            </div>
            <div className="card-widget col" widget-type={"revenue"}>
                <h2><FontAwesomeIcon icon={faDollar} className='card-widget-icon'/></h2>
                <h1>{widgetData.revenue.count}</h1>
                <h4>Revenue this week</h4>
                <p>{widgetData.revenue.percentage} from last week</p>
            </div>
            <div className="card-widget col" widget-type={"newPatient"}>
                <h2><FontAwesomeIcon icon={faUserPlus} className='card-widget-icon'/></h2>
                <h1>{widgetData.newPatient.count}</h1>
                <h4>New patient this week</h4>
                <p>{widgetData.newPatient.percentage} from last week</p>
            </div>
        </div>
    )
}

export default CardWidget