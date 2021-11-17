<template>
  <div>
    <pulse-loader :loading="isLoading" :color="'#68d391'" :size="'100'"></pulse-loader>
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import api from "@/api";
import PxAssetsTable from "../components/PxAssetsTable.vue";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';


export default {
  name: "Home",
  components: { PxAssetsTable, PulseLoader },

  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },

  created() {
    this.isLoading = true
    api.getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => this.isLoading = false);
  },
};
</script>
