<template>
    <div class="my-tabs">
        <div class="tab-nav" :style="style">
            <div class="active-line" :style="lineStyle"></div>
            <div
                v-for="tab in tabItems"
                ref="tabs"
                @click="handleTabNavClick(tab.name)"
                class="tab-nav-item"
            >{{ tab.name }}</div>
        </div>

        <div class="tab-items">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyTabs",

    props: {
        value: String,
        activeColor: {
            type: String,
            default: '#58C976'
        },
        background: {
            type: String,
            default: '#fff'
        },
        textColor: {
            type: String,
            default: '#333'
        }
    },

    computed: {
        style () {
            return {
                background: this.background,
                color: this.textColor
            }
        }
    },

    data () {
        return {
            tabItems: [],
            curName: this.value,
            lineStyle: {}
        }
    },

    methods: {
        handleTabNavClick (name) {
            if (this.curName === name) return;
            this.curName = name;
            this.$emit('input', this.curName);
        },

        // 设置选中的tab的下划线样式
        setLine () {
            this.$nextTick(() => {
                let tabIndex = this.tabItems.findIndex(tab => tab.name === this.curName),
                    tabs = this.$refs.tabs,
                    tab = tabs[tabIndex],
                    width = tab.offsetWidth / 2,
                    left = tab.offsetLeft + (tab.offsetWidth - width) / 2;

                this.lineStyle = {
                    width: width + 'px',
                    background: this.activeColor,
                    transform: `translateX(${left}px)`
                }
            });
        }
    },

    mounted () {
        this.setLine();
    },

    watch: {
        curName () {
            this.setLine();
        }
    }
}
</script>

<style lang="scss" scoped>
$tab-nav-item-h: 44px;

.my-tabs {
    width: 100%;
    height: 100%;
}

.tab-nav {
    display: flex;
    position: relative;

    .active-line {
        position: absolute;
        bottom: 4px;
        height: 3px;
        border-radius: 4px;
        transition: transform .4s;
    }

    .tab-nav-item {
        flex: 1;
        height: $tab-nav-item-h;
        line-height: $tab-nav-item-h;
        text-align: center;
        font-size: 14px;
    }
}

.tab-items {
    height: calc(100% - 44px);
    overflow: auto;
}
</style>

