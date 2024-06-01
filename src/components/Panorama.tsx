
import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react';
import { CanvasTexture, DoubleSide } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import PanoramaImage from "../assets/panorama.jpg"


//Bug
//If the Page is refreshed the images disapear
//Only by saving twice can the App be restored
//This is likely a caching issue, or a race condition somewhere but i have been unable to find it


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

    const canvasRef = useRef(null)
    const canvas: HTMLCanvasElement = canvasRef?.current!;
    const [texture, setTexture] = useState<any>(new CanvasTexture(canvas));
    const [ctx, setCtx] = useState<any>();


    useEffect(() => {

        let image = new Image()
        if (canvas) {

            image.src = PanoramaImage;
            image.onload = () => {
                setCtx(() => canvas.getContext("2d")!)
                //must be 300 x 150 to avoid gaps. Todo find out why. Prob a default somewhere. Possibly a camera setting,
                ctx.drawImage(image, 0, 0, 300, 150);

                setTexture(new CanvasTexture(canvas))

            }
        }
        return () => {


        };

    }, [])

    function paint(e: React.MouseEvent<HTMLElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.
        ctx.fillStyle = "#ffffff33";
        ctx.filter = "blur(4px)";
        ctx.fillRect(x / 2.9, y / 2.9, 30, 30);
        ctx.filter = "none";
        setTexture(new CanvasTexture(canvas))

    }

    return (
        <div style={{ textAlign: "center", background: "#1e1e1e" }}>
            <h1 style={{ color: "#e1e1e1", userSelect: "none" }}>Equirectangular Panorama Viewer</h1>
            <h3 style={{ color: "#e1e1e1", userSelect: "none" }}>Click here to paint blur on to image</h3>
            <canvas onClick={(e) => paint(e)}
                style={{ height: "400px", width: "800px", borderRadius: "10px" }}
                ref={canvasRef} />
            <h3 style={{ color: "#e1e1e1", marginTop: "20px", userSelect: "none" }}>Drag here to view panorama</h3>

            <Canvas style={{ borderRadius: "10px", height: "400px", width: "800px", left: "calc(100vw / 2 - 400px)" }}  >
                <CameraController />
                <ambientLight intensity={1} />
                <mesh position={[0, 0, 0]} scale={[-1, 1, 1]} >
                    <sphereGeometry args={[10, 16, 16]} />
                    <meshStandardMaterial side={DoubleSide} map={texture} />
                </mesh>
            </Canvas>
        </div>)
}

export default Panorama