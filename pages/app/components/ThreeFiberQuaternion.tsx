import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, MeshProps } from '@react-three/fiber'
import { Euler, Quaternion, Vector3 } from 'three'

function Box(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    useFrame((_, delta) => (ref.current.rotation.z += delta))
    return (
        <mesh
            {...props}
            ref={ref}
            scale={hovered ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshNormalMaterial attach='material' />
        </mesh>
    )
}

interface ThreeFiberQuaternionProps {
    qw: number;
    qx: number;
    qy: number;
    qz: number;
    rotation?: boolean;
}

export const ThreeFiberQuaternion = (props: ThreeFiberQuaternionProps) => {
    const quaternion = props.rotation ? undefined : new Quaternion(props.qx, props.qy, props.qz, props.qw);
    const position = new Vector3(-5.0, 0.0, 2); // 横から見る良いアングル
    //const position = new Vector3(-5.0, 0.0, 0);
    //const rotation = new Euler(Math.PI/6.0, 0.0, 0.0);
    return (
        <div className='canvas-container'>
            <Canvas camera={{ position, rotation: [Math.PI / 2, -Math.PI / 2, 0] }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[0.0, 1.5, 0.0]} quaternion={quaternion} />
                <Box position={[0.0, 0.0, 0.0]} quaternion={quaternion} />
                <Box position={[1.5, 0.0, 0.0]} quaternion={quaternion} />
            </Canvas>
        </div>
    )
}
