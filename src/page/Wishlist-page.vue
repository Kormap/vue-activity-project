<template>
  <div id="Wishlist-page">
    <div id="Nav-component" style="margin-top: 70px;">
      <Nav></Nav>
    </div>
    <div id="allImageContainer">
      <img class="wishlistContainer" src="https://ifh.cc/g/4qHBSy.jpg">
      <span class="container_msg"> 위시리스트 내역 </span>
      <div id="Nav">
        <NavComponent style="margin-top: -250px;"></NavComponent>
      </div>
      <div id="MypageComponent">
        <MypageComponent></MypageComponent>
      </div>
    </div>


<!--    <div v-if="!isShow" style="margin-top: 300px;">-->
<!--      <h2> 위시리스트 내역이 존재하지 않습니다.</h2>-->
<!--    </div>-->

    <div class="wishlistbox" v-if="isShow">
      <div class="wishlist" v-for="(wishlist,idx) in paginatedData" :key="idx">
        <img class="image_titleContainer" v-bind:src="require('@/assets/images'+paginatedData[idx].image_path)">
        <div id="wishlistbox_content">
          <hr>
          <p style="margin-top: 80px; font-size: 20px; font-weight: bold;">{{paginatedData[idx].content_name}}</p>
          <p>{{paginatedData[idx].content_price | content_price }} 원</p>
          <router-link v-bind:to="`/detailpage?content_no=${paginatedData[idx].content_no}`"
                       @click="goReservation()">
            <b-button  class="cancel_r_no" variant="danger"
                       :value="`${paginatedData[idx].content_no}`"
                       style="float: right; margin-top: -90px;">
              예약하러가기
            </b-button>
          </router-link>
          <b-button @click="deleteWishlist(idx)" style="float: right; margin-top: -40px;">
            위시리스트 삭제
          </b-button>
        </div>
      </div>
      <hr>
    </div>

    <!-- paging 페이징 -->
    <div id="pagingbox">
      <div class="btn-cover" style="margin-top: 100px; margin-right: 100px;">
        <b-button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
          이전
        </b-button>
        <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
        <b-button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
          다음
        </b-button>
      </div>
    </div>
  </div>
</template>

<script scope>
import MypageComponent from "@/components/Mypage-component";
import NavComponent from "@/components/Nav-component";
import axios from "axios";



export default {
  name: "Myreservation_info",
  components: {NavComponent, MypageComponent},
  data() {
    return {
      isShow : true,
      user_email : this.user_email,
      fields : [
                'content_no', 'content_name', 'content_info', 'content_price', 'content_capacity',
                'content_yn', 'usr_id', 'title_image', 'wishlist_no', 'user_email'
               ],
      wish_list : [],
      // 페이징 처리를 위한 데이터 ===========================
      pageArray : [], // = listArray
      pageNum : 0,
      pageSize: this.pageSize,
      //===============================================
    }
  },
  mounted() {
    this.getWishlist();
  },
  methods : {
    // 페이징 처리를 위한 데이터 ===========================
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
    //===============================================
    getWishlist() {

      if(sessionStorage.user_email == null && sessionStorage.kakao_email == null){
        alert("로그인 후 이용바랍니다.");
        window.location.href = "/login";
      }

      //예약내역 디스플레이 일반/카카오 유저 분기 처리
      if(!(sessionStorage.getItem('user_email')==null))
        this.user_email = sessionStorage.getItem('user_email');

      if(!(sessionStorage.getItem('kakao_email')==null))
        this.user_email = sessionStorage.getItem('kakao_email');

      axios.post('/api/wishlist/getwishlist', {user_email : this.user_email})
          .then(res => {
            for(let i=0; i<res.data.length; i++){
              this.wish_list.push({
                content_no : res.data[i].content_no,
                content_name : res.data[i].content_name,
                content_info : res.data[i].content_info,
                content_price : res.data[i].content_price,
                content_capacity : res.data[i].content_capacity,
                content_yn : res.data[i].content_yn,
                usr_id : res.data[i].usr_id,
                title_image : res.data[i].image_path,  // 데이터베이스 컬럼 : image_path
                wishlist_no : res.data[i].wishlist_no,
                user_email : res.data[i].user_email,
              })
            }
            // 페이징 처리를 위한 데이터 ===========================
            this.pageArray = res.data;
            //===============================================
          }).catch(err => {
      })
    },
    goReservation(idx){
      const content_no = this.wish_list[idx].content_no;
    },
    deleteWishlist(idx){
      const wishlist_no = this.wish_list[idx].wishlist_no;
      const content_no = this.wish_list[idx].content_no;
      const user_email = sessionStorage.getItem('user_email');

      const wishlist_info = new Object();
      wishlist_info.wishlist_no = wishlist_no;
      wishlist_info.content_no = content_no;
      wishlist_info.user_email = user_email;


      axios.post('/api/wishlist/deletewishlist', wishlist_info)
          .then(res => {
            alert("위시리스트 삭제 성공");
            window.location.href = "/wishlist";
          }).catch(err => {
            alert("다시 시도해주세요");
      })
    },
  },
  // 페이징 처리를 위한 데이터 ===========================
  computed: {
    pageCount () {
      this.pageSize = 3;
      let listLeng = this.pageArray.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      //카테고리를 옮길때 3페이지까지 존재하는 카테고리 - > 1페이지만 존재하는 카테고리로 Nav 이동 시
      // 3/1 페이지로 표시되는 것을 방지시킴
      if(((this.pageNum + 1)/page)>1){
        this.pageNum = 0;
      }

      return page;
    },
    paginatedData () {
      this.pageSize = 3;
      const start = this.pageNum * this.pageSize,
          end = start + this.pageSize;
      return this.pageArray.slice(start, end);
    }
  },
  //===============================================

}

</script>

<style scoped>
#Wishlist-page{
  height: 100%;
  margin-top: -80px;
}
.wishlist{
  margin-bottom: 80px;
}
#Nav{
  position: relative;
  margin-top: 150px;
}
#MypageComponent{
  position: relative;
  margin-top: 200px;
  /*height: 500px;*/
}
.wishlistContainer{
  width: 1800px;
  height: 150px;
  /*overflow: auto;*/
  position: relative;
  top: 362px;
  transform: translate(-5%, -180%);
}
.image_titleContainer{
  max-width: 350px;
  max-height: 500px;
  margin-top: 40px;
  float: left;
}
.container_msg{
  padding: 0px 20px;
  color: #f1ebf0;
  position: absolute;
  font-size: 40px;
  font-family: Monospace;
  /*text-align: center;*/
  margin-top: -30px;
  margin-left: -150px;


}
.wishlistbox{
  width: 1100px;
  height: 1000px;
  max-height: 2000px;
  margin-left: 300px;
  position: relative;
}
#Nav-component{
  margin-left: 200px;
}
#pagingbox{
  position: relative;
  margin-top: -350px;
  margin-left: 200px;
}
</style>
