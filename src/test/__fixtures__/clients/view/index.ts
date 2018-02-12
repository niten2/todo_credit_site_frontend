import Component from "src/components/clients/view"
import { fakeUser } from "src/test/support/seed"

export default {
  component: Component,

  props: {
    object: fakeUser,
  },

  url: '/header',
}
