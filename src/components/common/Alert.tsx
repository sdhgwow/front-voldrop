import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export type AlertProps = {
    index: number,
    type: "success" | "error" | "warning" | "warning-backup"
    subtitle?: string,
    hint?: string
    link?: string
    onClose?: () => void
    onHover: () => void
    onHoverOff: () => void,
    hovered: boolean
}

export function Alert(props: AlertProps) {
    const { type, subtitle, hint, link, onClose, onHover, onHoverOff, hovered } = props

    const [closed, setClosed] = useState(false)
    const [opened, setOpened] = useState(false)

    function successIcon() {
        return (
            <svg className="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
        )
    }

    function errorIcon() {
        return (
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="error-svg">
                <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
            </svg>
        )
    }

    function warningIcon() {
        return (
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="53" height="53" rx="26.5" fill="#EFA724"></rect>
                <path d="M28.5556 28.5556H25.4444V19.2222H28.5556M25.4444 31.6667H28.5556V34.7778H25.4444M32.8022 13H21.1978L13 21.1978V32.8022L21.1978 41H32.8022L41 32.8022V21.1978L32.8022 13Z" fill="white"></path>
            </svg>
        )
    }

    function defaultIcon() {
        return (
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="53" height="53" rx="26.5" fill="#428BC1"></rect>
                <path d="M34.8566 23.8818C34.8566 26.4547 33.6228 28.7384 31.7069 30.1734L33.5929 32.6881C34.962 31.6643 36.0733 30.3352 36.8384 28.8064C37.6034 27.2776 38.0012 25.5914 38 23.8818H34.8566ZM26.998 16.0233C29.0822 16.0233 31.0811 16.8512 32.5548 18.325C34.0286 19.7988 34.8566 21.7976 34.8566 23.8818H38C38 20.9639 36.8408 18.1655 34.7776 16.1023C32.7143 14.039 29.9159 12.8799 26.998 12.8799V16.0233ZM19.1395 23.8818C19.1395 21.7976 19.9675 19.7988 21.4412 18.325C22.915 16.8512 24.9138 16.0233 26.998 16.0233V12.8799C24.0801 12.8799 21.2818 14.039 19.2185 16.1023C17.1552 18.1655 15.9961 20.9639 15.9961 23.8818H19.1395ZM22.2892 30.1734C21.3105 29.4424 20.5161 28.4929 19.9692 27.4006C19.4224 26.3083 19.1383 25.1034 19.1395 23.8818H15.9961C15.9949 25.5914 16.3926 27.2776 17.1577 28.8064C17.9228 30.3352 19.0341 31.6643 20.4032 32.6881L22.2892 30.1734ZM25.4216 39.1949C25.3718 36.7984 24.8766 34.4321 23.9615 32.2166L21.057 33.4189C21.8208 35.2688 22.2373 37.2492 22.2798 39.261L25.4216 39.1949ZM29.1073 38.3588C28.4524 38.6863 27.7302 38.8569 26.998 38.8569C26.2658 38.8569 25.5437 38.6863 24.8888 38.3588L23.4837 41.1706C24.5749 41.7161 25.7781 42.0002 26.998 42.0002C28.218 42.0002 29.4212 41.7161 30.5124 41.1706L29.1073 38.3588ZM30.0346 32.2181C29.1191 34.433 28.6234 36.7988 28.5729 39.1949L31.7163 39.261C31.7587 37.2492 32.1752 35.2688 32.9391 33.4189L30.0346 32.2181ZM30.5124 41.1706C30.8679 40.9921 31.1679 40.7198 31.3801 40.3833C31.5923 40.0468 31.7085 39.6587 31.7163 39.261L28.5729 39.1949C28.5772 39.0201 28.6293 38.8497 28.7235 38.7024C28.8177 38.555 28.9504 38.4362 29.1073 38.3588L30.5124 41.1706ZM22.2798 39.261C22.2955 40.0531 22.7419 40.7997 23.4837 41.1706L24.8888 38.3588C25.0457 38.4362 25.1784 38.555 25.2726 38.7024C25.3668 38.8497 25.4189 39.0201 25.4232 39.1949L22.2798 39.261ZM20.4032 32.6881C20.6389 32.8673 20.7788 32.971 20.8762 33.0496C20.9753 33.1313 20.9564 33.1282 20.9124 33.0716L23.3957 31.1447C23.1018 30.7643 22.646 30.4405 22.2892 30.1734L20.4032 32.6881ZM23.9615 32.2166C23.8389 31.9195 23.6833 31.514 23.3957 31.1447L20.9124 33.0716C20.892 33.0433 20.8872 33.0291 20.9077 33.0716L20.9627 33.1942L21.057 33.4189L23.9615 32.2166ZM31.7069 30.1734C31.3501 30.4405 30.8927 30.7659 30.5988 31.1447L33.0837 33.0716C33.0412 33.1266 33.0208 33.1313 33.1198 33.0511C33.2173 32.971 33.3556 32.8673 33.5929 32.6897L31.7069 30.1734ZM32.9391 33.4189L33.0334 33.1942L33.0884 33.0716C33.1088 33.0291 33.1041 33.0433 33.0837 33.0716L30.5988 31.1447C30.3112 31.5156 30.1572 31.9195 30.0346 32.2181L32.9391 33.4189Z" fill="white"></path>
                <path d="M31.702 33.3125C30.3104 34.2437 28.6738 34.7407 26.9994 34.7407C25.3251 34.7407 23.6884 34.2437 22.2969 33.3125" stroke="white" strokeWidth="3.14341"></path>
            </svg>)
    }

    const icons = {
        "success": successIcon,
        "error": errorIcon,
        "warning": warningIcon,
    }

    const names = {
        "success": "Успешно!",
        "error": "Ошибка!",
        "warning": "Внимание!",
        "warning-backup": "Совет"
    }

    const name = names[type] ? names[type] : type


    const navigate = useNavigate()

    const alertName = name ? <p className={`${type}-prompt-heading`}>{name}</p> : ""
    const alertSubtitle = subtitle ? <div className={`${type}-prompt-prompt`}><p>{subtitle}</p></div> : ""
    const alertHint = hint ? <p onClick={() => {
        if (link)
            navigate(link)
    }} className="alert__hint">{hint}</p> : ""

    const alertText = [alertName, alertSubtitle, alertHint]

    const img = icons[type] ? icons[type] : defaultIcon

    function onClick() {
        setClosed(true)
    }

    function onEnd() {
        if (closed)
            onClose()
    }

    const style = closed ? { opacity: 0 } : { opacity: opened ? 1 : 0 }

    useEffect(() => {
        if (hovered) {
            return
        }

        const timer = setTimeout(() => {
            onClick()
        }, 3234000)

        return () => clearTimeout(timer)
    }, [hovered])

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpened(true)
        }, 10)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="notifications-container" onMouseEnter={onHover} onMouseLeave={onHoverOff} onTransitionEnd={onEnd} style={style}>
            <div className={type}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {img()}
                    </div>
                    <div className={`${type}-prompt-wrap`}>
                        {...alertText}
                        <div className={`${type}-button-container`}>
                            <button type="button" className={`${type}-button-main`} onClick={onClick}>Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div onMouseEnter={onHover} onMouseLeave={onHoverOff} className={`alert alert-${type}`} onTransitionEnd={onEnd} style={style}>
        //     <button className="alert__close" type="button" onClick={onClick}>
        //         <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
        //             <path fillRule="evenodd" clipRule="evenodd" d="M13.1394 3.80603L12.1927 2.85938L7.99938 7.05937L3.80603 2.85938L2.85938 3.80603L7.05937 7.99938L2.85938 12.1927L3.80603 13.1394L7.99938 8.93937L12.1927 13.1394L13.1394 12.1927L8.93937 7.99938L13.1394 3.80603Z" fill="#333333" fillOpacity="0.5" />
        //         </svg>
        //     </button>
        //     <div className="alert__content">
        //         <div className="alert__img">
        //             {img()}
        //         </div>
        //         <div className="alert__text">
        //             {...alertText}
        //         </div>
        //     </div>
        // </div>
    )
}