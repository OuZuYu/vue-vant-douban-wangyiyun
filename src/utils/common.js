/*
   @param dom 要滚动的元素
   @param fromY 开始位置
   @param toY   结束位置
   @param duration 滚动速度
*/
export function scrollTo (dom, fromY, toY, duration = 500) {
    let from = fromY,
        to = toY,
        s = Math.abs(from - to), // 滚动路程
        v = Math.ceil(s / duration * 50); // 速度

    //  requestAnimationFrame性能更好更加顺滑
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { return window.setTimeout(callback, 1000 / 60); });
    }

    function scroll (start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        dom.scrollTo(d, d);

        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, v);
}