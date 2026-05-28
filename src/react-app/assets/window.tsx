import { useRef, useEffect } from 'react';
import "./window.css"

function Window() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Set an initial position so getComputedStyle never returns "auto"
        element.style.left = `${element.offsetLeft}px`;
        element.style.top = `${element.offsetTop}px`;

        const onMouseDrag = (event: MouseEvent) => {
            const left = parseInt(element.style.left, 10);
            const top = parseInt(element.style.top, 10);
            element.style.left = `${left + event.movementX}px`;
            element.style.top = `${top + event.movementY}px`;
        };

        const onMouseDown = () => {
            document.addEventListener("mousemove", onMouseDrag);
            document.addEventListener(
                "mouseup",
                () => document.removeEventListener("mousemove", onMouseDrag),
                { once: true }
            );
        };

        element.addEventListener("mousedown", onMouseDown);
        return () => element.removeEventListener("mousedown", onMouseDown); // cleanup
    }, []);
    return <div ref={ref} className="WindowBox" />;
}

export default Window;