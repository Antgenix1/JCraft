import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Player } from './components/Player';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';

function App() {
  

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100,100,20]}/>
        <ambientLight intensity={0.5}/>
        <FPV />
        <Physics>
          <Player />
          <Cubes />
        </Physics>
      </Canvas>
      <div className='absolute centered cursor'>+</div>
      <TextureSelector />
    </>
  );
}

export default App;
