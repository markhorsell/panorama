
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect } from 'react';
import { DoubleSide, PerspectiveCamera, TextureLoader } from 'three';
import { OrbitControls} from 'three/examples/jsm/Addons.js';

import PanoramaImage from "../assets/panorama.jpg"


const CameraController = () => {

    const { camera, gl } = useThree();


    useEffect(() => {
      
        const controls = new OrbitControls(camera, gl.domElement);
   
        controls.minDistance = 1;
        controls.maxDistance = 9.8;
    
        return () => {
            controls.dispose();
        };
    }, [camera, gl]);
    return null;
};

function Panorama() {

    const texture = useLoader(TextureLoader, PanoramaImage);

    console.log(texture)


    return (
        <div style={{ border: "1px solid red", height: "90dvh" }}>
            <Canvas  >
                <CameraController  />
                
                
                <ambientLight intensity={1} />


                <mesh position={[0, 0, 0]} >
            

                    <sphereGeometry args={[10, 16, 16]} />
               
                    <meshStandardMaterial side={DoubleSide}  map={texture} />
                    <primitive attach="map" object={texture} />

                </mesh>

            </Canvas>
        </div>)
}

export default Panorama