// Import required libraries
import { PointerLockControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

// Define FPV component
export const FPV = () => {
    // Get camera and WebGL context from Three.js
    const {camera, gl} = useThree()

    // Return PointerLockControls component with camera and WebGL context as arguments
    return(<PointerLockControls args={[camera, gl.domElement]}/>)
}
