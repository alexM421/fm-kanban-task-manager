import React from "react";

export default function useDisplayHandler () {

    const displayHandler = (containerRef, setDisplay, otherRef=false) => {

   

        React.useEffect(() => {
        
            const displayHandlerListener = (e) => {
    
                if(containerRef.current &&!containerRef.current.contains(e.target)){
                    if(!otherRef.current){
                        setDisplay(false)
                    }
                    if(otherRef.current && !otherRef.current.contains(e.target)){
                        setDisplay(false)
                    }
                }
            }

            document.body.addEventListener("mousedown",displayHandlerListener)

            return () => document.body.removeEventListener("mousedown",displayHandlerListener)
        },[])
    }
    return displayHandler
}