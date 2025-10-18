import * as THREE from "three";
import React from "react";

declare module "@react-three/fiber" {
  export const Canvas: React.FC<{
    children: React.ReactNode;
    shadows?: boolean;
    dpr?: [number, number];
    style?: React.CSSProperties;
    [key: string]: any;
  }>;

  export function useFrame(callback: (state: any) => void): void;

  export interface ThreeElements {
    group: any;
    mesh: any;
    boxGeometry: any;
    meshStandardMaterial: any;
    ambientLight: any;
    directionalLight: any;
    spotLight: any;
    [key: string]: any;
  }
}

declare module "@react-three/drei" {
  export const OrbitControls: React.FC<{
    enableZoom?: boolean;
    enablePan?: boolean;
    minPolarAngle?: number;
    maxPolarAngle?: number;
    rotateSpeed?: number;
    [key: string]: any;
  }>;

  export const PerspectiveCamera: React.FC<{
    makeDefault?: boolean;
    position?: [number, number, number];
    fov?: number;
    [key: string]: any;
  }>;

  export const useGLTF: (path: string) => any;

  export const Environment: React.FC<{
    preset?: string;
    [key: string]: any;
  }>;
}

declare namespace JSX {
  interface IntrinsicElements {
    group: React.DetailedHTMLProps<any, any> & {
      ref?: React.RefObject<THREE.Group>;
      position?: [number, number, number];
      rotation?: [number, number, number];
      scale?: [number, number, number] | number;
    };
    mesh: React.DetailedHTMLProps<any, any> & {
      position?: [number, number, number];
      receiveShadow?: boolean;
      castShadow?: boolean;
    };
    boxGeometry: React.DetailedHTMLProps<any, any> & {
      args?: [number, number, number];
    };
    meshStandardMaterial: React.DetailedHTMLProps<any, any> & {
      color?: string;
    };
    ambientLight: React.DetailedHTMLProps<any, any> & {
      intensity?: number;
    };
    directionalLight: React.DetailedHTMLProps<any, any> & {
      position?: [number, number, number];
      intensity?: number;
      castShadow?: boolean;
      "shadow-mapSize-width"?: number;
      "shadow-mapSize-height"?: number;
    };
    spotLight: React.DetailedHTMLProps<any, any> & {
      position?: [number, number, number];
      intensity?: number;
      angle?: number;
      penumbra?: number;
    };
    [key: string]: any;
  }
}
