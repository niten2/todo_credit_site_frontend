import Component from 'src/components/clients/show'

export default {
  component: Component,
  url: '/header',

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
}
