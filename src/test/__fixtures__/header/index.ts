import Header from 'src/components/shared/header'

export default {
  component: Header,

  props: {
    history: {
      push: (arg) => { return arg }
    },
  },

  url: '/header',
}
