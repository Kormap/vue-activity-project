<template>
  <div id="My-page">

    <div id="Nav">
      <NavComponent></NavComponent>
    </div>

    <div id="MypageComponent">
      <MypageComponent></MypageComponent>
    </div>


  </div>
</template>

<script scope>

import MypageComponent from "@/components/Mypage-component";
import NavComponent from "@/components/Nav-component";
export default {
  name: "My-page",
  // mounted() {
  //
  // },
  // data() {
  //
  // },
  components: {
    NavComponent,
    MypageComponent

  },
  methods: {

  },
}

</script>


<style scoped>
#MypageComponent{
  margin-top: 150px;
}
#Nav{
  margin-top: 50px;
  margin-left: 150px;
}
</style>
