import {NearestFilter, TextureLoader, RepeatWrapping} from 'three'
import { dirtImg, grassImg, glassImg, woodImg, logImg, stoneIMG, sandIMG, cobblestoneIMG} from './images'

const dirtTexture = new TextureLoader().load(dirtImg);
const grassTexture = new TextureLoader().load(grassImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);
const logTexture = new TextureLoader().load(logImg);
const groundTexture = new TextureLoader().load(grassImg);
const stoneTexture = new TextureLoader().load(stoneIMG);
const sandTexture = new TextureLoader().load(sandIMG);
const cobblestoneTexture = new TextureLoader().load(cobblestoneIMG);

dirtTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
stoneTexture.magFilter = NearestFilter;
sandTexture.magFilter = NearestFilter;
cobblestoneTexture.magFilter = NearestFilter;
groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

export {
    dirtTexture,
    grassTexture,
    glassTexture,
    woodTexture,
    logTexture,
    groundTexture,
    stoneTexture,
    sandTexture,
    cobblestoneTexture,
}