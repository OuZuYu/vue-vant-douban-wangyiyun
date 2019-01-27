import Vue from 'vue';
import { Cell, Row, Col, Notify, Tag, Lazyload, List, Rate, Tab, Tabs, button  } from 'vant';
import errImg from './assets/img-error.jpg';
import loadingImg from './assets/img-loading.gif';

[
    Cell,
    Row,
    Col,
    Notify,
    Tag,
    List,
    Rate,
    Tab,
    Tabs,
    button
].forEach(component => {
    Vue.use(component);
});

Vue.use(Lazyload, {
    preLoad: 1.3,
    error: errImg,
    loading: loadingImg
})