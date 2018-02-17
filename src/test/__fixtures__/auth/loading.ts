import Login from 'src/components/auth/login'

export default {
  component: Login,
  url: "/url",

  // state: {
  //   loading: true,
  // },

  state: {
    searchQuery: 'Who let the dogs out?',
    error: "error message",
  },

  props: {
    history: {
      push: (arg) => {
        console.log("history push", arg)
      }
    },
  },
}
