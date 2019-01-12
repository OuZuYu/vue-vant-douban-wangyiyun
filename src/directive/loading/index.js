import { getDistance, cssUtils } from '@/utils/dom';
import loadingGif from './loading.gif';

const LOADING_WRAP_ID = 'loadingWrap';
const LOADING_ID = 'loadingGif'
let loadingCount = 1;

function createLoading(left, top, width, height,) {
    let mask = document.createElement('div');
    let loading = document.createElement('img');

    mask.id = LOADING_WRAP_ID + loadingCount;
    loadingCount++;
    cssUtils.setCss(mask, {
        'zIndex': '10000',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'position': 'fixed',
        'left': left + 'px',
        'top': top + 'px',
        'width': width + 'px',
        'height': height + 'px',
        'background': 'rgba(0, 0, 0, .2)',
        'text-align': 'center'
    });

    loading.id = LOADING_ID;
    loading.src = loadingGif;
    cssUtils.setCss(loading, {
        width: '40%',
        height: '40%',
        'min-height': '30px'
    });

    mask.appendChild(loading);
    return mask;
}

function toggleLoading (el, binding) {
    setTimeout(() => {
        if (binding.value) { // 开启
            let top = getDistance(el, 'top');
            let left = getDistance(el, 'left');
            let width = el.clientWidth;
            let height = el.clientHeight;
            let loadingDom = createLoading(left, top, width, height);
            document.body.appendChild(loadingDom);
        } else { // 关闭
            for (let i = 0; i < loadingCount; i++) {
                let loadingDom = document.getElementById(LOADING_WRAP_ID + i);
                if (loadingDom) document.body.removeChild(loadingDom);
            }
            loadingCount = 1;
        }
    }, 0);
}

export default {
    bind(el, binding) {
        toggleLoading(el, binding);
    },

    update (el, binding) {
        toggleLoading(el, binding);
    }
}
