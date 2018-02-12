import Component from 'src/components/users/view'
import { fakeUser } from 'src/test/support/seed'

export default {
  component: Component,

  props: {
    object: fakeUser
  },

  url: '/header',
}
