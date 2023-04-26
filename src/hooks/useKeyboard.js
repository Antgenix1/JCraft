import { useCallback, useEffect, useState } from "react"



function actionByKey(key) {
    const keyActionMap = {
        KeyW: 'moveForward',
        ShiftLeft:'sprintForward',
        ShiftRight:'sprintForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'wood',
        Digit5: 'log',
        Digit6: 'stone',
        Digit7: 'sand',
        Digit8: 'cobblestone',
    }
    return keyActionMap[key]
}

export let SPEED = 4

export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        sprintForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass : false,
        glass: false,
        wood: false,
        log: false,
        stone: false,
        sand: false,
        cobblestone: false,

    })
    const handleKeyDown = useCallback((e) => {
        const action = actionByKey(e.code)
            if(action === 'sprintForward'){
                SPEED = 7
            } 
            else {
                setActions((prev) => {
                    return({
                        ...prev,
                        [action]: true
                    })
                })
            }
    }, [])  
    const handleKeyUp = useCallback((e) => {
        const action = actionByKey(e.code)
            if(action === 'sprintForward'){
                SPEED = 4
            } else {
                setActions((prev) => {
                    return({
                       ...prev,
                        [action]: false
                    })
                })
            }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        
        return() => {
           
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return actions
    
}
