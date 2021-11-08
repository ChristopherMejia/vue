new Vue({
  el: '#app',
  data() {
    return {
      name: 'Bitcoin',
      img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      changePercent: 0,
      color: 'f4f4f4',
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

      showPrices: false, 
    }
  },

  methods:{
    toggleShowPrices(){
      this.showPrices = !this.showPrices;

      this.color = this.color.split('').reverse().join('');
    }
  }
})