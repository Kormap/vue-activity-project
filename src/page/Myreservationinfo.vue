<template>
  <div id="Myreservation_info">
    <div id="allImageContainer">
        <img class="reservationContainer" src="https://ifh.cc/g/4qHBSy.jpg">
        <span class="container_msg"> 예약 내역 </span>
      <div id="Nav">
        <NavComponent style="margin-top: -250px;"></NavComponent>
      </div>
      <div id="MypageComponent">
        <MypageComponent></MypageComponent>
      </div>
    </div>

    <div v-if="!isShow" style="margin-top: 300px;">
      <h2> 예약내역이 존재하지 않습니다.</h2>
    </div>

    <div id="reservationbox" v-if="isShow">
      <table  width="100%" height="100%"
                    style="border-radius: 5px; border-color: white;
                           border-collapse: collapse;">
              <thead>
              <tr text-align="center" >
                <th v-for="(title,idx) in fields"
                    v-bind:key="idx">
                   {{fields[idx]}}
                </th>
              </tr>
              </thead>
              <tbody>
              <!--  예약상태가 Y(정상) 인 경우   -->
              <tr text-align="center" background-color="white" id="normal_reseravation"
                  style="border: 1px solid #b3b3b3;"
                  v-for="(reservation,idx) in paginatedData"
                  v-bind:key="idx" v-if="paginatedData[idx].r_status_yn=='Y'">
               <td style="background-color: white; width: 100px;
                          border: 1px solid #b3b3b3;">
                {{paginatedData[idx].r_no}}
               </td>
                <td style="background-color: white; border: 1px solid #b3b3b3;" >
                  <router-link v-bind:to="`/detailpage?content_no=${paginatedData[idx].content_no}`"
                               style="font-size: 18px; text-decoration: none; color: #889fb9">
                {{paginatedData[idx].content_name}}
                  </router-link>
                </td>
                <td style="background-color: white; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_time}}
                </td>
                <td style="background-color: white; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_peoplecount}}
                </td>
                <td style="background-color: white; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_price | content_price}}
                </td>
                <td style="background-color: white; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_option}}
                </td>
                <td style="background-color: white; border: 1px solid #b3b3b3;">
                  <b-button  class="cancel_r_no"
                             :value="`${paginatedData[idx].r_no}`"
                             @click="cancelReservation(idx)">
                    예약취소
                  </b-button>
                </td>
                <!--  예약상태가 N(취소) 인 경우   -->
              <tr text-align="center" background-color="lightgrey" id="cancle_reseravation"
                  style="border: 1px solid #b3b3b3;"
                  v-for="(reservation,idx) in paginatedData"
                  v-bind:key="idx" v-if="paginatedData[idx].r_status_yn=='N'">
                <td style="background-color: lightgrey; width: 100px;
                          border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_no}}
                </td>
                <td style="background-color: lightgrey; border: 1px solid #b3b3b3;" >
                  <router-link v-bind:to="`/detailpage?content_no=${paginatedData[idx].content_no}`"
                               style="font-size: 18px; text-decoration: none; color: #889fb9">
                    {{paginatedData[idx].content_name}}
                  </router-link>
                </td>
                <td style="background-color: lightgrey; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_time}}
                </td>
                <td style="background-color: lightgrey; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_peoplecount}}
                </td>
                <td style="background-color: lightgrey; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_price | content_price}}
                </td>
                <td style="background-color: lightgrey; border: 1px solid #b3b3b3;">
                  {{paginatedData[idx].r_option}}
                </td>
                <td style="background-color: lightgrey; border: 1px solid #b3b3b3;">
                  <b-button  id="cancel_r_no" class="btn btn-danger"
                             :value="`${paginatedData[idx].r_no}`">
<!--                             @click="cancelReservation(idx)"-->
                    취소된 예약
                  </b-button>
                </td>
<!--                <td style="background-color: white; border: 1px solid #b3b3b3;">-->
<!--                 <button>{{reservation_list[idx].예약취소}}</button>-->
<!--                </td>-->
              </tr>
              </tbody>
            </table>
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
  mounted() {
    this.reservationinfo();
  },
  data() {
    return {
      // 페이징 처리를 위한 데이터 ===========================
      pageArray : [], // = listArray
      pageNum : 0,
      pageSize: this.pageSize,
      //===============================================
      fields: ['예약번호','컨텐츠명', '예약날짜','예약인원','예약가','예약옵션', '예약취소'],
      user_email : this.user_email,
      reservation_list : this.reservation_list,
      isShow : true,
    }
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

    reservationinfo(){
      if(sessionStorage.user_email == null && sessionStorage.kakao_email == null){
        alert("로그인 후 이용바랍니다.");
        window.location.href = "/login";
      }

      //예약내역 디스플레이 일반/카카오 유저 분기 처리
      if(!(sessionStorage.getItem('user_email')==null))
        this.user_email = sessionStorage.getItem('user_email');

      if(!(sessionStorage.getItem('kakao_email')==null))
        this.user_email = sessionStorage.getItem('kakao_email');

      axios.post('/api/reservation/infolist' , {user_email: this.user_email})
          .then(res => {
            this.reservation_list = [];
            for(let i=0; i<res.data.length; i++) {
              this.reservation_list.push({
                예약번호: res.data[i].r_no,
                컨텐츠명: res.data[i].content_name,
                예약시간: res.data[i].r_time,
                예약인원: res.data[i].r_peoplecount+" 명",
                예약가: res.data[i].r_price+" 원",
                예약옵션: res.data[i].r_option,
                예약취소 : res.data[i].r_status_yn,
              })
            }
            // 페이징 처리를 위한 데이터 ===========================
            this.pageArray = res.data;
            //===============================================
            if(this.reservation_list==''){
              this.isShow = false;
            }
          }).catch(err =>{
      })
    },
    cancelReservation(idx) {
      // var Cancel_r_no = document.getElementsByClassName("cancel_r_no")[0].getAttribute('name');
      const Cancel_r_no = this.reservation_list[idx].예약번호;
      axios.post('/api/reservation/cancel', {Cancel_r_no})
          .then(res => {
            alert("예약이 취소되었습니다.");
            window.location.href = "/reservationinfo";
          }).catch(err => {
            if(err==!null){
            alert("예약취소오류 , 다시 시도해주세요");
            }
      })
    },

  },
  // 페이징 처리를 위한 데이터 ===========================
  computed: {
    pageCount () {
      this.pageSize = 8;
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
      this.pageSize = 8;
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      return this.pageArray.slice(start, end);
    }
  },
  //===============================================
}

</script>

<style scoped>
#Myreservation_info{
  height: 900px;
}
#Nav{
  position: relative;
  margin-top: 150px;
  margin-left: 140px;
}
#MypageComponent{
  position: relative;
  margin-top: 200px;
}
.reservationContainer{
  margin-top: 5px;
  width: 1800px;
  height: 150px;
  /*overflow: auto;*/
  position: relative;
  top: 362px;
  transform: translate(-5%, -180%);
}
.container_msg{
  padding: 0px 20px;
  color: #f1ebf0;
  position: absolute;
  font-size: 40px;
  font-family: Monospace;
  /*text-align: center;*/
  margin-top: -30px;
  margin-left: -50px;
}
#reservationbox{
  width: 1100px;
  height: 475px;
  margin-left: 320px;
  /*margin-top: 200px;*/
  /*background-color: lightgrey;*/
  position: absolute;
  border : 1px solid #889fb9;
}
#pagingbox{
  position: relative;
  margin-top: 750px;
  margin-left: 200px;
}
#cancle_reseravation{
  background-color: #2c3e50;
}
</style>
