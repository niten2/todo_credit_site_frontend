import { extendObservable } from 'mobx'

let UIStore  = {
  notificationSystem: {
    addNotification: (options: any): any => {
      console.log(options)
    }
  },
}

extendObservable(UIStore)

export default UIStore
