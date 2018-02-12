import Component from "src/components/clients/loans/view"
import { fakeLoan } from "src/test/support/seed"

export default {
  component: Component,

  props: {
    loan: fakeLoan,
    clientId: "507f1f77bcf86cd799439011",

    history: {
      push: (arg) => {
        console.log("history push", arg)
        return arg
      }
    },
  },

  url: '/header',
}
