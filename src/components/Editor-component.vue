<template>
  <div className="toast-edit" ref="editor">
<!--    <img v-bind:src="require('/Users/donghyeok/Pictures/picture1.png')">-->
  </div>

</template>

<script>
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Editor from "@toast-ui/editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from "axios";
// import header from "@/components/Header";

// import api from "../api";

export default {
  components: {},
  props: {
    data: {
      type: String,
      default: "",
    },

  },
  data() {
    return {
      changedPrism: null,
      editor: null,

    };
  },
  mounted() {
    this.changedPrism = Prism;

    this.setEditor();
    if (this.data) {
      try {
        this.editor.setMarkdown(this.data);
      } catch (e) {
        this.editor.setHTML(this.data);
      }
    }
  },
  methods: {
    setEditor(data) {
      this.editor = new Editor({
        el: this.$refs.editor,
        plugins: [
          colorSyntax,
          [codeSyntaxHighlight, {highlighter: this.changedPrism}],
        ],
        initialEditType: "wysiwyg",
        language: "ko",
        events: {
          change: this.onChangeEditor,
        },
        hooks: {
          addImageBlobHook: this.addImageBlobHook,
        },
      });
    },

    async addImageBlobHook(file, setText) {
      try {
        if (!file) return false;
        // 이미지 제외 막기 처리하기
        if (file && file.size > 5242880) {
          const size = (file.size / (1000 * 1000)).toFixed(1);
          alert(
              `최대 업로드 사이즈(5 MB)를 초과 하였습니다.\n현재 사이즈 ${size}MB`
          );

          return false;
        }
        // api 업로드 만들기
        const formData = new FormData();
        formData.append("image_no",1);
        formData.append("image_path",file);
        formData.append("content_no",10000001);
        formData.append("image_type","INFO");

        console.log(formData);

        await axios.post('api/user/image'
                        ,formData
                        ,{
                          headers:
                          {
                            'Content-Type': 'multipart/form-data'
                            ,'Access-Control-Allow-Origin': '*'
                          }
                        })
            .then(res => {
              console.log(res);
              if (res) {
                console.log(res.data);
                setText(res.data, file.name);
                console.log(this.editor.getMarkdown());
                console.log(this.editor.getHTML());
              }
            }).catch(err => {
          console.log(err);
        });


      } catch (e) {
        alert("파일 업로드에 실패하였습니다");
      }
    },

    onChangeEditor() {
      this.editorText = this.editor.getMarkdown();

    },
  },
  watch: {
    // watch를 활용한 props 변경 감지
    data(newValue) {
      if (this.editorText !== newValue) {
        this.editor.setMarkdown(newValue);
      }
    },

    editorText(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit("setContent", this.editor.getMarkdown());
      }
    },
  },
};
</script>

<style>

</style>
