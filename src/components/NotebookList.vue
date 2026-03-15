<template>
    <div class="detail" id="notebook-list">
        <header>
            <a href="#" class="btn"><i class="iconfont icon-plus">Create Notebook</i></a>
        </header>
        <main>
            <div class="layout">
                <h3>Notebook List</h3>
                <div class="book-list">
                    <a href="#" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook"></span>notebook
                            <span>3</span>
                            <span class="action">Edit</span>
                            <span class="action">Delete</span>
                            <span class="date">3 Days Ago</span>
                        </div>
                    </a>
                    <a href="#" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook"></span>notebook2
                            <span>23</span>
                            <span class="action">Edit</span>
                            <span class="action">Delete</span>
                            <span class="date">1 Days Ago</span>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { Auth } from '@/apis/auth';
import router from '@/router';
import { onMounted, ref } from 'vue';

const msg = ref('Notebook List')

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
    color: red;
}
</style>