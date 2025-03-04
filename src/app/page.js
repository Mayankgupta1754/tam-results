"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { ConfettiExplosion } from "@/components/ConfettiExplosion";

export default function Home() {
    const [regNumber, setRegNumber] = useState("");
    const [result, setResult] = useState(null);
    const animationRef = useRef(null);

    const checkResult = async () => {
        if (!regNumber) return alert("Please enter your registration number");

        try {
            const response = await fetch(`/api/checkResult?regNumber=${regNumber}`);
            const data = await response.json();
            setResult(data);

            if (data.status === "selected") {
                gsap.fromTo(
                    animationRef.current,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
                );
            } else {
                gsap.fromTo(
                    animationRef.current,
                    { y: -50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
                );
            }
        } catch (error) {
            console.error("Error fetching result:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white p-6 relative">
            {/* TAM Tech Team Header */}
            <h1 className="text-5xl font-extrabold mb-8 text-blue-400 drop-shadow-lg">
                TAM Tech Team
            </h1>

            {/* Selection Status Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 animate-fade-in">
                Check Your Selection Status
            </h2>

            {/* Input & Button Container */}
            <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md w-full max-w-md border border-white/20">
                <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="Enter Registration Number"
                    className="w-full p-3 rounded-md bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 transition-all duration-300"
                />
                <button
                    onClick={checkResult}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
                >
                    Check Result
                </button>
            </div>

            {/* Result Display */}
            {result && (
                <div
                    ref={animationRef}
                    className="mt-6 p-6 rounded-lg text-center backdrop-blur-md shadow-xl w-full max-w-md bg-white/10 animate-slide-up border border-white/20"
                >
                    {result.status === "selected" ? (
                        <>
                            <h2 className="text-green-400 font-bold text-2xl">{result.message}</h2>
                            <p className="mt-4">
                                🎉 Join WhatsApp:{" "}
                                <a href={result.links.whatsapp} className="text-blue-300 hover:underline" target="_blank">Click here</a>
                            </p>
                            <p className="mt-2">
                                🏆 Join Discord:{" "}
                                <a href={result.links.discord} className="text-blue-300 hover:underline" target="_blank">Click here</a>
                            </p>
                            {/* Confetti Animation */}
                            <Canvas className="absolute top-0 left-0 w-full h-full">
                                <ConfettiExplosion />
                            </Canvas>
                        </>
                    ) : (
                        <h2 className="text-red-400 font-bold text-2xl">{result.message}</h2>
                    )}
                </div>
            )}
        </div>
    );
}
