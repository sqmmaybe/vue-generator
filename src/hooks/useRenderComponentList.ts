import { useOptionsStore } from '../store'
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue'


export const useRenderComponentList = () => {
  const optionsStore = useOptionsStore()
  const { renderOptionsComponentList } = storeToRefs(optionsStore)

  const rdcList = ref([]) as any
  const checkedListItemUUid = ref('')

  const setCheckedListTag = (item: any) => {
    checkedListItemUUid.value = item.uuid
  }

  const removeList = (uuid: string) => {
    optionsStore.removeRenderOptionsComponent(uuid)
  }

  watch(
    () => renderOptionsComponentList.value,
    (val: any) => {
      rdcList.value = []
      for (let key in val) {
        rdcList.value.push(val[key])
      }
    },
    {
      deep: true
    }
  )


  return {
    rdcList,
    checkedListItemUUid,
    removeList,
    setCheckedListTag
  }
}