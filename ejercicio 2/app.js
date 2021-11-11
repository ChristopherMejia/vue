Vue.component('modal', {
    props: [ 'showModal' ],

    data() {
        return{
            title : 'Primeros pasos con Vue.js',
        }
    },

    methods: {
        toggleShowModal(){
            this.$emit('close-model')
        }
    },

    template: `
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <h3>{{title}}</h3>
            <div>
                <slot name="body"></slot>
            </div>
            <footer>
              <button v-on:click="toggleShowModal">Cerrar</button>
            </footer>
          </div>
        </div>
      </div>`
  })
  

  new Vue({
    el: '#app',

    data() {
        return{
            open: false,
        }
    },



    methods:{
        showModal(){
            this.open = !this.open;
        }
      }

  })