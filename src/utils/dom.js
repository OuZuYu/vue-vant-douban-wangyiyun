export let cssUtils = {
    setStyle(el, prop, val) {
        el.style[prop] = val;
    },

    setCss(el, styles) {
        for (let key of Object.keys(styles)) {
            this.setStyle(el, key, styles[key]);
        }
    }
}

// 获取dom到文档顶部或左边的距离
export function getDistance(element, type) {
    let direction = type === 'top' ? 'offsetTop' : type === 'left' ? 'offsetLeft' : '';
    let distance = element[direction];
    let current = element.offsetParent;
    while (current !== null) {
        distance += current[direction];
        current = current.offsetParent;
    }
    return distance;
}

export function delLoading () {
    let loadingDoms = document.querySelectorAll('.loading-wrap');
    if (loadingDoms) {
        for (let loadingDom of loadingDoms) {
            document.body.removeChild(loadingDom);
        }
    }
}