import { noise } from "../utils/noise";
import { Block } from "./Block";

export const Ground = ({ camera }) => {

  const groundSize = 24;
  const cubeSize = 1;

  const chunkSize = 8;
  const numChunks = groundSize / chunkSize;
  
  const maxRenderDistance = 16;
  const chunks = [];
  for (let cx = 0; cx < numChunks; cx++) {
    for (let cz = 0; cz < numChunks; cz++) {
      const chunkX = cx * chunkSize - groundSize / 2;
      const chunkZ = cz * chunkSize - groundSize / 2;
      const distanceToCamera = Math.sqrt(
        Math.pow(chunkX - camera.x, 2) + 
        Math.pow(chunkZ - camera.z, 2)
      );
      if (distanceToCamera < maxRenderDistance) {
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
        chunks.push(<group>{cubes}</group>);
      }
    }
  }

  return (
    <>
      {chunks}
    </>
  );
};
