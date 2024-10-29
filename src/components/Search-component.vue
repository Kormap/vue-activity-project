<template>
  <div id="Search-component">

    <div class="searchContainer">
    <img class="searchContainer" src="/img/artworld_title.ee77dd34.jpg">
    </div>
    <br><br>
    <div class="jb-text">


      <p>액티비티 & 체험</p>
      <p id="searchComponentText">다양한 액티비티 및 체험 상품을 검색해보세요!</p>

      <div id="searchBox">
            <b-button :pressed.sync="myToggle" variant="light" id="allAreaBtn" class="routerBtn" @click="goHome()">
              전체 여행지
            </b-button>
          <br>
          <label class="input-box" data-v-5dcd2723="">
            <div>
            <i class="fas fa-search fa-1x" id="searchImage" style="color:gray; margin-top: 30px;"></i>
            </div>
              <svg width="0" height="80" class="svg-icon" data-v-5dcd2723="">
            <use href="#common-icon_edit_search_m" xlink:href="#common-icon_edit_search_m"></use></svg>
              <input type="text" id="searchText" v-on:keyup.enter="searchFunction" style="width:600px; height: 50px; font-size: 25px; text-align: center; border: none; outline: none;" placeholder=" 액티비티 검색" value="" >
                <b-button variant="warning" v-on:click="searchFunction" style="width:140px; height: 50px; font-size: 25px; margin-top: 5px;">
                  <span>검색</span>
                </b-button>
          </label>
      </div>


    </div>



  </div>
</template>

<script scope>
export default {
  name: "Search-component",


data() {
  return {
        myToggle: false,
        buttons: [],
      }
    },
  computed: {
      btnStates() {
        return this.buttons.map(btn => btn.state)
      }
    },
  methods:{
    searchFunction(){
      const searchText=  document.getElementById('searchText').value;
      this.$emit('searchContent',searchText);
    },
    goHome(){
      window.location.href = "/mainpage";
    }
  },
}
</script>

<style scoped>
#Search-component {
  position: relative;
}

.searchContainer {
  margin-left: -50px;
  margin-top: 78px;
  width: 1950px;
  height: 400px;
  /*overflow: hidden;*/
  position: absolute;
}

.searchContainer > img {
  position: absolute;
  /* 위치관련 */
  transform: translate(-50%, -50%);
}
.jb-text {
  text-align: left;
  padding: 0px 20px;
  color: white;
  font-size: 40px;
  position: absolute;
  text-space: 30px;
  color: #fff;
}
#searchComponentText{
  font-size: 20px;
  color: #fff;
}
#allAreaBtn {
  border-radius: 50px;
  padding: 10px 30px;
}
.routerBtn{
  color: black;
}

#searchImage{
  position: absolute;
  width: 35px;
  height: 30px;
  margin-left: 10px;
}


</style>