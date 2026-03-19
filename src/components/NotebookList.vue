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
                    <router-link v-for="notebook in notebookList" :key="notebook.id"
                        :to="`/note?notebookId=${notebook.id}`" class="notebook">
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
import type { Notebook } from '@/model/note.interface';
import router from '@/router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { onMounted } from 'vue';



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
    ElMessageBox.prompt('Please enter the notebook name', 'Edit Notebook', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputValue: notebook.title,
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: 'Name must be between 1 and 30 characters',
    })
        .then(({ value }) => {
            return NotebooksRequest.update(notebook.id, { title: value }).then((res: any) => {
                notebook.title = value
                ElMessage.success(res.msg || 'Notebook updated successfully');
            })
        }).catch(() => {
            ElMessage.info('Edit notebook cancelled');
        });
}



const onDelete = (notebook: Notebook) => {
    ElMessageBox.confirm(`Are you sure to delete this notebook ${notebook.title}?`, 'Delete Notebook', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
    }).then(() => {
        NotebooksRequest.delete(notebook.id).then((res: any) => {
            let index = notebookList.value.findIndex(item => item.id === notebook.id)
            notebookList.value.splice(index, 1)
            ElMessage.success(res.msg || 'Notebook deleted successfully');
        }).catch((err: any) => {
            console.log(err)
        })
    }).catch(() => {
        ElMessage.info('Delete notebook cancelled');
    });

}

const onCreateNotebook = () => {
    ElMessageBox.prompt('Please enter the notebook name', 'Create Notebook', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: 'Name must be between 1 and 30 characters',
    })
        .then(({ value }) => {
            return NotebooksRequest.add({ title: value }).then((res: any) => {
                if (res?.data) {
                    ElMessage.success(res.msg || 'Notebook created successfully');
                    res.data.displayDate = friendlyDate(res.data.createdAt)
                    notebookList.value.unshift(res.data)
                }

            })
        }).catch(() => {
            ElMessage.info('Create notebook cancelled');
        });
}


</script>

<style lang="scss" scoped>
@import url('@/styles/notebook-list.scss');
</style>