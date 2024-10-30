import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

import { watch } from 'vue'
import type { Ref } from 'vue'
import { useOptionsStore } from '../store'
import { storeToRefs } from 'pinia';
import { Language } from '../typings'


const optionsStore = useOptionsStore()
const { renderOptionsComponentList } = storeToRefs(optionsStore)

export const beginCssTemplate = `
.main {
}
`

export const renderCSSTemplate = (code: string) => {
  return `
.main {
  ${code}
}
  `
}

export const useRenderComponentStyleHooks = (actionName: Ref, uuid: Ref, domRef: any) => {
  /**
   * 编辑器
   */
  let editorer: any = null

  self.MonacoEnvironment= {
    getWorker(_, label){
      if (label === "typescript" || label === "javascript") {
        return new tsWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker()
      }
      else return new editorWorker();
    }
  }

  const createCodeEditor = async (language: Language) => {
    const monaco = await import('monaco-editor');
    editorer = monaco.editor.create(domRef.value, {
      value: beginCssTemplate,
      language,
      theme: 'vs-dark'
    })

    if (editorer) {
      initCodeStyle()
    }
  }

  const destroyEditor = () => {
    if (editorer) {
      editorer.dispose()
      editorer = null
    }
  }

  /**
   * 初始化编辑器样式代码
   */
  const initCodeStyle = () => {
    if (renderOptionsComponentList.value[uuid.value] && renderOptionsComponentList.value[uuid.value].options && renderOptionsComponentList.value[uuid.value].options.style) {
      const _style = renderCSSTemplate(renderOptionsComponentList.value[uuid.value].options.style)
      editorer.setValue(_style)
    }
  }


  const createRenderStyle = () => {
    const _value = editorer.getValue()
    const matches = _value.match(/{([^]*?)}/)
    renderOptionsComponentList.value[uuid.value].options.style = matches ? matches[1].trim() : ''
    console.log(renderOptionsComponentList.value)
  }
  
  watch(
    () => actionName.value,
    (val: string) => {
      if (val === 'style') {
        createCodeEditor(Language.CSS)
      }
      else {
        destroyEditor()
      }
    }
  )

  return {
    createCodeEditor,
    initCodeStyle,
    createRenderStyle
  }
}