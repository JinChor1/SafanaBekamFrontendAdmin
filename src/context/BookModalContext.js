import { createContext, useState } from "react"
import Modal from 'react-modal'
import BookModal from '../components/BookModal'

export const BookModalContext = createContext()

export const BookModalContextProvider = ({children}) => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const [ option, setOption ] = useState({})
    
    const openModal = (newOption) => {
        setModalIsOpen(true)
        setOption(newOption)
    }
    const afterOpenModal = () => {

    }
    const closeModal = () => {
        setModalIsOpen(false)
        setOption({})
    }

    return(
        <BookModalContext.Provider value={{openModal,closeModal}}>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="admin-modal"
                overlayClassName="admin-modal-overlay"
                contentLabel="Complete Booking Modal"
                shouldCloseOnOverlayClick={true}
            >
                <BookModal closeModal={closeModal} option={option}/>
            </Modal>
            { children }
        </BookModalContext.Provider>
    )
}
