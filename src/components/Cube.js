// Import necessary modules and components
import { useBox } from "@react-three/cannon"
import * as textures from "../images/textures"
import { useStore } from "../hooks/useStore"
import { useState } from "react"

// Define Cube component with props: position, texture
export const Cube = ({ position, texture }) => {

    // Set up state for hover effect
    const [isHovered,setIsHovered] = useState(false)

    // Use useBox hook to create a static physical box at given position
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))

    // Use useStore hook to get functions for adding and removing cubes
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube])

    // Determine which texture to use based on given texture prop
    const activeTexture = textures[texture + 'Texture']

    // Return a mesh component representing a cube
    return (
        <mesh
            // Set up hover event handlers to update state
            onPointerMove={(e) => {
                e.stopPropagation()
                setIsHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setIsHovered(false)
            }}
            // Set up click event handlers to add or remove cubes on right or left click
            onClick={(e) => {
                e.stopPropagation()
                const clickedFace = Math.floor(e.faceIndex / 2)
                const {x,y,z} = ref.current.position
                if(e.button === 0){
                    removeCube(x,y,z)
                    return
                }
                if(clickedFace === 0 && e.button === 2) {
                    addCube(x + 1, y, z)
                    return
                }
                else if(clickedFace === 1 && e.button === 2) {
                    addCube(x - 1, y, z)
                    return
                }
                else if(clickedFace === 2 && e.button === 2) {
                    addCube(x, y + 1, z)
                    return
                }
                else if(clickedFace === 3 && e.button === 2) {
                    addCube(x, y - 1, z)
                    return
                }
                else if(clickedFace === 4 && e.button === 2) {
                    addCube(x, y, z + 1)
                    return
                }
                else if(clickedFace === 5 && e.button === 2) {
                    addCube(x, y, z - 1)
                    return
                }
            }}
            // Attach the physical box created by useBox to the mesh component
            ref={ref}>
                <boxBufferGeometry attach="geometry"/>
                {/* Set material properties including texture, opacity, and color */}
                <meshStandardMaterial 
                    color={isHovered ? 'grey' : 'white'} 
                    map={activeTexture}
                    transparent={true}
                    opacity={texture === 'glass' ? 0.6 : 1} 
                    attach="material"/>
        </mesh>
    )
}
