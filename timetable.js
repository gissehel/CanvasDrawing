let { Drawing, Vector, CanvasVector, animate, drawTimeTable } = CanvasDrawing;
// let [width, height] = [1920,1080];
let [width, height] = [window.innerWidth, window.innerHeight];
let minDim = Math.min(width, height);
let drawing = new Drawing({ canvas: document.getElementById('item'), height, width, origin: [width / 2, height / 2], mapx: minDim / 2, mapy: -minDim / 2, bgcolor: '#e0e0cc' });

const drawFrame = (k) => {
    let [width, height] = [window.innerWidth, window.innerHeight];
    let minDim = Math.min(width, height);
    drawing.reinit({ height, width, origin: [width / 2, height / 2], mapx: minDim / 2, mapy: -minDim / 2 })

    let [n, m] = [3 * (k - 1) - 13, k];
    drawTimeTable(drawing, n, m, { color: '#331108' });

    let text = `x${m} [${n}]`;
    window.x = new CanvasVector([0, 0]);
    window.drawing = drawing;
    drawing.addText({ text, fontFamily: 'sans-serif', fontSize: '14px', color: '#112244', point: new CanvasVector([0, 0]), position: '3' });
    drawing.addText({ text, fontFamily: 'sans-serif', fontSize: '14px', color: '#442211', point: [1, -1], position: '7' });
}

let animationParams = {
    action: ({ value }) => {
        drawFrame(value);
    },
    frameTime: 0.01,
};

let p = Promise.resolve();

const doLoop = () => {
    let p = Promise.resolve();
    p = p.then(() => animate({ ...animationParams, from: 250, to: 50 }));
    p = p.then(() => animate({ ...animationParams, from: 50, to: 250 }));
    p.then(() => doLoop());
}

doLoop();
