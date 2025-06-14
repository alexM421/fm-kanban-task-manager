import React from "react";
import styles from "./ThemeSwitchButton.module.css"

export default function ThemeSwitchButton () {

    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        document.body.classList.toggle("dark-mode")
    },[isDark])

    return(
        <div className={styles.container}>
            <img src="/assets/icon-light-theme.svg"/>
            <label 
            htmlFor="theme-switch"
            className={`${styles["theme-switch-btn"]}`}
            >
                <input 
                id="theme-switch" 
                type="checkbox" 
                value={isDark}
                onChange={() => setIsDark(prevState => !prevState)}
                />
            </label>
            <img src="/assets/icon-dark-theme.svg"/>
        </div>
    )
}