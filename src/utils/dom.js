const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

// 例：-moz-transition 替换为 -Moz-TRANSITION
const camelCase = function (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        /**
         * _：匹配文本
         * separator:第一个匹配组
         * letter:第二个匹配组
         * offset:匹配文本下标index
         */
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

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

/* istanbul ignore next */
export const getStyle = function (element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        var computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
        return element.style[styleName];
    }
};