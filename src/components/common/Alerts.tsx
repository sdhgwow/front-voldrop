import { useEffect, useRef, useState } from "react"
import { Alert, AlertProps } from "./Alert"

export function Alerts() {

    const [alerts, setAlerts] = useState<AlertProps[]>([])
    const counter = useRef(0)
    const [hovered, setHovered] = useState(false)

    // useEffect(() => {
    //     const a = []

    //     for (let i = 0; i < 10; i++) {
    //         a.push({
    //             index: i,
    //             type: "success",
    //             name: "test",
    //             subtitle: "test"
    //         })
    //     }

    //     setAlerts(oldAlerts => [...oldAlerts, ...a])
    // }, [])

    useEffect(() => {
        window.handleAlert = (type: string, message: string, hint?: string, link?: string) => {
            const a = {
                index: counter.current,
                type,
                subtitle: message,
                hint,
                link
            }

            counter.current++

            setAlerts(oldAlerts => [...oldAlerts, a])
        }
    }, [])

    function alertClose(i) {
        setAlerts(oldAlerts => {
            return [...oldAlerts.filter(x => {
                return i != x.index
            })]
        })
    }

    function onHover() {
        setHovered(true)
    }

    function onHoverOff() {
        setHovered(false)
    }

    const alertsMapping = alerts.map(x => {
        return (
            <Alert {...x} hovered={hovered} onHover={onHover} onHoverOff={onHoverOff} key={"a" + x.index} onClose={() => alertClose(x.index)}></Alert>
        )
    })

    return (
        <div className="alerts">
            {alertsMapping}
        </div>
    )
}