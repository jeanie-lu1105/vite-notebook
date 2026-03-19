<template>
    <div class="note-sidebar">
        <span v-if="curBook.id" class="btn add-note" @click="showDialog">添加笔记</span>
        <span v-if="!curBook.id" class="notebook-title">无笔记本</span>


        <el-dropdown v-if="curBook?.id" class="notebook-title" @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link">
                {{ curBook.title }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">{{
                        notebook.title }}</el-dropdown-item>
                    <el-dropdown-item command="trash">回收站</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
        </div>
        <ul class="notes" v-if="curBook?.id">
            <li v-for="note in notes" :key="note.id">
                <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook?.id}`">
                    <span class="date">{{ note.updatedAtFriendly }}</span>
                    <span class="title">{{ note.title }}</span>
                </router-link>
            </li>
        </ul>
        <div v-else class="no-notes">请选择一个笔记本</div>
        <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
            <el-form :model="form">
                <el-form-item label="Note Title" label-width="120px">
                    <el-input v-model="form.title" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Content" label-width="120px">
                    <el-input v-model="form.content" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showDialog">Cancel</el-button>
                    <el-button type="primary" @click="onAddNote">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup lang="ts">
import { NotebooksRequest } from '@/apis/notebooks';
import type { Note, Notebook } from '@/model/note.interface';
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue'
import { NoteRequest } from '@/apis/note';
import { friendlyDate } from '@/helpers/util';
import { useRoute, useRouter } from 'vue-router';

let notes = ref<Note[]>([]);
let notebooks = ref<Notebook[]>([]);
let curBook = ref<Notebook>({} as Notebook);
let dialogFormVisible = ref(false);
const route = useRoute()
const router = useRouter()
const form = reactive({
    title: '',
    content: ''
})
onMounted(() => {
    NotebooksRequest.getAll().then((res: any) => {
        let notebookId = route.query.notebookId as string;
        let notebookList = res.data as Notebook[]
        notebooks.value = notebookList
        curBook.value = (notebookList.find(item => item.id === notebookId) || notebookList[0]) as Notebook
        if (!!curBook.value.id) {
            NoteRequest.getNotes(curBook.value.id).then((res: any) => {
                notes.value = res.data
            }).catch((err: any) => {
                console.log(err)
            })
        }

    }).catch((err: any) => {
        console.log(err)
    })
})
const showDialog = () => {
    dialogFormVisible.value = !dialogFormVisible.value
}

const onAddNote = () => {
    showDialog()
    let title = form.title.trim()
    let content = form.content.trim()
    NoteRequest.addNote(curBook.value.id, { title, content }).then((res: any) => {
        let newNote = res.data
        newNote.createdAtFriendly = friendlyDate(newNote.createdAt)
        newNote.updatedAtFriendly = friendlyDate(newNote.updatedAt)
        notes.value.unshift(newNote)
    }).catch((err: any) => {
        console.log(err)
    })
}

const handleCommand = (notebookId: string) => {
    console.log(notebookId)
    if (notebookId === 'trash') {
        router.push({ path: '/trash' })
    } else {
        const notebook = notebooks.value.find(item => item.id === notebookId)
        if (notebook) {
            curBook.value = notebook
            NoteRequest.getNotes(curBook.value.id).then((res: any) => {
                notes.value = res.data
            }).catch((err: any) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped lang="scss">
@use '@/styles/note-sidebar.scss';
</style>