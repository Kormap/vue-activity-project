<template>
  <div id="Reservationcheck-page">
<NavComponent/>


    <div id="reservationBox" >
    <p style="text-align: center; font-size: 40px; font-weight: bold">예매확인페이지</p>

      <img id="titleImg" v-bind:src="require('/Users/donghyeok/Desktop/My/Virtual Machine/Upload'+$route.params.title_image)">
      <div id="text">
        <div class="text">컨텐츠명: {{ $route.params.content_name }}</div>
        <div class="text">예약날짜: {{ $route.params.selectDate }}</div>
        <div class="text">선택 옵션: {{ $route.params.selectOption }}</div>
        <div class="text">인원 수: {{ $route.params.people_count }}  인</div>
        <div class="text">예약 금액: {{ $route.params.r_price }} 원</div>
        <div style="display: none">컨텐츠번호 {{ $route.params.Query_content_no }}</div>
      </div>

      <b-button variant="danger"
                style="color:white; font-weight: bold; padding: 10px 30px 10px 30px; margin-top: 30px;"
                @click="postReservationInfo"
      >
        예약하기
      </b-button>

    </div>




  </div>
</template>

<script>


import NavComponent from "@/components/Nav-component";
import axios from "axios";
import router from "@/router";
export default {
  name: "Reservationcheck-page",
  components: {
    NavComponent

  },
  data() {
    return {
      content_name : this.$route.params.content_name,
      selectDate : this.$route.params.selectDate,
      selectOption : this.$route.params.selectOption,
      people_count : this.$route.params.people_count,
      r_price : this.$route.params.r_price,
      content_no : this.$route.params.Query_content_no,
    }
  },
  mounted() {
    this.contentNullcheck();
  },
  methods : {
    contentNullcheck() {
      if(this.content_no==null){
        alert("오류: 다시 예매 부탁드립니다.");
        window.location.href = "/mainpage";
      }
    },
    postReservationInfo() {
      // const content_name = this.content_name;
      // const selectDate = this.selectDate;
      // const selectOption = this.selectOption;
      // const people_count = this.people_count;
      // const r_price = this.r_price;

      const reservation_info = new Object();
      // reservation_info.r_no = null;
      reservation_info.r_time = this.selectDate; //r_time
      reservation_info.r_peopleCount = this.people_count; //r_peopleCount
      reservation_info.r_price = this.r_price; //r_price
      reservation_info.r_option = this.selectOption; //r_option
      reservation_info.r_status_yn = "Y";
      reservation_info.user_email = sessionStorage.getItem('user_email');
      reservation_info.content_no = this.content_no;
      axios.post('api/reservation/insert',reservation_info)
          .then(res => {
            alert("예약 성공");
            router.push('/mainpage');
          }).catch(err =>{
            alert("예약에 실패하였습니다. 다시 시도해주세요");
      })
    }

  },
}

</script>

<style scoped>
#reservationBox{
  width: 1100px;
  height: 700px;
  margin-left: 200px;
  margin-top: 100px;
  /*margin-top: 200px;*/
  /*background-color: lightgrey;*/
  position: relative;
  border : 3px solid #889fb9;
  /*border-top-style: groove;*/
}
#titleImg{
  width: 750px;
  float: left;
  margin-top: 100px;
  overflow: hidden;
}
#text{
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 100px;
}
.text{
  margin-top: 40px;
}
</style>