import Login from 'src/components/auth/login'

export default {
  component: Login,
  url: "/url",

  props: {
    history: {
      push: (arg) => {
        console.log("history push", arg)
      }
    },
  },
}
