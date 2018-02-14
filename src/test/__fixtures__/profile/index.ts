import Profile from 'src/components/profile'

export default {
  component: Profile,
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
