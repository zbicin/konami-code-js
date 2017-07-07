import { addToQueue, Gestures } from './shared';

const keyGestureMap = {
    ArrowLeft: Gestures.Left,
    ArrowRight: Gestures.Right,
    ArrowUp: Gestures.Up,
    ArrowDown: Gestures.Down,
    a: Gestures.A,
    b: Gestures.B
};

const onKeyUp = (event) => {
    const gesture = keyGestureMap[event.key];
    if(gesture) {
        addToQueue(gesture);
    }
};

document.addEventListener('keyup', onKeyUp);