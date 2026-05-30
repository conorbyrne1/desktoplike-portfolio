import { useRef, useEffect, useState } from 'react';
import { X, Minus, Maximize } from 'lucide-react';
import {getNextZIndex} from "./windowZIndex.tsx";
import "./window.css"


function Window({children, width, height, x = 0, y = 0}) {
    const ref = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);

    const [zIndex, setZindex] = useState(1);

    useEffect(() => {
        const element = ref.current;
        const toolbar = toolbarRef.current;
        if (!element || !toolbar) return;

        // Set an initial position so getComputedStyle never returns "auto"
        element.style.left = `${element.offsetLeft}px`;
        element.style.top = `${element.offsetTop}px`;

        const onMouseDrag = (event: MouseEvent) => {
            const left = parseInt(element.style.left, 10);
            const top = parseInt(element.style.top, 10);
            element.style.left = `${left + event.movementX}px`;
            element.style.top = `${top + event.movementY}px`;
        };

        // const onMouseDown = () => {
        //     setZindex(getNextZIndex());
        //     document.addEventListener("mousemove", onMouseDrag);
        //     document.addEventListener(
        //         "mouseup",
        //         () => document.removeEventListener("mousemove", onMouseDrag),
        //         { once: true }
        //     );
        // };

        const onWindowMouseDown = () => {
            setZindex(getNextZIndex());
        };

        const onToolbarMouseDown = () => {
            document.addEventListener('mousemove', onMouseDrag);
            document.addEventListener(
                'mouseup',
                () => document.removeEventListener('mousemove', onMouseDrag),
                { once: true}
                );
        };

        element.addEventListener("mousedown", onWindowMouseDown);
        toolbar.addEventListener("mousedown", onToolbarMouseDown);

        return () => {
            element.removeEventListener("mousedown", onWindowMouseDown);
            toolbar.removeEventListener("mousedown", onToolbarMouseDown);
        };

        // element.addEventListener("mousedown", onMouseDown);
        // return () => element.removeEventListener("mousedown", onMouseDown); // cleanup
    }, []);

    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div ref={ref} className="WindowBox" style={{ width, height, left: x, top: y, zIndex }}>
            <div ref={toolbarRef} className="Toolbar-Bar" />
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