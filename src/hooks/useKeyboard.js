import { useCallback, useEffect, useState } from "react"

// This function maps keyboard keys to game actions
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
    
    // This custom hook listens to key events and returns a state of active game actions
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

    // Handles keydown events and updates the active actions state
const handleKeyDown = useCallback((e) => {
    const action = actionByKey(e.code)
    if(action === 'sprintForward'){
        SPEED = 7
    } else {
        setActions((prev) => {
            return({
                ...prev,
                [action]: true
            })
        })
    }
}, [])  

// Handles keyup events and updates the active actions state
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

// Adds keydown and keyup event listeners to the document and removes them on unmount
useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    
    return() => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
    }
}, [handleKeyDown, handleKeyUp])

// Returns the current state of active game actions
return actions
    }