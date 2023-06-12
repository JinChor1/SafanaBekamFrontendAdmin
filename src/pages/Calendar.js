import { useEffect, useState } from 'react';
import { useAuthAPI } from "../hooks/useAuthAPI"
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import { useBookModalContext } from "../hooks/useBookModalContext"

const Calendar = () => {
    const [ booking, setBooking ] = useState(null)
    const [ currentStart, setCurrentStart ] = useState("")
    const [ currentEnd, setCurrentEnd ] = useState("")
    const { callAPI, isLoading, error, errorData } = useAuthAPI()
    const { openModal } = useBookModalContext()

    useEffect(()=>{
        const fetchBookingMonth = async () => {
            const response = await callAPI({
                method: "POST",
                apiRoute: "/api/admin/calendar",
                payload: {
                    currentStart,
                    currentEnd
                }
            }) 
            
            if (response) {
                setBooking(response)
            }
        }
        
        if (currentStart && currentEnd){
            fetchBookingMonth()
        }
    },[currentStart,currentEnd,callAPI,openModal])

    return(
        <div className="react-body">
            <div className="react-container">
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    datesSet={(current)=>{
                        setCurrentStart(current.start)
                        setCurrentEnd(current.end)
                    }}
                    loading={isLoading}
                    events={booking}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: 'short'
                    }}
                    eventClick={(eventClickInfo)=>{
                        openModal({_id: eventClickInfo.event.id, modalOption: "Edit"})
                    }}
                />
            </div>
        </div>
    )
}

export default Calendar