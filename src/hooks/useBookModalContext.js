import { BookModalContext } from "../context/BookModalContext"
import { useContext } from "react"

export const useBookModalContext = () => {
    const context = useContext(BookModalContext)

    if (!context) {
        throw Error("useBookModalContext must be used inside BookModalContextProvider")
    }

    return context
}