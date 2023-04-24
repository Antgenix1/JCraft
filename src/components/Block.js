import { useBox } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

export const Block = ({ position, size }) => {
  const [addCube] = useStore((state) => [state.addCube]);
  const cubeSize = 1;


  const [ref] = useBox(() => ({
    args: size,
    position,
  }));

  const calculateCubePosition = (intersectionPoint) => {
    const cubeX = Math.floor(intersectionPoint.x / cubeSize) * cubeSize + cubeSize / 2;
    const cubeY = Math.floor(intersectionPoint.y / cubeSize) * cubeSize + cubeSize / 2;
    const cubeZ = Math.floor(intersectionPoint.z / cubeSize) * cubeSize + cubeSize / 2;
    return [cubeX, cubeY, cubeZ];
  };
  

  return (
    <mesh
    onClick={(e) => {
      e.stopPropagation();
      const [x, y, z] = calculateCubePosition(e.point);
      addCube(x, y, z);
    }}
    ref={ref} position={position}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshStandardMaterial attach="material" map={groundTexture}/>
      
    </mesh>
  );
};
