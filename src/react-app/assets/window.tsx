import { useRef, useEffect, useState } from 'react';
import { X, Minus, Maximize } from 'lucide-react';
import "./window.css"

function Window({children, width, height, x = 0, y = 0}) {
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

    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div ref={ref} className="WindowBox" style={{ width, height, left: x, top: y }}>
            <div className="Toolbar-Bar" />
            <div className="Toolbar">
                <div ref={ref} className="Toolbar-WindowResize"><Minus /></div>
                <div ref={ref} className="Toolbar-WindowResize"><Maximize /></div>
                <div ref={ref} className="Toolbar-WindowClose" onClick={() => setVisible(false)}><X /></div>
            </div>
            <div className="WindowContent" > {children}</div>
        </div>
    );
}

export default Window;