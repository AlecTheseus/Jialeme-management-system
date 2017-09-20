<template>
  <div id="app">
    <div v-if="isLoading"><img class="loading" src="/static/img/loading.gif"></div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>

</template>
<script type="text/javascript">

</script>
<script>
import axios from 'axios'
window.axios = axios
import store from './vuex/store.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name:"app",
  data () {
    return {
    }
  },
  methods:{
    closeTips() {
      $api.remove($api.byId("tips-1"));
    }
  },
  beforeMount(){

  },
  mounted(){
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  },
  store
}
</script>

<style>
  #app{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;

  }

</style>
