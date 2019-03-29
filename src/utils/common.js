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

// 节流
export function throttle (fn, wait) {
    let timmer = null;

    return function () {
        if (!timmer) { // 只有当上一个定时器完成，才把执行fn添加到队列。
            timmer = setTimeout(() => {
                fn.apply(this, arguments);
                timmer = null;
            }, wait);
        }
    }
}

// 防抖
export function debounce (fn, wait) {
    let timmer = null;

    return function () {
        if (timmer) clearTimeout(timmer);

        timmer = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    }
}