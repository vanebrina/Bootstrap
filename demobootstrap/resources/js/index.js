import '../../node_modules/bootstrap/dist/js/bootstrap.js'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

import Modal from './modal.js'
import Toast from './toast.js'

document.addEventListener('DOMContentLoaded', event => {

    /* 
     const m = new Modal({

        title: 'Actualizar registro',
        styles: 'modal-lg',
        buttons: [
            {
                id: 'save',
                styles: `btn btn-primary`,
                innerHTML: 'Guardar',
                callBack: () => console.log('Su información está a salvo')
            },

            {
                id: 'close',
                styles: `btn btn-secondary`,
                innerHTML: 'Cerrar',
                callBack: () => { 
                   console.log('Cerró sin guardar')
                   m.dispose()
                }
            }
        ]

    }).show()
    */

    Toast.instance = new bootstrap.Toast(
        document.querySelector('#message'), { delay: 3000 }
    )

    const m = new Modal({
        buttons: [
            {
                id: 'save',
                class: `btn btn-primary`,
                innerHTML: 'Guardar',
                callBack: () => {
                    Toast.info({
                        message: `Todos los datos enviados`,
                        mode: 'info'
                    })
                    m.close()
                }
            },
            {
                id: 'close',
                class: `btn btn-secondary`,
                innerHTML: 'Cerrar',
                callBack: () => {
                    m.close()
                    Toast.info({
                        message: `Cerró sin guardar. Asuma las consecuencias...`,
                        mode: 'danger'
                    })
                }
            }
        ]
    }).show()

})