<template>
  <div class="flex-col">
      <div>
        <pulse-loader :loading="isLoading" :color="'#68d391'" :size="'100'"></pulse-loader>
      </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img 
            :alt="asset.name"
            class="w-20 h-20 mr-5"
            />
            <!-- :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"  -->
          <h1 class="text-gray-500 text-5xl">
              {{ asset.name }}
            <small class="sm:mr-2 text-gray-500"> {{ asset.symbol }} </small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span class="text-white">#{{ asset.rank }} </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span class="text-white"> {{ dollarFilter(asset.priceUsd) }} </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span class="text-white"> {{ dollarFilter(min) }} </span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span class="text-white">{{ dollarFilter(max) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span class="text-white">{{ dollarFilter(avg) }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span class="text-white"> {{ percentFilter(asset.changePercent24Hr) }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >Cambiar</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <line-chart class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map( h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />

      <h3 class="text-xl my-10 text-white">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td class="text-white">
            <b> {{ m.exchangeId}}</b>
          </td>
          <td class="text-white"> {{ dollarFilter(m.priceUsd) }} </td>
          <td class="text-white"> {{ m.baseSymbol }} / {{m.quoteSymbol}} </td>
          <td class="text-white">
            <px-button v-if="!m.url" @click="getWebSite(m)">
              <slot> Obtener Link </slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">
              {{m.url}}
            </a>
          </td>
        </tr>
      </table>

    </template>
  </div>
</template>

<script>
    import api from '../api'
    import { dollarFilter, percentFilter } from "@/filters";
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import PxButton from '@/components/PxButton';



    export default {
        name: 'CoinDetail',
        components: { PulseLoader, PxButton },

        data(){
            return {
                isLoading: false, 
                asset: {},
                history: [],
                markets: []
            }
        },

        computed: {
            min(){ 
                return Math.min(
                    ... this.history.map( h => parseFloat(h.priceUsd).toFixed(2))
                )
            },

            max(){
                return Math.max(
                    ... this.history.map( h => parseFloat(h.priceUsd).toFixed(2))
                )
             },

            avg(){ 
                return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length
            },
        },

        setup() {
            return {
            dollarFilter,
            percentFilter,
            };
        },

        created() { //cada que se crea un componente se ejecuta el método getCoin()
            this.getCoin()
        },

        methods: {
            getWebSite(exchange) {
              return api.getExchange(exchange.exchangeId)
                .then(res => {
                  exchange.url = res.exchangeUrl
                })
            },

            getCoin() {
                const id = this.$route.params.id //$route es una caracteristica del router que nos permite obtener los parametros, la ruta, etc.
                this.isLoading = true
                Promise.all([
                    api.getAsset(id),
                    api.getAssetHistory(id),
                    api.getMarkets(id),
                ])
                .then(([asset, history, markets]) => {
                    this.asset = asset,
                    this.history = history
                    this.markets = markets
                })
                .finally( () => this.isLoading = false)
            }
        },
    }
</script>


