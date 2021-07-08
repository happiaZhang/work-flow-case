<template>
  <div id="app">
    <div id="nav">
      <p>你好，以下是我可以访问的菜单资源：</p>
      <router-link v-for="item in routerLinks" :key="item.path" :to="item.path">
        {{item.name}}
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { routes } from './router/index.js'

export default {
  name: 'App',
  computed: {
    routerLinks() {
      return routes.filter(r => (r.owners.indexOf(process.env.PROJECT_ENV) > -1))
    }
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  margin: 0 8px;
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
