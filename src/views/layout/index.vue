<template>
    <div>
        <appmain></appmain>
        <tabs></tabs>

        <welcome></welcome>
    </div>
</template>

<script>
import appmain from './components/AppMain';
import tabs from './components/Tabs';
import welcome from '@/components/welcome';

export default {
    components: { appmain, tabs, welcome }
}
</script>

<style lang="scss" scoped>

</style>