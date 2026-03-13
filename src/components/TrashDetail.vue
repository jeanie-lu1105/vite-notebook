<template>
    <div id="trash-detail">
        <h1>{{ msg }} : {{ $route.params.noteId }}</h1>
    </div>
</template>

<script setup lang="ts">

const msg = '回收站笔记详情页'

</script>

<style scoped>
h1 {
    color: blue;
}
</style>