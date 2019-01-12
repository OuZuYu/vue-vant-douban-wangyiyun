import Vue from 'vue';
import { Button, Cell, Row, Col, Notify, Tag, Field, Lazyload, List, Swipe, SwipeItem, Rate  } from 'vant';

[
    Button,
    Cell,
    Row,
    Col,
    Notify,
    Tag,
    Field,
    Lazyload,
    List,
    Swipe,
    SwipeItem,
    Rate
].forEach(component => {
    Vue.use(component);
});