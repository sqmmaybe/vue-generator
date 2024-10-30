import { ref } from 'vue'

export const usePropertyRenderTableHooks = (op: any) => {
  const tableList = ref<{tableName: string, tableProp: string}[]>([])
  
  const initTableList = () => {
    if (typeof op === 'object' && op.hasOwnProperty('tableList')) {
      tableList.value = op.tableList
    }
    else {
      tableList.value = [
        {
          tableName: '',
          tableProp: ''
        }
      ]
    }
  }

  const saveTableList = () => {
    op.tableList = tableList.value
  }

  const addTableListItem = () => {
    tableList.value.push({
      tableName: '',
      tableProp: ''
    })
  }

  return {
    tableList,
    initTableList,
    saveTableList,
    addTableListItem
  }
}