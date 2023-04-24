import { noise } from "../utils/noise";
import { Block } from "./Block";

export const Ground = () => {

  const groundSize = 20;
  const cubeSize = 1;
  
const cubes = [];
for (let x = -groundSize / 2; x < groundSize / 2; x += cubeSize) {
  for (let z = -groundSize / 2; z < groundSize / 2; z += cubeSize) {
    const y = noise(x / 20, z / 20);
    cubes.push(
      <Block
        key={`${x}-${y}-${z}`}
        position={[
          Math.floor(x) + cubeSize / 2,
          Math.floor(y) + cubeSize / 2,
          Math.floor(z) + cubeSize / 2,
        ]}
        size={[cubeSize, cubeSize, cubeSize]}
      />
    );
  }
}

  return (
    <>
      {cubes}
    </>
  );
};