import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube";

export const Cubes = () => {
    // Get the state of cubes from the store
    const [cubes] = useStore((state) => [
        state.cubes
    ])
    
    // Map over each cube and render it as a <Cube> component
    return cubes.map(({ key, pos, texture}) => {
        return (
            <Cube key={key} position={pos} texture={texture}/>
        )
    })
}
