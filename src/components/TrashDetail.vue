<template>
    <div id="trash-detail">
        <h1>{{ $route.params.noteId }}</h1>
    </div>
</template>

<script setup lang="ts">
import { Auth } from '@/apis/auth'
// import router from '@/router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


onMounted(() => {
    Auth.getInfo().then((res: any) => {

        if (!res.isLogin) {
            router.push({ path: '/login' })
        }
    }).catch((err: any) => {
        console.log(err)
    })
})
</script>

<style scoped>
h1 {
    color: blue;
}
</style>