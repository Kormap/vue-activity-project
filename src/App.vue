<template>
  <div id="app">
        <!-- convert -->
        <!-- <a href="#/main" class="">main</a> -->
    <Header v-if="!isCheckedheader" id="header"></Header>


      <router-view></router-view>

    <div id="footer">
      <Footer v-if="!isCheckedfooter"></Footer>
    </div>


  </div>
</template>
<script>
// import GoCalendar from './components/Calendar-component.vue'
// import goLogin from './components/Login-page.vue'
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  name: 'App',
  data() {
    return {
      CalendarOnOff: false,
      isCheckedheader: false,
      isCheckedfooter : false,
    }
  },
  components: {
    // GoCalendar,
    // goLogin,
    Footer,
    Header,

  },
  methods: {

  },
  created() {
    if (document.location.pathname === '/signup') {
      this.isCheckedheader = true;
    }
    if (document.location.pathname === '/login') {
      this.isCheckedheader = true;
    }
    if (document.location.pathname === '/mypage') {
      this.isCheckedfooter = true;
    }
    if (document.location.pathname === '/reservationinfo') {
      this.isCheckedfooter = true;
    }

  },
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  background-color: white;
  position: relative;
  width: 100%;
  height: 100%;

}
body {
  margin: 0;
}
#header{
  padding: 10px;
}


</style>
