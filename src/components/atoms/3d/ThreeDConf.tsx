import {
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  SoftShadows,
  SpotLight,
} from "@react-three/drei/core";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { easing } from "maath";
import { memo, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { RoomModel } from "./RoomModel";
import ThreeDCursor from "./ThreeDCursor";
import { ThreeDLoader } from "./ThreeDLoader";

/* eslint-disable */

interface ThreeDConfProps {
  readonly className?: string;
}

const ThreeDConf = ({ className = "" }: ThreeDConfProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ThreeDCursor className={className} isDragging={isDragging}>
      <div
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
          setIsDragging(false);
        }}
      >
        <ThreeDLoader isLoading={isLoading} />
        <Canvas
          shadows
          dpr={[1, 1.5]}
          // style={{ background: "#1f1f1f" }}
          onCreated={() => setIsLoading(false)}
        >
          <PerspectiveCamera makeDefault position={[350, 80, 350]} fov={40} />
          <EffectComposer>
            {/* <DepthOfField
              focusDistance={0.01}
              focalLength={0.4}
              bokehScale={4}
            /> */}
            <ambientLight intensity={0.06} />
            <directionalLight
              position={[300, 220, 200]}
              intensity={0.054}
              debug
            />
            <directionalLight
              position={[-300, 220, 0]}
              intensity={0.01}
              debug
            />
            <RandomizedLight
              bias={0.0001}
              intensity={0.01}
              near={1}
              far={5000}
              ambient={1000}
              amount={10}
              frames={1000}
              position={[50, 120, -200]}
            />
            <SoftShadows focus={1.5} samples={4} size={10} />

            <MovingSpot
              isHover={isHover}
              volumetric
              position={[120, 180, -300]}
              intensity={4_000_000}
              castShadow
              angle={0.25}
              distance={600}
              color={"#d15e06"}
              attenuation={0.7}
              penumbra={1}
            />

            <MovingSpot
              volumetric
              position={[10, 480, -130]}
              intensity={700_000}
              castShadow
              angle={0.3}
              distance={820}
              color={"#a30505"}
              attenuation={0.7}
              penumbra={1}
            />

            <MovingSpot
              volumetric
              position={[200, 800, 200]}
              intensity={350_000}
              castShadow
              angle={0.4}
              opacity={1}
              distance={4000}
              color={"#f8f8f8"}
              attenuation={0.1}
              penumbra={0.4}
            />

            <SpotLight
              position={[-80, 90, -25]}
              intensity={60_000}
              angle={0.6}
              opacity={1}
              distance={140}
              color={"#f8f8f8"}
              attenuation={0.1}
              penumbra={0.4}
            />

            <Light />
          </EffectComposer>

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            panSpeed={5}
            zoomSpeed={1.055}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.5}
            rotateSpeed={isDragging ? 0.4 : 0.2}
            autoRotateSpeed={0.3}
            dampingFactor={0.055}
            enableDamping={true}
            enabled={true}
            autoRotate
          />

          <RoomModel />
        </Canvas>
      </div>
    </ThreeDCursor>
  );
};

const MovingSpot = ({ vec = new Vector3(), ...props }) => {
  const light = useRef<any>(null);
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current?.target?.position.lerp(
      props.isHover
        ? vec.set(
            (state.mouse.x * viewport.width) / 2,
            (state.mouse.y * viewport.height) / 2,
            0
          )
        : vec.set(0, 0, 0),
      0.1
    );
    light?.current?.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={6}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
      {...props}
    />
  );
};

function Light() {
  const ref = useRef<any>(null);
  useFrame((state: any, delta: any) => {
    easing.dampE(
      ref?.current?.rotation,
      [(state.pointer.x * Math.PI) / 20, (state.pointer.y * Math.PI) / 50, 0],
      0.2,
      delta
    );
  });
  return (
    <group ref={ref}>
      <directionalLight
        position={[-20, 5, -8]}
        castShadow
        intensity={0.4}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight>
    </group>
  );
}

export default memo(ThreeDConf);
