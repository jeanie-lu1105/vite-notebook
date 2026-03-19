<template>
    <div id="trash-detail">
        <h1>Trash page</h1>
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
        console.log('check login', res)
        if (!res.isLogin) {
            return router.push({ path: '/login' })
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