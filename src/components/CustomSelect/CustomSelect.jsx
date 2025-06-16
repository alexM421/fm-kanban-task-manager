import React, { use } from "react";
import styles from "./CustomSelect.module.css"
import IconCheck from "../../assets/IconCheck";
import IconChevronDown from "../../assets/IconChevronDown";
import sortBoardData from "../../features/sortBoardData";
import { useDataContext } from "../../contexts/DataContext";
import FindBoard from "../../features/findBoard";

export default function CustomSelect ({ optionsArr, selectedOption, setSelectedOption}) {

    const [displayOptions, setDisplayOptions] = React.useState(false)

    const { setData } = useDataContext()
    const currentBoard = FindBoard()

    const selectedOptionRef = React.useRef(undefined)
    const optionsRef = React.useRef(undefined)

    //handle the selection of a new option
    const handleSelectingOption = (e) => {
        setSelectedOption(e.currentTarget.dataset.option)
        sortBoardData(currentBoard, setData)
    }
    
    //handle the display of the options window

    React.useEffect(() => {

        const handleDisplayOptions = (e) => {
            if(!selectedOptionRef.current.contains(e.target)){
                setDisplayOptions(false)
            }
        }

        document.addEventListener("mousedown",handleDisplayOptions)

        return () => document.removeEventListener("mousedown",handleDisplayOptions)

    },[])


    return(
        <div 
        className={`${styles.container} ${displayOptions? styles.focused:""}`}
        ref={selectedOptionRef}
        onClick={() => setDisplayOptions(prevState => !prevState)}
        >
            <p className={`b-l`}>{selectedOption}</p>
            <IconChevronDown className={displayOptions? styles["arrow-up"]:""}/>
            <div 
                className={`${styles.options} ${!displayOptions? styles.hidden:""}`} 
                ref={optionsRef}
            >
                {optionsArr.map((option,index) => { 
                    return(
                        <>
                            <div 
                            className={styles.option} 
                            key={`option-${index}`}
                            onClick={handleSelectingOption}
                            data-option={option}
                            >
                                <p className="b-l">{option}</p>
                            </div>
                            {index!==optionsArr.length-1? <hr/>:""}
                        </>
                    )
                })}
            </div>
        </div>
    )
}