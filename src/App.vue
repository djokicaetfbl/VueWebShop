<!--  ovo je main entry point nase aplikacije 
    ovdje renderujem view za svoje rute (routes) koje sam definisao,
    importovat cu ga u main.js fajl,
-->

<template>
  <router-view> </router-view>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  
    computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  created() {
    this.$store.dispatch('tryLogin'); // za auto-login
  },

  //watcher za autoLogOut
  watch: {
    didAutoLogout(curValue, oldValue){
      if(curValue && curValue !== oldValue) {
        this.$router.replace('/articles');
      }
    }
  }
   
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
