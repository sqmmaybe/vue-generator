import { defineStore } from 'pinia'

export const useOptionsStore = defineStore('options', {
  state: () => {
    return {
      renderOptionsComponentList: {

      } as any
    }
  },

  getters: {
    getRenderOptionsComponentList(): any {
      return this.renderOptionsComponentList
    }
  },

  actions: {
    setRenderOptionsComponent(component: any) {
      this.renderOptionsComponentList[component.uuid] = component
    },

    removeRenderOptionsComponent(uuid: string) {
      delete this.renderOptionsComponentList[uuid]
    },

    setCurrentOptionsValue(uuid: string, attributes: any) {
      this.renderOptionsComponentList[uuid].options.attribute = attributes
    }
  }
})