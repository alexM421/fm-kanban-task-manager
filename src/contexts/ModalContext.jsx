import React from "react";
import { createPortal } from "react-dom";

const ModalContext = React.createContext()

export function ModalProvider({children}) {

    const [modalContent, setModalContent] = React.useState(null)

    const openModal = (content) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    

    return(
        <ModalContext.Provider value={{modalContent, openModal, closeModal}}>
            { children }
            {modalContent && createPortal(modalContent,document.getElementById("modal-root"))}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    
    const context = React.useContext(ModalContext)
    if(!context){
        throw new Error("ModalContext is undefined.")
    }
    return context
}