<template>
  <div class="home">
    <img alt="Vue logo" width="150" src="../assets/logo.png">
    <h4>企业价值观：正道成功</h4>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  mounted() {
    console.log('process.env: ', process.env)
  }
}
</script>
