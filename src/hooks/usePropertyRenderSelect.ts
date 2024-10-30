import { ref } from 'vue'

export const usePropertyRenderSelectHooks = (op: any) => {
  const optionsList = ref<{opLabel: string, opValue: string}[]>([])
  
  const initOptionsList = () => {
    if (typeof op === 'object' && op.hasOwnProperty('optionsList')) {
      optionsList.value = op.optionsList
    }
    else {
      optionsList.value = [
        {
          opLabel: '',
          opValue: ''
        }
      ]
    }
  }

  const saveOptionsList = () => {
    op.optionsList = optionsList.value
  }

  const addOptionsListItem = () => {
    optionsList.value.push({
      opLabel: '',
      opValue: ''
    })
  }

  return {
    optionsList,
    initOptionsList,
    saveOptionsList,
    addOptionsListItem
  }
}