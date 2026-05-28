// const dragElements = document.querySelectorAll('.draggable');
//
// function onMouseDrag(event, element) {
//     let leftValue = parseInt(window.getComputedStyle(element).left);
//     let topValue = parseInt(window.getComputedStyle(element).top);
//     element.style.left = `${leftValue + event.movementX}px`;
//     element.style.top = `${topValue + event.movementY}px`;
// }
//
// dragElements.forEach((element) => {
//     element.addEventListener("mousedown", (e) => {
//         const onMove = (event) => onMouseDrag(event, element);
//
//         document.addEventListener("mousemove", onMove);
//         document.addEventListener("mouseup", () => {
//             document.removeEventListener("mousemove", onMove);
//         }, {once: true});
//     });
// });

const dragElements: NodeListOf<HTMLElement> = document.querySelectorAll('.draggable');

function onMouseDrag(event: MouseEvent, element: HTMLElement): void {
    const leftValue: number = parseInt(window.getComputedStyle(element).left, 10);
    const topValue: number = parseInt(window.getComputedStyle(element).top, 10);

    element.style.left = `${leftValue + event.movementX}px`;
    element.style.top = `${topValue + event.movementY}px`;
}

dragElements.forEach((element: HTMLElement) => {
    element.addEventListener('mousedown', (e: MouseEvent) => {
        const onMove: (event: MouseEvent) => void = (event: MouseEvent) => onMouseDrag(event, element);

        document.addEventListener('mousemove', onMove);
        document.addEventListener(
            'mouseup',
            () => {
                document.removeEventListener('mousemove', onMove);
            },
            { once: true }
        );
    });
});