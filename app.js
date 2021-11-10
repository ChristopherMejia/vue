Vue.component('CoinDetail', {

  props: ['coin'],

  data() {
    return{
      showPrices: false,
      value: 0,
    }
  },

  methods: {
    toggleShowPrices(){
      this.showPrices = !this.showPrices;

      this.$emit('change-color')
    }
  },

  computed: {
    title(){
      return `${this.coin.name} - ${this.coin.symbol}`
    },
    
    convertedValue () {
      if(!this.value){
        return 0
      }
      return this.value / this.coin.price;
    },

  },

  template:`
  <div>
    <img 
      v-on:mouseover="toggleShowPrices"
      v-on:mouseout="toggleShowPrices"
      :src="coin.img" :alt="coin.name">

    <h1 :class="coin.changePercent > 0 ? 'green' : 'red' ">
      {{title}}
      <span v-if="coin.changePercent > 0"> :D </span>
      <span v-else-if="coin.changePercent < 0"> :( </span>
      <span v-else> ._. </span>
      <span v-on:click="toggleShowPrices">  
        {{showPrices ? '😄' : '😆'}}</span>

    </h1>

    <input type="number" v-model="value">
    <span>{{ convertedValue }}</span>

    <slot name="text"></slot>
    <slot name="link"></slot>


    <ul v-show=showPrices>
      <li 
        class="uppercase"  
        v-for="(p, i) in coin.priceWithDays" :key="p.day">
        {{i}} - {{p.day}} - {{p.value}}
      </li>
    </ul>


  </div>
  `
})

new Vue({
  el: '#app',
  data() {
    return {
      btc:{
        name: 'Bitcoin',
        symbol: 'BTC',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: 0,
        price: 8400,
        priceWithDays: [
          {day: 'Lunes', value: 8400},
          {day: 'Martes', value: 7900},
          {day: 'Miercoles', value: 8200},
          {day: 'Jueves', value: 9000},
          {day: 'Viernes', value: 94000},
          {day: 'Sabado', value: 100000},
          {day: 'Domingo', value: 10200},
        ],
      },
      color: 'f4f4f4',
    }
  },

  methods:{
    updateColor(color){
      this.color = color || this.color.split('').reverse().join('');
    }
  }
})