import Component from 'src/components/clients/new'

export default {
  component: Component,
  url: '/header',

  props: {
    history: {
      push: (arg) => {
        console.log("history push", arg)
        return arg
      }
    },
  },

}
