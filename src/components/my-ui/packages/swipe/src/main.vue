<template>
    <div ref="wrap"
         class="my-swipe"
         :style="{ height: height + 'px' }"
         @touchstart="handleTouchStart"
         @touchmove="handleTouchmove"
         @touchend="handleTouchEnd"
         @transitionend="handleTransitionEnd">
        <ul class="my-swipe-list" :style="{width: listWidth}">
            <slot></slot>
        </ul>

        <div class="indicators">
            <span v-for="(item, index) in swipeItems.length" class="indicator-item" :class="{'active': index === activeIndex}"></span>
        </div>
    </div>
</template>

<script>
const MOVE_DISTANCE = 10;
const TRANSITION_DURATION = 400;

export default {
    name: 'MySwipe',

    props: {
        height: {
            type: String,
            default: '100'
        },

        during: {
            type: Number,
            default: 3000
        }
    },

    computed: {
        activeIndex () {
            return this.queue[0];
        }
    },

    data () {
        return {
            swipeItems: [],
            wrapWidth: 0,
            listWidth: 0,
            css: [],
            queue: [],
            virtual: [],
            playMethod: null,
            timmer: null,
            startX: 0,
            startY: 0,
            lockMove: false,
            lockGo: false
        }
    },

    methods: {
        init () {
            this.setQueue();
            this.setVirtual();
            this.setStyle();
            // 两个轮播图和多个逻辑不同
            if (this.queue.length === 2) {
                this.setTwoSwipeItemStyle()
                this.playMethod = this.playTwoItem;
            } else {
                this.play();
                this.playMethod = this.play;
            }

            this.startPlay();
        },

        updateItems() {
            this.swipeItems = this.$children.filter(child => child.$options.name === 'MySwipeItem');
        },

        handleTransitionEnd () {
            this.lockGo = false;
        },

        handleTouchEnd () {
            this.startPlay();
        },

        handleTouchStart (e) {
            let touch = e.touches[0];
            this.stopPlay();
            this.startX = touch.clientX;
            this.startY = touch.clientY;
            this.lockMove = false;
        },

        handleTouchmove (e) {
            if (this.lockMove) return;
            let touch = e.touches[0];
            let offsetX = this.startX - touch.clientX;
            let offsetY = this.startY - touch.clientY;

            if (offsetX > 0 && offsetX > MOVE_DISTANCE) {
                this.lockMove = true;
                this.go('left');
            } else if (offsetX < 0 && -offsetX > MOVE_DISTANCE) {
                this.lockMove = true;
                this.go('right');
            }
        },

        startPlay () {
            if (this.queue.length <= 1) return;

            this.timmer = setInterval(() => {
                this.go('left');
            }, this.during);
        },

        stopPlay () {
            clearInterval(this.timmer);
        },

        // 设置子宽高与父宽（父一次容纳五个子）
        setStyle () {
            this.wrapWidth = this.$refs.wrap.offsetWidth;

            // 父容器宽度（父最多容纳五个）
            this.listWidth = 5 * this.wrapWidth + 'px';

            // 设置css，分配给子组件的样式。
            let doubleWrapWidth = 2 * this.wrapWidth;
            let cssVal = this.queue.length === 2 ? [0, -this.wrapWidth] : [0, -this.wrapWidth, this.wrapWidth, -doubleWrapWidth, doubleWrapWidth]
            for(let i of cssVal) {
                this.css.push(this.setCss(i));
            }
        },

        setCss (x) {
            return `
                transform: translateX(${x}px);
                visibility: visible;
                width: ${this.wrapWidth}px;
                height: ${this.height}px
            `;
        },

        // 设置队列，相当于子的索引，链表工作时，调换这个。
        setQueue () {
            this.queue = this.swipeItems.map((val, i) => i);
        },

        setVirtual () {
            this.virtual = new Array(this.queue.length);
        },

        play (direction) {
            /**
             * 子组件需要按 n-1 n 1 2 3 的顺序渲染，其余隐藏（如6个就是  5 6 1 2 3  第四个隐藏）所以采用循环取头尾的方式，可以取到相符的数据。
             * queue是索引组成的数组，用来循环链表操作，不直接操作dom，而是操作这个数组。
             * this.css是准备给子组件分配的样式。
             * virtual的顺序对应子组件的顺序，根据queue，分配css到virtual则相当于间接分配css到组件。
             * 再把virtual中css样式按顺序对应赋到真正的子组件。
             */
            let queue = [].concat(this.queue), // 拷贝一份一维数组
                length = this.queue.length,
                cssIdx = 0,
                virtual = new Array(length),
                flag = 1;

            // 按循环两头的顺序分配css
            while (cssIdx < 5 && queue.length > 0) {
                virtual[flag ? queue.shift() : queue.pop()] = this.css[cssIdx++];
                flag = !flag;
            }

            // 当前translate在0px的子组件和下一个(向左時)或下一個(向右時) 开启动画，其余关闭动画。
            let animateIdx = this.virtual.findIndex(val => val === this.css[0]);
            let animateIdxArr = [];
            if (direction === 'left') {
                animateIdxArr = animateIdx === length - 1 ? [animateIdx, 0] : [animateIdx, animateIdx + 1]
            } else if (direction === 'right') {
                animateIdxArr = animateIdx === 0 ? [0, length - 1] : [animateIdx, animateIdx - 1]
            }
            for (let i = 0; i < length; ++i) {
                this.swipeItems[i].animating = animateIdxArr.includes(i);
            }

            this.$nextTick(() => {
                for (let i = 0; i < length; ++i) {
                    this.virtual[i] = virtual[i];
                    this.swipeItems[i].$el.style.cssText = this.virtual[i] || "visibility: hidden";
                }
            });
        },

        playTwoItem () {
            let queue = [].concat(this.queue), // 拷贝一份一维数组
                length = this.queue.length,
                cssIdx = 0,
                virtual = new Array(length),
                flag = 1;

            // 按循环两头的顺序分配css
            while (cssIdx < 2 && queue.length > 0) {
                virtual[flag ? queue.shift() : queue.pop()] = this.css[cssIdx++];
                flag = !flag;
            }

            this.swipeItems[0].animating = true;
            this.swipeItems[1].animating = true;

            for (let i = 0; i < length; ++i) {
                this.virtual[i] = virtual[i];
                this.swipeItems[i].$el.style.cssText = this.virtual[i] || "visibility: hidden";
            }

            // 过度结束后移位
            setTimeout(() => {
                let index = this.virtual.findIndex(val => val === this.css[1]);
                this.swipeItems[index].animating = false;
                this.swipeItems[index].$el.style.transform = `translateX(${this.wrapWidth}px)`;
            }, TRANSITION_DURATION);
        },

        setTwoSwipeItemStyle () {
            this.swipeItems[0].$el.style.cssText = this.setCss(0);
            this.swipeItems[1].$el.style.cssText = this.setCss(this.wrapWidth);
        },

        go (direction) {
            if (this.lockGo) return;
            this.lockGo = true;
            if (direction === 'left') {
                this.queue.push(this.queue.shift());
            } else if (direction === 'right') {
                this.queue.unshift(this.queue.pop());
            }
            this.playMethod(direction);
        }
    },

    destroyed() {
        this.stopPlay();
    },

    watch: {
        swipeItems (val) {
            if (val.length > 0) this.init();
        }
    }
}
</script>

<style lang="scss" scoped>
.my-swipe {
    position: relative;
    overflow: hidden;

    .indicators {
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);

        .indicator-item {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 8px;
            background: #f1f1f1;
            border-radius: 50%;

            &.active {
                background: #58C976;
            }
        }
    }
}

.my-swipe-list {
    position: relative;
    height: 100%;
}
</style>

