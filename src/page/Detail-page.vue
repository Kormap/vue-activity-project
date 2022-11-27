<template>
  <div id="Detail-page">

    <div id="allcontentbox">
    <div id="Nav-component" style="margin-top: 70px;">
      <Nav></Nav>
    </div>
      <!-- 상단으로 이동하기 버튼 -->
      <a href="#" class="btn_gotop">
        <span class="glyphicon glyphicon-chevron-up">
          <i class="fa-solid fa-arrow-up"></i>
        </span>
      </a>
    <div id="title_image">
      <img class="image_titleContainer" v-bind:src="require('/Users/donghyeok/Desktop/My/Virtual Machine/Upload'+title_image)" alt=" " style="border-radius: 5px;">
    </div>
    <div id="smallbar">
      <a href="/mainpage/" style="text-decoration:none; color: darkslategray">
        Activity >
      </a>
      <a href="/tickets/" style="text-decoration:none; color: gray">
        {{ category_name }}
      </a>
    </div>
    <div id="content_group">
      <p class="content_title"> {{ content_name }} </p>

      <!-- 예약 컴포넌트 위치 -->
      <div id="content_price">
        <ReservationComponent :content_price="content_price"
                              :content_capacity="content_capacity"
                              v-on:minuspeople_cnt="minuspeople_cnt"
                              v-on:pluspeople_cnt="pluspeople_cnt"
                              v-on:clickedOption="clickedOption"
                              v-on:selectDate1="selectDate1"
                              v-on:people_count="people_count"
                              v-on:reservationNotnull="reservationNotnull"
        />
      </div>
      <router-link :to="{
                         name: 'Params',
                         params: {content_name: content_name, people_count: people_cnt ,r_price: r_price,
                         selectDate: selectDate, selectOption: selectOption, title_image: title_image,
                          }}"
                    @click="reservationNotnull"
      >
      </router-link>
        <br><br>
      <p class="content" style="white-space: pre-line; margin-bottom: 80px;"> {{ content_info }} </p>

    </div>
    <!--    ============== 컨텐츠 글에 디스플레이 할 이미지들 ====================    -->
    <div class="image_group">
        <div id="image1">
          <div v-for="(image, idx) in content_imagegroup" :key="idx" class="imageContainer">
            <img :src = "require('/Users/donghyeok/Desktop/My/Virtual Machine/Upload'+image)" alt="" style="max-width: 1000px; border-radius: 10px;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav-component";
import ReservationComponent from "@/components/Reservation-Component";
import axios from "axios";

const category1 = " ";
var Query_content_no = '';


export default {
  name: "Detail-page",
  components: {
    ReservationComponent,
    Nav,
  },

  data() {
    return {
      isShow1 : false,
      title_image : '',
      content_imagegroup : [],
      category1 : category1, //컨텐츠 카테고리(small bar)
      //컨텐츠 select 정보
      content_no : this.content_no,
      content_name : this.content_name, //content_name 컨텐츠 이름
      content_info : this.content_info, //content_info 컨텐츠 정보(내용)
      content_price : this.content_price,
      content_capacity : this.content_capacity,
      content_yn : this.content_yn,
      admin_email : this.admin_email,
      Query_content_no : this.Query_content_no,
      r_price : this.r_price,
      selectOption : this.selectOption,
      people_cnt : this.people_cnt,
      selectDate : this.selectDate,
      category_name : this.category_name,
    }
  },
  mounted() {
    this.Query_Content_no();
    this.contentInfo();
    this.contentImage();
    this.contentTitleImage();
  },

  methods : {
    //컨텐츠 정보
    contentInfo() {
      Query_content_no = this.$route.query.content_no;
      axios.post('api/content/info' ,
                {Query_content_no})
          .then(res =>{
            this.content_name = res.data.content_name;
            this.content_info = res.data.content_info;
            this.content_price = res.data.content_price;
            this.content_capacity = res.data.content_capacity;
            this.category_name = res.data.category_name; //카테고리 테이블 조인
            //엔터키 br 처리테스트
            let temp = this.content_info;
            temp = temp.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n');
            this.content_info = temp;
           scroll(0,0);
          }).catch(err => {
      });
    },
    //이미지 타이틀 이미지
    contentTitleImage() {
      this.Query_content_no = this.$route.query.content_no;
      axios.post('/api/content/titleimage',
                  {Query_content_no})
          .then(res => {
            this.title_image = res.data;

          }).catch(err => {
      });
    },
    //컨텐츠에 들어가는 이미지들
    contentImage()  {
      Query_content_no = this.$route.query.content_no;
      axios.post('api/content/image',
                    {Query_content_no})
          .then(res => {

          for(let i = 0; i < res.data.length; i++) {
            this.content_imagegroup.push(res.data[i].image_path);
          }
          }).catch(err => {
      });
    },
    //메인페이지 -> 상세페이지로 받은 Router query 파라미터 (컨텐츠번호) 스프링부트 전달
    Query_Content_no() {

      Query_content_no = this.$route.query.content_no;
      axios.post('api/content/queryno',
                {Query_content_no})
          .then(res => {
          }).catch(err =>{
      });
    },

    //ReservationComponent 상속 data
    minuspeople_cnt: function(r_price) {
      this.r_price = r_price;
    },
    pluspeople_cnt: function(r_price) {
      this.r_price = r_price;
    },
    clickedOption : function (selectOption){
      this.selectOption = selectOption;
    },
    selectDate1 : function (selectDate) {
      this.selectDate = selectDate;

    },
    people_count: function (people_cnt){
      this.people_cnt = people_cnt;
    },
    reservationNotnull: function (e){
      if(e==true){

        if(this.people_cnt == 0){
          alert("인원을 선택해주세요");
          return false;
        }
        if(this.selectDate==""){
          alert("날짜를 선택해주세요");
        }
        else if(!this.selectDate==""){
         this.$router.push({
          name: 'Params',
          params: {content_name: this.content_name, people_count: this.people_cnt ,r_price: this.r_price,
            selectDate: this.selectDate, selectOption: this.selectOption, title_image: this.title_image,
            Query_content_no : this.Query_content_no,
          }
        })
      }}
    },
  }
}

</script>

<style>
/* ============= id =========== */
#allcontentbox{
  margin-top: -30px;
}
#smallbar{
  text-align: left;
  margin-top: 20px;
  margin-left: 20%;
}
#Nav-component{
  margin-left: 100px;
}
#title_image{
  text-align: left;
  margin-left: 13%;
}
#content_group{
  text-align: left;
  margin-left: 20%;
  width: 1000px;
}
/* ============= Class =========== */
.image_titleContainer{
  width: 1200px;
  max-height: 800px;
}
.imageContainer{
  width: 1000px;
  margin-left: 7%;
}
.image_group{
  margin-left: 15%;
  width: 1080px;
  height: auto;
  /*overflow: hidden;*/
}
.content_title{
  font-size: 30px;
  line-height: 1.4;
}
.content{
  font-size: 20px;
}
a {
  color: inherit;
  cursor: pointer;
/*  text-decoration: none;*/
}
.btn_gotop {
  display: block;
  position: fixed;
  bottom: 35px;
  right: 30px;
  z-index: 999;
  border: 1px solid rgba(0,0,0,0.25);
  outline: none;
  background-color: white;
  color: rgba(0,0,0,0.7);
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 100%;
}

</style>
