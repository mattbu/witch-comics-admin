import Vue from 'vue'

import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ko-kr' // 한국어로 변경
import { Editor } from '@toast-ui/vue-editor'

Vue.component('TuiEditor', Editor)
