<template>
    <div class="detail" id="notebook-list">
        <header>
            <a href="#" class="btn" @click.prevent="onCreateNotebook">
                <i class="iconfont icon-plus">Create Notebook</i>
            </a>
        </header>
        <main>
            <div class="layout">
                <h3>Notebook List{{ notebookList.length }}</h3>
                <div class="book-list">
                    <router-link v-for="notebook in notebookList" :key="notebook.id" :to="`/notebooks/${notebook.id}`"
                        class="notebook">
                        <div>
                            <span class="iconfont icon-notebook"></span>{{ notebook.title }}
                            <span>{{ notebook.noteCounts }}</span>
                            <span class="action" @click.prevent="onEdit(notebook)">Edit</span>
                            <span class="action" @click.prevent="onDelete(notebook)">Delete</span>
                            <span class="date">{{ notebook.displayDate }}</span>
                        </div>
                    </router-link>

                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { Auth } from '@/apis/auth';
import { NotebooksRequest } from '@/apis/notebooks';
import { friendlyDate } from '@/helpers/util';
import router from '@/router';
import { ref } from 'vue';
import { onMounted } from 'vue';

interface Notebook {
    id: string;
    title: string;
    noteCounts: number;
    createdAt: string;
    updatedAt: string;
    userId: string;
    displayDate: string
}

let notebookList = ref<Notebook[]>([])


onMounted(() => {
    Auth.getInfo().then((res: any) => {
        if (!res.isLogin) {
            router.push({ path: '/login' })
        }
    }).catch((err: any) => {
        console.log(err)
    })

    NotebooksRequest.getAll().then((res: any) => {
        notebookList.value = res.data
    }).catch((err: any) => {
        console.log(err)
    })
})

const onEdit = (notebook: Notebook) => {
    console.log(notebook)
    let title = prompt('Edit Notebook Title', notebook.title)
    if (!title?.trim()) {
        alert('Notebook title cannot be empty')
        return
    }
    NotebooksRequest.update(notebook.id, { title }).then((res: any) => {
        if (res?.data) {
            notebook.title = title
        }
        alert(res.msg || 'Notebook updated successfully')
    }).catch((err: any) => {
        console.log(err)
    })
}

const onDelete = (notebook: Notebook) => {
    let isConfirm = confirm('Are you sure to delete this notebook?')
    if (isConfirm) {
        NotebooksRequest.delete(notebook.id).then((res: any) => {
            let index = notebookList.value.findIndex(item => item.id === notebook.id)
            notebookList.value.splice(index, 1)
            alert(res.msg || 'Notebook deleted successfully')
        }).catch((err: any) => {
            console.log(err)
        })
    }
}

const onCreateNotebook = () => {
    let title = prompt('请输入笔记本名称')
    if (!title?.trim()) {
        alert('笔记本名称不能为空')
        return
    }
    NotebooksRequest.add({ title }).then((res: any) => {
        if (res?.data) {
            res.data.displayDate = friendlyDate(res.data.createdAt)
            notebookList.value.unshift(res.data)
        }

    }).catch((err: any) => {
        console.log(err)
    })
}

</script>

<style lang="scss" scoped>
@import url('@/styles/notebook-list.scss');
</style>