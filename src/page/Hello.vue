<template>
  <div class="hello">
    <div>加载中参数</div>{{isLoading}}
    <div style='color:red'>{{totalProducts}}</div>
    <div style='color:blue'>{{$store.state}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'hello',
  methods: {
    ...mapActions([
      'fetchProducts',
      'fetchUser'
    ]),
    test () {
      console.log('请求正常')
    }
  },
  computed: {
    ...mapGetters([
      'totalProducts',
      'totalUser',
      'isLoading'
    ])
  },
  mounted () {
    this.$store.dispatch('fetchProducts')
    /*let payload = {wowo:'wowo'}
    this.fetchProducts(payload).then((res) => {
      this.$status(res, function (that) {
        that.test()
      }, this)
    })*/
    /*this.fetchUser().then((res) => {
      this.$status(res, function (that) {
        that.test()
      }, this)
    })*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
