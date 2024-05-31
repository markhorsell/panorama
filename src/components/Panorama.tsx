
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';
import { BoxGeometry, CanvasTexture, DataTexture, DoubleSide, ImageBitmapLoader, Mesh, MeshBasicMaterial, PerspectiveCamera, RGBAFormat, Scene, TextureLoader, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

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

function Foo() {
    const state = useThree()
    console.log(state)
    useFrame((state, delta, xrFrame) => {
        // This function runs at the native refresh rate inside of a shared render-loop

        //console.log(state.pointer)
        //console.log(delta)
        //console.log(xrFrame)
    })

}

function Panorama() {
   // let texture;// = useLoader(TextureLoader, PanoramaImage);

   //const [texture, setTexture]= useState(useLoader(TextureLoader, PanoramaImage))
   const canvasRef = useRef(null)
   const canvas: HTMLCanvasElement = canvasRef?.current!;
   const [texture, setTexture]= useState(new CanvasTexture(canvas))

    let material = new MeshBasicMaterial();
   

    console.log(texture)

 
  
    useEffect(() => {
       
       
        if (canvas) {
            let image = new Image()
            image.src = PanoramaImage;
            image.onload = () => {
                console.log("loaded")
                const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
                ctx.fillStyle = "#bbbbbbff";
                //must be 300 x 150 to avoid gaps. Todo find out why. Prob a default somewhere.
                ctx.drawImage(image, 0, 0, 300, 150);
                ctx.filter = "blur(4px)";
                ctx.fillRect(30,45, 30, 30);
                ctx.filter = "none"; 

                setTexture(new CanvasTexture(canvas))

            }
        }

    }, [])


    return (
        <div style={{ border: "1px solid red", height: "400px", width:"800px" }}>

            <Canvas   >
                <Foo />
                <CameraController />


                <ambientLight intensity={1} />


                <mesh position={[0, 0, 0]} >


                    <sphereGeometry args={[10, 16, 16]} />

                    <meshStandardMaterial side={DoubleSide} map={texture}/>
 


                </mesh>

            </Canvas>
            {texture.colorSpace}
            <canvas style={{ border: "1px solid red", height: "400px", width:"800px" }} ref={canvasRef} />
        </div>)
}

export default Panorama