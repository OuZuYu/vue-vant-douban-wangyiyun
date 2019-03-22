import Vue from 'vue';
import { Cell, Row, Col, Notify, Tag, Lazyload, List, Rate, Tab, Tabs, button, Field, Icon, Toast, Dialog } from 'vant';
import errImg from './assets/img-error.png';
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
    button,
    Field,
    Icon,
    Toast,
    Dialog
].forEach(component => {
    Vue.use(component);
});

Vue.use(Lazyload, {
    preLoad: 1.3,
    error: errImg,
    loading: loadingImg
})