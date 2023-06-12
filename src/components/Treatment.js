import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faClock,
    faClipboard,
    faMagnifyingGlassChart,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { useAuthAPI } from "../hooks/useAuthAPI"
import Skeleton from 'react-loading-skeleton'
import { useBookModalContext } from "../hooks/useBookModalContext"

const Treatment = ({patientDraft , setPatientDraft}) => {
    const [ pagination , setPagination ] = useState(0)
    const [ booking, setBooking ] = useState([])
    const [ hasNext, setHasNext ] = useState(false)
    const { callAPI, isLoading, error } = useAuthAPI() 
    const { openModal } = useBookModalContext()

    useEffect(()=>{
        const fetchPatientBooking = async () => {
            const booking = await callAPI({
                method: "GET",
                apiRoute: `/api/admin/patient/getBooking/${patientDraft._id}/${pagination}`,
                payload: ""
            })        
            
            if (booking) {
                setBooking(prevState => [...prevState, ...booking.customerBooking])
                setHasNext(booking.hasNext)
            }
        }
        
        fetchPatientBooking()
    },[patientDraft,pagination,callAPI])

    const loadMore = () => {
        setPagination(prevState => prevState + 1)
    }

    return(
        <div>
            {isLoading && booking.length === 0 ?
                <div className="booking-history-div">
                    <Skeleton className="booking-history"
                        width="95%"
                        height="75px"
                        borderRadius="20px"
                    />
                    <Skeleton className="booking-history"
                        width="95%"
                        height="75px"
                        borderRadius="20px"
                    />
                    <Skeleton className="booking-history"
                        width="95%"
                        height="75px"
                        borderRadius="20px"
                    />
                    <Skeleton className="booking-history"
                        width="95%"
                        height="75px"
                        borderRadius="20px"
                    />
                    <Skeleton className="booking-history"
                        width="95%"
                        height="75px"
                        borderRadius="20px"
                    />
                </div>
            :
                <div>
                    {booking.length > 0? 
                        <div className="booking-history-div">
                            {booking && booking.map((book) => (
                                <div
                                    data-booking={book.bookingDetails.bookingStatus}
                                    className="booking-history"
                                    key={book.bookingDetails._id}
                                >
                                    <div className="col-8">
                                        <h3><FontAwesomeIcon icon={faClipboard}/> {book.serviceDetails.serviceName}</h3>
                                        <p>{book.bookingDetails.bookingNumber}</p>
                                        <p><FontAwesomeIcon icon={faClock}/> {new Date(book.bookingDetails.bookingDate.startTime).toLocaleString('en-NZ',{day: "numeric" ,month: "short", year: "numeric", hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                    </div>
                                    <div className="booking-history-action col-4">
                                        <h3>{book.bookingDetails.bookingStatus==="Active"?"UPCOMING":book.bookingDetails.bookingStatus.toUpperCase()}</h3>
                                        {book.bookingDetails.bookingStatus==="Completed" &&
                                            <button 
                                                onClick={()=>openModal({_id: book.bookingDetails._id, modalOption: "ViewCompleted"})}
                                            >
                                                View Records <FontAwesomeIcon icon={faChevronRight}/>
                                            </button>
                                        }
                                    </div>
                                </div>
                            ))}
                            {hasNext? 
                                <div className="book-button-div">
                                    <button 
                                        className="button-primary"
                                        onClick={loadMore}
                                    >
                                        <h3>{isLoading ? "Loading...":"Load More"}</h3>
                                    </button>
                                </div>
                            : 
                                null
                            }
                        </div>
                    : 
                        <div className='no-data'>
                            <p className="not-found-icon"><FontAwesomeIcon icon={faMagnifyingGlassChart}/></p>
                            <h4> No booking found...</h4>
                        </div>
                    }
                </div>
            }   
        </div>
    )
}

export default Treatment