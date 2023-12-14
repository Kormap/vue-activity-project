<template>
  <div id="Mypage-component">

    <ul class="my-profile">
      <li id="myprofile_li" style="list-style-type : none;">
          <div class="profile_box">
              <label for="profile">
              </label>
              <!--              <input type="file" name="profile_photo" id="profile_photo" accept="image/png, image/jpg, image/jpeg" class="f_hidden">-->

              <img width="100" height="100" alt="" v-if="basic_profileShow" src="https://cdn-icons-png.flaticon.com/512/860/860784.png">
              <img width="100" height="100" alt="" v-if="!basic_profileShow" v-bind:src="user_profile" style="border-radius: 30px;" >
              <div></div>
            <br><h3>내 정보</h3><br>
            <div class="edit_profile">
              <a href="/profile">
                <span>내 정보 관리</span>
              </a>
            </div>
          </div>

        <div class="mycontent">
          <div id="reservation_info">
            <a href="/reservationinfo">
              <span>예약내역</span>
            </a>
          </div>
          <div id="wishlist">
            <a href="/wishlist">
              <span>위시리스트</span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script scope>

export default {
  name: "Mypage-component",
  mounted() {
    //카카오 프로필이 있을 경우 basic_profileShow 플래그 false
    if(!(sessionStorage.getItem('kakao_profile')==null)){
      this.user_profile  = sessionStorage.getItem('kakao_profile');
      this.basic_profileShow = false ;
    }
  },
  data() {
    return{
      basic_profileShow : true,
      user_profile : '',
    }

  },
  components: {

  },
  methods: {



  },
}

</script>


<style scoped>
a {
  text-decoration: none;
}
#Mypage-component{
}
.my-profile{
  /*position: relative;*/
  float: left;
  /*padding-left: 0;*/
  /*margin-top: 150px;*/
  margin-left: 50px;
}
.mycontent{
  margin-top: 10px;
}
#wishlist{
  margin-top: 15px;
}
.profile_box {
  min-height: 250px;
  /*padding: 40px 0 30px;*/
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  background-color: lavender;
  width: 250px;
  padding: 30px;
  border-radius: 10px;
}
.mycontent{
  background-color: lavender;
  width: 250px;
  padding: 30px;
  border-radius: 10px;
}
#myprofile_li{
 width: 250px;
  margin-left: -50px;
}

</style>
