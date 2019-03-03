import Vue from 'vue';

import loading from './loading';
import drag from './drag';

const directive = [
    { name: 'loading', content: loading },
    { name: 'drag', content: drag }
];

directive.forEach(directive => {
    Vue.directive(directive.name, directive.content);
});