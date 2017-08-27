const mirrorObject = (o) => Object.keys(o).forEach((key) => o[o[key]] = key);

const Gestures = {
    Up: 1,
    Down: 2,
    Left: 3,
    Right: 4,
    A: 5,
    B: 6,
    None: null
};
mirrorObject(Gestures);

const konamiCodeEvent = new CustomEvent('konamiCode');

const konamiCode = [
    Gestures.Up, Gestures.Up, Gestures.Down, Gestures.Down,
    Gestures.Left, Gestures.Right, Gestures.Left, Gestures.Right,
    Gestures.B, Gestures.A
];

const queue = [
    Gestures.None, Gestures.None, Gestures.None, Gestures.None,
    Gestures.None, Gestures.None, Gestures.None, Gestures.None,
    Gestures.None, Gestures.None
];

const queueEqualsKonamiCode = () => {
    let result = true;
    for (let i = 0; i < konamiCode.length; i++) {
        if (konamiCode[i] !== queue[i]) {
            result = false;
            break;
        }
    }
    return result;
};

const addToQueue = (gesture) => {
    queue.shift();
    queue.push(gesture);

    const gestureEvent = new CustomEvent('konamiCodeGesture', {
        detail: {
            code: gesture,
            name: Gestures[gesture]
        }
    });
    document.dispatchEvent(gestureEvent);
    
    if (queueEqualsKonamiCode()) {
        document.dispatchEvent(konamiCodeEvent);
    }
};

export {
    Gestures,
    addToQueue
};