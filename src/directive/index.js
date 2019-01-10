import Vue from 'vue';

import loading from './loading';

const directive = [
    { name: 'loading', content: loading }
];

directive.forEach(directive => {
    Vue.directive(directive.name, directive.content);
});