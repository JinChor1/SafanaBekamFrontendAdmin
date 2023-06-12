import { useEffect ,useState } from "react"
import CompleteBooking from './CompleteBooking'
import EditBooking from './EditBooking'
import ViewCompleted from './ViewCompleted'

const BookModal = ({closeModal, option}) => {
    const [ modalOption, setModalOption ] = useState(option.modalOption)

    useEffect(()=>{

    },[])

    return(
        <div className="booking-modal">
            <h2>{ modalOption === "Complete"? "Complete Booking": modalOption === "ViewCompleted"? "Record Details" : "Booking Details"}</h2>
            { modalOption === "Complete" &&
                <CompleteBooking bookingId={option._id} closeModal={closeModal} setModalOption={setModalOption}/>
            }
            { modalOption === "Edit" &&
                <EditBooking bookingId={option._id} closeModal={closeModal} setModalOption={setModalOption}/>
            }
            { modalOption === "ViewCompleted" &&
                <ViewCompleted bookingId={option._id} closeModal={closeModal} setModalOption={setModalOption}/>
            }
        </div>
    )
}

export default BookModal