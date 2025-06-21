import React from "react";

import { useModalContext } from "../../contexts/ModalContext";

export default function useDisplayHandler () {

    const { closeModal } = useModalContext()

    const displayHandler = (containerRef,setDisplayModal, otherRef=false) => {

        React.useEffect(() => {
        
            const handleClickOutside = (e) => {

                if(containerRef.current && !containerRef.current.contains(e.target)){
                    if(!otherRef.current){
                        setDisplayModal(false)
                    }
                    if(otherRef.current && !otherRef.current.contains(e.target)){
                        setDisplayModal(false)
                    }
                }
            }

            document.body.addEventListener("mousedown",handleClickOutside)
            return () => document.body.removeEventListener("mousedown",handleClickOutside)
        },[])
    }
    return displayHandler
}