(function(){
let window = this;

const { Vector } = window.CanvasDrawing;

const getRange = (n) => [...Array(n).keys()];

const getPoints = (range) => range.map(i => new Vector(0.98, 2 * Math.PI * i / range.length, true));

const getIndex = (points, index) => points[(((Math.floor(index)) % points.length) + points.length) % points.length]

const drawTimeTable = (drawing, n, k, m, params) => {
    let {
        clear
    } = params || {};
    if (m === undefined) {
        m = 1;
    }
    let range = getRange(n);
    let points = getPoints(range);

    if (clear === undefined || clear) {
        drawing.clear();
    }
    getRange(m)
        .map((z) => points
            .map((point, i) => drawing.line({
                point0: point,
                point1: getIndex(points, k * (i + z * points.length)),
                color: '#331118'
            }))
        );
}

window.CanvasDrawing = { ...(window.CanvasDrawing || {}), getRange, getIndex, drawTimeTable };

})(this);