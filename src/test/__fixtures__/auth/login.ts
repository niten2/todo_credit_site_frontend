import Login from 'src/components/auth/login'

export default {
  component: Login,

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
