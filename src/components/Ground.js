import { noise } from "../utils/noise";
import { Block } from "./Block";

export const Ground = ({ camera }) => {

  const groundSize = 16;
  const cubeSize = 1;

  const chunkSize = 8;
  const numChunks = groundSize / chunkSize;
  
  const chunks = [];
  for (let cx = 0; cx < numChunks; cx++) {
    for (let cz = 0; cz < numChunks; cz++) {
      const chunkX = cx * chunkSize - groundSize / 2;
      const chunkZ = cz * chunkSize - groundSize / 2;
      const cubes = [];
      for (let x = chunkX; x < chunkX + chunkSize; x += cubeSize) {
        for (let z = chunkZ; z < chunkZ + chunkSize; z += cubeSize) {
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
      chunks.push(<group position={[chunkX, 0, chunkZ]}>{cubes}</group>);
    }
  }

  return (
    <>
      {chunks}
    </>
  );
};
