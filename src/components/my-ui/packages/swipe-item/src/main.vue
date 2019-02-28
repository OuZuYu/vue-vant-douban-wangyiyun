<template>
    <li
        class="my-swipe-item"
        :class="{'is-animating': animating}">
        <slot></slot>
    </li>
</template>

<script>
import findParentMixin from '../../../src/mixins/findParent';

export default {
    name: 'MySwipeItem',

    mixins: [ findParentMixin ],

    computed: {
        parent () {
            return this.findParent('MySwipe');
        }
    },

    data () {
        return {
            animating: false
        }
    },

    methods: {

    },

    created () {
        this.parent.updateItems();
    },

    destroyed() {
        this.parent.updateItems();
    }
}
</script>

<style lang="scss" scoped>
.my-swipe-item {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    visibility: hidden;

    &.is-animating {
        transition: transform .4s ease-in-out;
    }
}
</style>
