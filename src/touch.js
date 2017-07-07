import { addToQueue, Gestures } from './shared';

let dragging = false;
let endX = null;
let endY = null;
let startX = null;
let startY = null;
const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

const onTouchStart = (event) => {
    dragging = false;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
};

const onTouchMove = (event) => {
    if (!startX || !startY) {
        return;
    }
    dragging = true;
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
};

const onTouchEnd = (event) => {
    if (dragging) {
        const xDiff = startX - endX ;
        const yDiff = startY - endY;
        const isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);

        if (isHorizontal) {
            addToQueue(xDiff > 0 ? Gestures.Left : Gestures.Right);
        } else {
            addToQueue(yDiff > 0 ? Gestures.Up : Gestures.Down);
        }

        dragging = false;
    }
    else {
        const isLeftHalf = startX < (viewportWidth / 2);
        addToQueue(isLeftHalf ? Gestures.A : Gestures.B);
    }

    startX = null;
    startY = null;
};

document.addEventListener('touchstart', onTouchStart, false);
document.addEventListener('touchmove', onTouchMove, false);
document.addEventListener('touchend', onTouchEnd, false);
