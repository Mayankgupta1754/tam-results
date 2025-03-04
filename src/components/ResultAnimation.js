"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ResultAnimation({ status }) {
    const animationRef = useRef(null);

    useEffect(() => {
        if (status === "selected") {
            gsap.fromTo(
                animationRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
            );
        } else if (status === "not_selected") {
            gsap.fromTo(
                animationRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
            );
        }
    }, [status]);

    return (
        <div ref={animationRef} className="p-6 text-center">
            {status === "selected" ? (
                <h2 className="text-green-500 text-3xl font-bold">
                    🎉 Congratulations! You have been selected! 🎉
                </h2>
            ) : (
                <h2 className="text-red-500 text-3xl font-bold">
                    ❌ Sorry, better luck next time!
                </h2>
            )}
        </div>
    );
}
