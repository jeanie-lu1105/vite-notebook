<template>
    <div id="note" class="detail">
        <note-sidebar></note-sidebar>
        <div class="note-detail">
            <div class="note-empty" v-show="!curBook.id">请创建笔记本后</div>
            <div class="note-empty" v-show="!curNote.id">选择或创建笔记</div>
            <div class="note-detail-ct" v-show="curNote.id">
                <div class="note-bar">
                    <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
                    <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
                    <span> {{ statusText }}</span>
                    <span class="iconfont icon-delete" @click="onDeleteNote"></span>
                    <span class="iconfont" :class="isShowPreview ? 'icon-edit' : 'icon-eye'"
                        @click="isShowPreview = !isShowPreview"></span>
                </div>
                <div class="note-title">
                    <input type="text" :value="curNote.title" @input="onUpdateNote" @keydown="statusText = '正在输入...'"
                        placeholder="输入标题">
                </div>
                <div class="editor">
                    <!-- <codemirror v-model="curNote.content" :options="cmOptions" v-show="!isShowPreview"
                        @input="onUpdateNote" @inputRead="statusText = '正在输入...'"></codemirror> -->
                    <textarea v-show="!isShowPreview" :value="curNote.content" @input="onUpdateNote"
                        @keydown="statusText = '正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>
                    <div class="preview markdown-body" v-html="previewContent" v-show="isShowPreview">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { Auth } from '@/apis/auth'
import { onMounted, ref } from 'vue'
import NoteSidebar from './NoteSidebar.vue'
import type { Note, Notebook } from '@/model/note.interface'
import MarkdownIt from 'markdown-it'
import { useRoute, useRouter } from 'vue-router'
import { NoteRequest } from '@/apis/note'
import _, { reject } from 'lodash'
import { NotebooksRequest } from '@/apis/notebooks'

const router = useRouter()
let curBook = ref<Notebook>({} as Notebook)
let md = new MarkdownIt()
let statusText = '笔记未改动';
let curNote = ref<Note>({} as Note)
let isShowPreview = ref<Boolean>(false)
let notebookList = ref([]);
let notes = ref<Note[]>([] as Note[])
const previewContent = () => {
    return md.render(curNote.value.content || '')
}
const route = useRoute()
onMounted(() => {
    Auth.getInfo().then((res: any) => {
        if (!res.isLogin) {
            router.push({ path: '/login' })
        }
    })

    NotebooksRequest.getAll().then((res: any) => {
        let notebooks = res.data;
        notebookList.value = notebooks;
        curBook.value = notebooks[0];

        NoteRequest.getNotes(notebooks[0].id).then((res: any) => {
            let notesList = res.data;
            notes.value = notesList;
            curNote.value = notesList[0]
        }).catch((err: any) => {
            reject(err)
        })
    }).catch((err: any) => {
        reject(err)
    })

})

const onUpdateNote = _.debounce(() => {
    if (!curNote.value.id) return
    NoteRequest.updateNote(curNote.value.id, { title: curNote.value.title, content: curNote.value.content }).then((data: any) => {
        statusText = '已保存'
    }).catch((data: any) => {
        statusText = '保存出错'
    })
}, 3000)

const onDeleteNote = () => {
    return NoteRequest.deleteNote(curNote.value.id).then((res: any) => {
        router.replace({ path: '/note' })
    })
}

</script>

<style scoped lang="scss">
@use "@/styles/note-detail.scss";

#note {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
}
</style>