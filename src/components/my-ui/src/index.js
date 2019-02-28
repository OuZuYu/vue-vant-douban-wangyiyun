import Vue from 'vue';

import MyTabs from '../packages/tabs/index.js';
import MyTabItem from '../packages/tab-item/index.js';
import MySwipe from '../packages/swipe/index.js';
import MySwipeItem from '../packages/swipe-item/index.js';

const components = [
    MyTabs,
    MyTabItem,
    MySwipe,
    MySwipeItem
];

components.map(component => {
    Vue.component(component.name, component);
});