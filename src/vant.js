import Vue from 'vue';
import { Cell, Row, Col, Notify, Tag, Lazyload, List, Rate, Tab, Tabs  } from 'vant';

[
    Cell,
    Row,
    Col,
    Notify,
    Tag,
    Lazyload,
    List,
    Rate,
    Tab,
    Tabs
].forEach(component => {
    Vue.use(component);
});