<template>
  <div id="Mypage-component">

    <ul class="my-profile">
      <li id="myprofile_li" style="list-style-type : none;">
          <div class="profile_box">
              <label for="profile">
              </label>
              <!--              <input type="file" name="profile_photo" id="profile_photo" accept="image/png, image/jpg, image/jpeg" class="f_hidden">-->
              <img width="100" height="100" alt="" src="https://cdn-icons-png.flaticon.com/512/860/860784.png">
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
    <!--    <div>-->
    <!--      <b-navbar toggleable="lg" type="dark" variant="info">-->
    <!--        <b-navbar-brand href="#">NavBar</b-navbar-brand>-->

    <!--        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->

    <!--        <b-collapse id="nav-collapse" is-nav>-->
    <!--          <b-navbar-nav>-->
    <!--            <b-nav-item href="#">Link</b-nav-item>-->
    <!--            <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
    <!--          </b-navbar-nav>-->

    <!--          &lt;!&ndash; Right aligned nav items &ndash;&gt;-->
    <!--          <b-navbar-nav class="ml-auto">-->
    <!--            <b-nav-form>-->
    <!--              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
    <!--              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
    <!--            </b-nav-form>-->

    <!--            <b-nav-item-dropdown text="Lang" right>-->
    <!--              <b-dropdown-item href="#">EN</b-dropdown-item>-->
    <!--              <b-dropdown-item href="#">ES</b-dropdown-item>-->
    <!--              <b-dropdown-item href="#">RU</b-dropdown-item>-->
    <!--              <b-dropdown-item href="#">FA</b-dropdown-item>-->
    <!--            </b-nav-item-dropdown>-->

    <!--            <b-nav-item-dropdown right>-->
    <!--              &lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
    <!--              <template #button-content>-->
    <!--                <em>User</em>-->
    <!--              </template>-->
    <!--              <b-dropdown-item href="#">Profile</b-dropdown-item>-->
    <!--              <b-dropdown-item href="#">Sign Out</b-dropdown-item>-->
    <!--            </b-nav-item-dropdown>-->
    <!--          </b-navbar-nav>-->
    <!--        </b-collapse>-->
    <!--      </b-navbar>-->
    <!--    </div>-->

  </div>
</template>

<script scope>

export default {
  name: "Mypage-component",
  // mounted() {
  //
  // },
  // data() {
  //
  // },
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
