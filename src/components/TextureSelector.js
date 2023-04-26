import { useEffect, useState } from "react"
import { useStore } from "../hooks/useStore"
import { useKeyboard } from "../hooks/useKeyboard"
import { dirtImg, grassImg, glassImg, woodImg, logImg, stoneIMG, sandIMG, cobblestoneIMG} from "../images/images"
import "./TextureSelector.css"

const images ={
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
    stone: stoneIMG,
    sand: sandIMG,
    cobblestone: cobblestoneIMG,
}

export const TextureSelector = () => {
    const [visible] = useState(true)
    const [activeTexture, setTexture] = useStore((state) => [state.texture,state.setTexture])
    const {dirt, stone, grass, glass, wood, log, sand, cobblestone} = useKeyboard()
 
    useEffect(() => {
        const textures = {
            dirt,
            stone,
            grass,
            glass,
            wood,
            log,
            sand,
            cobblestone,
        }
        const pressedTexture = Object.entries(textures).find(([k, v]) => v)
        if(pressedTexture){
            setTexture(pressedTexture[0])
        }
    }, [setTexture,dirt,stone, grass,glass,wood,log,sand,cobblestone])

    return visible && (
        <div className="texture-select">
            {Object.entries(images).map(([k,src]) => {
                return (<img key={k} src={src} alt={k} className={`${k === activeTexture  ? 'active' : ''}`}/>)
            })}
        </div>
    )
}