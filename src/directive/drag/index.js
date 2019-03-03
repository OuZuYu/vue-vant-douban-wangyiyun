function drag (el, binding) {
    el.ontouchstart = function (ev) {
        let touches = ev.touches[0];
        let documentW = document.body.clientWidth;
        let documenth = document.body.clientHeight;
        let maxLeft = documentW - el.clientWidth;
        let maxTop = documenth - el.clientHeight;
        let disX = touches.clientX - el.offsetLeft;
        let disY = touches.clientY - el.offsetTop;

        document.ontouchmove = function (ev) {
            let touches = ev.touches[0];
            let l = touches.clientX - disX;
            let t = touches.clientY - disY;
            el.style.left = l < 0 ? 0 : l > maxLeft ? maxLeft + 'px' : l + 'px';
            el.style.top = t < 0 ? 0 : t > maxTop ? maxTop + 'px' : t + 'px';
        };
        document.ontouchend = function () {
            document.ontouchmove = null;
            document.ontouchend = null;
        };
    };
}

export default {
    bind (el, binding) {
        drag(el, binding);
    }
}