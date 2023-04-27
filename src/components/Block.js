// Import necessary libraries and components
import { useBox } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

// Define Block component with props: position and size
export const Block = ({ position, size }) => {

// Access addCube method from the global store
const [addCube] = useStore((state) => [state.addCube]);

// Define cubeSize for later use
const cubeSize = 1;

// Use useBox to create a physics object
const [ref] = useBox(() => ({
args: size,
position,
}));

// Calculate the position of the cube to be added on right-click
const calculateCubePosition = (intersectionPoint) => {
const cubeX = Math.floor(intersectionPoint.x / cubeSize) * cubeSize + cubeSize / 2;
const cubeY = Math.floor(intersectionPoint.y / cubeSize) * cubeSize + cubeSize / 2;
const cubeZ = Math.floor(intersectionPoint.z / cubeSize) * cubeSize + cubeSize / 2;
return [cubeX, cubeY, cubeZ];
};

// Return a mesh component with box geometry and standard material
return (
<mesh
// Add an onClick event listener for right-click
onClick={(e) => {
if (e.button === 2) {
// Prevent the event from bubbling up the DOM
e.stopPropagation();
// Calculate the position of the cube to be added
const [x, y, z] = calculateCubePosition(e.point);
// Call addCube method to add a new cube at the calculated position
addCube(x, y, z);
}
}}
ref={ref} position={position}>
<boxBufferGeometry attach="geometry" args={size} />
<meshStandardMaterial attach="material" map={groundTexture}/>
</mesh>
);
};