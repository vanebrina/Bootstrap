export default class Modal {

    #clon
    #bModal // la instancia de bootstrap.Modal(...)

    /**
     * Crea un modal a partir de una capa con id = "modal"
     * @param {*} properties El objeto que define las propiedades del modal
     */
    constructor({
        styles = '', // modal-sm | modal-lg | modal-xl (por defecto 500px)
        title = 'Título...',
        content = 'Contenido ...',
        buttons = []
    } = {}) {
        
        // clonar el nodo del DOM que tiene definido el modal
        const modal = document.querySelector('#modal')
        this.#clon = modal.cloneNode(true)

        // asignarle al nuevo nodo un identificador único y agregarlo al DOM
        const random = Math.floor(
            Math.random() * 99999999999999).toString().padStart(14, "0"
        )
        this.#clon.id = `${this.#clon.id}-${random}`
        document.querySelector('#utilities').before(this.#clon)

        this.title = title
        this.content = content
        this.styles = styles

        this.#bModal = new bootstrap.Modal(document.getElementById(this.#clon.id)) 

        // el botón de cerrar de la parte superior derecha del modal
        document.querySelector(`#${this.#clon.id} header #close`)
            .addEventListener('click', () => this.close())

        const footer = document.querySelector(`#${this.#clon.id} footer`)

        if (buttons.length === 0) {
            footer.classList.add('visually-hidden');
        } else {
            buttons.forEach(b => this.#createButton(b, footer))
        }

    }

    get id() {
        return this.#clon.id
    }

    /**
     * Agrega un botón al pie de página del modal
     * @param {Object} b Un objeto con las propiedades: id: String, submit: boolean,
                         styles: String, innerHTML: String y callBack: function
     * @param {*} footer El pie de página del modal
     */
    #createButton(b, footer) {
        const submit = b.submit ? 'type=submit' : ''
        const html = `<button id="${b.id}" ${submit} class="${b.styles}">
                          ${b.innerHTML}
                      </button>`
        footer.insertAdjacentHTML('beforeend', html)
        const button = document.querySelector(`#${this.#clon.id} footer #${b.id}`)

        if (typeof b.callBack === 'function') {
            button.addEventListener('click', e => b.callBack(e))
        }
    }

    /**
     * Establece el título del cuadro de diálogo
     * @param {string} strTitle
     */
    set title(strTitle) {
        document.querySelector(`#${this.#clon.id} #title`).innerHTML = strTitle
        return this
    }
    /**
     * Establece el contenido del cuadro de diálogo
     * @param {string} strContent
     */
    set content(strContent) {
        document.querySelector(`#${this.#clon.id} #content`).innerHTML = strContent
        return this
    }

    /**
     * Establece el ancho máximo que puede llegar a tener el modal
     * @param {string} _styles
     */
    set styles(_styles) {
        _styles = _styles.trim()
        if (_styles.length > 0) {
            _styles.split(' ').forEach(s => 
                document.querySelector(`#${this.#clon.id} > div`).classList.add(s)
            )
        }
        return this
    }

    /**
     * Cierra el modal pero éste continúa en memoria
     * @returns this para permitir encadenamiento
     */
     close() {
        this.#bModal.hide()
        return this
    }

    /**
     * Cierra el modal y lo elimina completamente
     */
     dispose() {
        this.#bModal.hide()
        this.#bModal.dispose()   
        this.#bModal = this.#clon = null;
    }

    /**
     * Si la instancia del modal existe, se muestra
     * @returns this para permitir encadenamiento
     */
    show() {
        if (this.#clon) {
            this.#bModal.show()
        } else {
            console.log('Ya no hay una instancia de modal para ser mostrada');
        }
        return this
    }

}