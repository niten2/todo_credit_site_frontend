import Clients from 'src/components/clients'

export default {
  component: Clients,
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
