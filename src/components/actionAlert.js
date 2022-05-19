const Swal = require ('sweetalert2')

export default function actionAlert(message) {
  Swal.fire({
    title: message,
    timer: 1500,
    timerProgressBar: true,
  })
}