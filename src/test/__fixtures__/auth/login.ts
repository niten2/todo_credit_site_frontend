import Login from 'src/components/auth/login'

export default {
  component: Login,
  url: "/url",

  state: {
    // searchQuery: 'Who let the dogs out?',
    error: "error message",
    loading: true,
  },


  props: {
    history: {
      push: (arg) => {
        console.log("history push", arg)
      }
    },
  },
}
