// import Notification from 'src/config/notification'
// Notification.success("")
// Notification.info("")
// Notification.warning("")
// Notification.errors("")

import UIStore from "src/store"

export default {

	success(message: string) {
		UIStore.notificationSystem.addNotification({
      message,
			position: "br",
      level: 'success'
    })
	},

	info(message: string) {
		UIStore.notificationSystem.addNotification({
      message,
			position: "br",
      level: 'info'
    })
	},

	warning(message: string) {
		UIStore.notificationSystem.addNotification({
      message,
			position: "br",
      level: 'warning',
    });
	},

	error(message: string) {
		UIStore.notificationSystem.addNotification({
      title: 'An error occured',
      message,
			position: "br",
      level: 'error'
    })
	},

	// errors(errors = []) {
	// 	if (errors.length === 1) {
	// 		this.error(errors[0]);
	// 		return
	// 	}

	// 	errors = errors.reduce((message, error) => {
	// 		return message + '<li>'+error+'</li>';
	// 	}, '');

    // let message = '<ul>'+errors+'</ul>';

	// 	UIStore.notificationSystem.addNotification({
      // title: 'Following errors occured',
      // message,
      // level: 'error'
    // });
	// }

}
