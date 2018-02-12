import Component from 'src/components/clients/show'

export default {
  component: Component,

  props: {
    match: {
      params: {
        id: "507f1f77bcf86cd799439011"
      }
    },

    history: {
      push: (arg) => {
        console.log("[HISTORY PUSH]", arg)
      }
    },
  },

  url: '/header',
}
