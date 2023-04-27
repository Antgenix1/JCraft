import { noise } from "../utils/noise";
import { Block } from "./Block";
import memoize from 'memoize-one';
import React, { useMemo, useCallback, useState } from 'react';

const memoizedNoise = memoize(noise)

export const Ground = ({ camera }) => {

  const groundSize = 24;
  const cubeSize = 1;

  const chunkSize = 8;
  const numChunks = groundSize / chunkSize;

  const maxRenderDistance = 16;

  const [chunkCache, setChunkCache] = useState({});

  const MemoizedBlock = React.memo(({x, y, z}) => (
    <Block
      key={`${x}-${y}-${z}`}
      position={[
        Math.floor(x) + cubeSize / 2,
        Math.floor(y) + cubeSize / 2,
        Math.floor(z) + cubeSize / 2,
      ]}
      size={[cubeSize, cubeSize, cubeSize]}
    />
  ));

  const generateCubes = useCallback((chunkX, chunkZ) => {
    const cacheKey = `${chunkX},${chunkZ}`;
    if (chunkCache[cacheKey]) {
      return chunkCache[cacheKey];
    }
    const cubes = [];
    for (let x = chunkX; x < chunkX + chunkSize; x += cubeSize) {
      for (let z = chunkZ; z < chunkZ + chunkSize; z += cubeSize) {
        const y = memoizedNoise(x / 20, z / 20);
        cubes.push(
          <MemoizedBlock x={x} y={y} z={z} />
        );
      }
    }
    const result = <group key={cacheKey}>{cubes}</group>;
    setChunkCache({ ...chunkCache, [cacheKey]: result });
    return result;
  }, [chunkSize, cubeSize, chunkCache]);

  const chunks = useMemo(() => {
    const chunks = [];
    for (let cx = 0; cx < numChunks; cx++) {
      for (let cz = 0; cz < numChunks; cz++) {
        const chunkX = cx * chunkSize - groundSize / 2;
        const chunkZ = cz * chunkSize - groundSize / 2;
        const distanceToCamera = Math.sqrt(
          Math.pow(chunkX - camera.position.x, 2) +
          Math.pow(chunkZ - camera.position.z, 2)
        );
        if (distanceToCamera < maxRenderDistance) {
          const cacheKey = `${chunkX},${chunkZ}`;
          const cachedChunk = chunkCache[cacheKey];
          const chunk = cachedChunk || generateCubes(chunkX, chunkZ);
          chunks.push(chunk);
        }
      }
    }
    return chunks;
  }, [camera.position.x, camera.position.z, groundSize, chunkSize, numChunks, maxRenderDistance, chunkCache, generateCubes]);

  return (
    <>
      {chunks}
    </>
  );
};

