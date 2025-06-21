import React from "react";

export default function useIsMobile () {

    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 700)
       window.addEventListener("resize",onResize)
        return () => window.removeEventListener("resize",onResize)
    },[])

    return isMobile

}