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
                    <codemirror v-model="curNote.content" :options="cmOptions" v-show="!isShowPreview"
                        @input="onUpdateNote" @inputRead="statusText = '正在输入...'"></codemirror>
                    <!--  <textarea v-show="isShowPreview"  v-model:value="curNote.content" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>-->
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
import _ from 'lodash'

const router = useRouter()
let curBook: Notebook = {} as Notebook
let md = new MarkdownIt()
let statusText = '笔记未改动';
let curNote: Note = {} as Note
let isShowPreview = ref<Boolean>(false)
const cmOptions = {
    tabSize: 4,
    mode: 'text/x-markdown',
    theme: 'neat',
    lineNumbers: false,
    line: true,
}
const previewContent = () => {
    return md.render(curNote.content || '')
}
const route = useRoute()
onMounted(() => {
    Auth.getInfo().then((res: any) => {
        if (!res.isLogin) {
            router.push({ path: '/login' })
        }
    })

})

const onUpdateNote = _.debounce(() => {
    if (curNote.id) return
    NoteRequest.updateNote(curNote.id, { title: curNote.title, content: curNote.content }).then((data: any) => {
        console.log(data)
        statusText = '已保存'
    }).catch((data: any) => {
        statusText = '保存出错'
    })
}, 3000)

const onDeleteNote = () => {
    return NoteRequest.deleteNote(curNote.id).then((res: any) => {
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