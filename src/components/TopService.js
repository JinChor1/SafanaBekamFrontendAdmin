import ProgressBar from "@ramonak/react-progress-bar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faMagnifyingGlassChart
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'

const bgColor = [
    "#5C5CFA",
    "#FA5C76",
    "#5CFA61",
    "#FAB05C",
]

const baseBgColor = [
    "#CECEFE",
    "#FECED5",
    "#CEFECF",
    "#FEE7CE",
]

const TopService = ({topServiceData}) => {
    return(
        <div className='booking-insight-container'>
            { topServiceData.length===0?
                <div className="not-found">
                    <p className="not-found-icon"><FontAwesomeIcon icon={faMagnifyingGlassChart}/></p>
                    <p>No booking found...</p>
                </div>
            :
                <div>
                    <div className="top-service-header">
                        <p className="col-2">#</p>
                        <p className="col-4">Name</p>
                        <p className="col-4">Percentage</p>
                    </div>
                    {topServiceData.map((eachService,index)=>(
                        <div className="top-service-row" key={eachService.serviceDetails._id}>
                            <p className="col-2">{eachService.position}</p>
                            <p className="col-4">{eachService.serviceDetails.serviceName}</p>
                            <div 
                                className="col-6 progress-bar-container"
                                data-tooltip-id="progress-bar-tooltip" 
                                data-tooltip-content={"Booked: " + eachService.count}
                            >
                                <ProgressBar 
                                    completed={eachService.percentage}
                                    customLabel={eachService.percentage.toFixed(0)+" %"}    
                                    height="10px"
                                    labelSize="8px"
                                    animateOnRender={true}
                                    bgColor={bgColor[index]}
                                    baseBgColor={baseBgColor[index]}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            }
            <Tooltip id="progress-bar-tooltip"/>
        </div>
    )
}

export default TopService