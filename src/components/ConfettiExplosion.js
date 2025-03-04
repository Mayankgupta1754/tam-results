"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export function ConfettiExplosion() {
    const ref = useRef();
    const numPoints = 300;
    const positions = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 5;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    useFrame(() => {
        ref.current.rotation.y += 0.005;
        ref.current.rotation.x += 0.005;
    });

    return (
        <Points ref={ref} positions={positions} frustumCulled>
            <PointMaterial
                size={0.07}
                color={"#FFD700"}
                transparent
                depthWrite={false}
            />
        </Points>
    );
}
