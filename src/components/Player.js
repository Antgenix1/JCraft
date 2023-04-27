// Import necessary libraries and hooks
import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import {useEffect, useRef} from "react"
import { Vector3 } from "three"
import { useKeyboard } from "../hooks/useKeyboard"
import { SPEED } from "../hooks/useKeyboard"
import { Ground } from "./Ground"

// Declare jump force constant
const JUMP_FORCE = 4

// Define the Player component
export const Player = () => {
// Get keyboard input from custom hook
const {moveBackward, moveForward, moveLeft, moveRight, jump} = useKeyboard()

// Get camera and create sphere physics object
const {camera} = useThree();
const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0,25,0]
}))

// Store and update current velocity and position of player
const vel = useRef([0,0,0])
useEffect(() => {
    api.velocity.subscribe((v) => vel.current = v)
}, [api.velocity])
const pos = useRef([0,0,0])
useEffect(() => {
    api.position.subscribe((p) => pos.current = p)
}, [api.position])

// Update player position and movement direction on each frame
useFrame(() => {
    // Move camera along with player position
    camera.position.copy(new Vector3(pos.current[0], pos.current[1]+0.8, pos.current[2]))

    // Calculate movement direction based on user input and camera rotation
    const direction = new Vector3()
    const frontVector = new Vector3(
        0,
        0,
        (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )
    const sideVector = new Vector3(
        (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
        0,
        0
    )
    direction.subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

    // Set player velocity based on calculated direction
    api.velocity.set(direction.x, vel.current[1], direction.z)

    // Apply jump force if jump key pressed and player is on the ground
    if(jump && Math.abs(vel.current[1] < 0.05)) {
        api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[0])
    }
})

// Return sphere mesh for player and Ground component
return (
    <>
    <mesh ref={ref}></mesh>
    <Ground camera={camera} />
    </>
)

}