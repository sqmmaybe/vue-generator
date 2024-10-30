import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

import { useOptionsStore } from '../store'
import { storeToRefs } from 'pinia';
import { Language } from '../typings'

const combinedRegex = /(?:function\s+(\w+)|(\w+)\s*=\s*function\s*\(|const\s+(\w+)\s*=\s*\([^)]*\)\s*=>)/g;  

const optionsStore = useOptionsStore()
const { renderOptionsComponentList } = storeToRefs(optionsStore)


export const useRenderComponentFunctionHooks = () => {
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

  const createCodeEditor = async (uuid: string, eventType: string, domRef: any) => {
    const monaco = await import('monaco-editor');
    editorer = monaco.editor.create(domRef.value, {
      value: '',
      language: Language.JAVASCRIPT,
      theme: 'vs-dark'
    })

    if (editorer) {
      initCodeFunction(uuid, eventType)
    }
  }

  const destroyEditor = () => {
    if (editorer) {
      editorer.dispose()
      editorer = null
    }
  }

  /**
   * 初始化编辑器js代码
   */
  const initCodeFunction = (uuid: string, eventType: string) => {
    if (
      renderOptionsComponentList.value[uuid].options!.originEvent && 
      renderOptionsComponentList.value[uuid].options!.originEvent[eventType] &&
      renderOptionsComponentList.value[uuid].options!.originEvent[eventType].length > 0
    ) {
      editorer.setValue(renderOptionsComponentList.value[uuid].options!.originEvent[eventType][0].functionExpress)
    }
  }


  const createRenderFunction = (uuid: string, eventType: string) => {
    const codeString = editorer.getValue()
    let match
    const allFunctionNames = []
    while ((match = combinedRegex.exec(codeString)) !== null) {  
      if (match[1]) {  
          allFunctionNames.push({
            eventType, functionName: match[1], functionExpress: editorer.getValue()
          });  
      } else if (match[2]) {  
        allFunctionNames.push({
          eventType, functionName: match[2], functionExpress: editorer.getValue()
        });  
      } else if (match[3]) {  
        allFunctionNames.push({
          eventType, functionName: match[3], functionExpress: editorer.getValue()
        });  
      }  
    }
    renderOptionsComponentList.value[uuid].options.originEvent[eventType] = allFunctionNames
    console.log(renderOptionsComponentList.value)
  }

  return {
    createCodeEditor,
    createRenderFunction,
    destroyEditor
  }
}