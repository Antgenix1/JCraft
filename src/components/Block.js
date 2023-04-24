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

  return (
    <mesh
    onClick={(e) => {
      e.stopPropagation();
      const [x, y, z] = Object.values(ref.current.position).map((val) =>
        Math.ceil(val - cubeSize / 2)
      );
      addCube(x, y, z);
    }}
    ref={ref} position={position}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshStandardMaterial attach="material" map={groundTexture}/>
      
    </mesh>
  );
};
