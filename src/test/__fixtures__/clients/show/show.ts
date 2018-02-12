import Component from 'src/components/clients/show'

export default {
  component: Component,

  props: {
    history: {
      push: (arg) => {
        console.log("history push", arg)
        return arg
      }
    },
  },

  url: '/header',
}
