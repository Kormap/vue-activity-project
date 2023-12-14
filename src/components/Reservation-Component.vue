<template>
<!--상위컴포넌트 : Detail-vue page / 하위컴포넌트 : Calendar-component -->
  <div id="Reservation-Component">

        <h3>날짜 및 인원 선택</h3>

        <div id="Calendar">
      <!--  이용 가능 날짜 확인하기 토글형식 -->
          <b-button variant="danger" style="color:white; font-weight: bold" @click="isShow= !isShow">이용가능 날짜 확인하기</b-button>
          <p></p>
          <p v-if="isShow">
            <Calendar-component v-on:selectDate="selectDate" />
          </p>

        </div>

        <hr>

    <!--   옵션 선택 토글     -->
    <div>옵션을 선택하세요.</div>
    <div>선택옵션 : {{ selectOption }}</div>
    <div id="btn-group">
      <b-button-group vertical>

        <div v-for="(opt,idx) in options_list"
              :key="opt.name"
              :class="opt.state ? 'checked' : 'notchecked'"
        >
          <input type="radio" class="btn-check" autocomplete="off" name="options" :id="`${opt.name}`" :for="`${opt.name}`">
          <label class="btn btn-outline-danger" @click="[ clickedOption(idx) ]"
                 style="font-weight: bold; margin-bottom: 15px; border-radius: 5px;" :for="`${opt.name}`"
          >
            {{ opt.name }}
          </label>
<!--          <b-button-->
<!--            :pressed.sync="opt.state"-->
<!--            variant="outline-danger"-->
<!--            @click="[ clickedOption(idx) , changeCheck(idx) ]"-->
<!--            style="font-weight: bold; margin-bottom: 15px; border-radius: 5px;">-->
<!--            {{ opt.name }}-->
<!--          </b-button>-->
        </div>
      </b-button-group>
<!--      <p>States: <strong>{{ btnStates }}</strong></p>-->
    </div>
        <div id="peopleCount">
            <span style="font-size: 22px">인원</span>
            <div id="count_adjust">
              <span class="count_adjust">
              <font-awesome-icon :icon="['fas','minus']" class="price_right0" @click="minuspeople_cnt(), people_count()"/>
              <span class="price_right" > {{people_cnt}} </span>
              <font-awesome-icon :icon="['fas','plus']" class="price_right2" @click="pluspeople_cnt(), people_count()"/>
              </span>
              <span class="price_right3" v-if="people_cnt==0"> ₩ {{ content_price }}</span>
              <span class="price_right3" v-if="!(people_cnt==0)"> ₩ {{ content_price*people_cnt | content_price }}</span>
             </div>
        </div>
        <div id="reservation_btn" style="text-align: right; margin-top: -55px; margin-right: -5px;">
          <span>
            <b-button variant="warning" style="color:white; font-weight: bold; padding: 10px 30px 10px 30px; margin-right:15px;"
                      @click="saveWishlist()" >
              장바구니
            </b-button>
          </span>
            <b-button variant="danger"
                      style="color:white; font-weight: bold; padding: 10px 30px 10px 30px;"
                      @click="countlimit()"
            >
              예약하기
            </b-button>
        </div>
    </div>
</template>





<script scope>
import CalendarComponent from "@/components/Calendar-component";
import axios from "axios";


export default {
  name: "Reservation-Component",
  components: {
      CalendarComponent,

  },
  props : [
    'content_price', 'content_capacity',
  ],
  data() {
    return {
      people_cnt : 0, //content_people 카운트
      isShow : false,
      pressed : false,
      myToggle: false,
      selectOption : this.selectOption,
      options_list:[],
      count : 0,
      r_price : this.r_price,
      selectDate1 : this.selectDate,
      // people_count : this.people_cnt,

    }
  },
  computed: {  //반응형 Getter : 메소드안의 값 변경 시 다시 계산하여 값 변경 및 캐싱
    btnStates() {

      return this.options_list.map(opt => opt.state);


    }
  },
  mounted() {
    this.ContentOption();
    // this.selectDate();
    // this.minuspeople_cnt();
    // this.pluspeople_cnt();
  },

  methods: {
    minuspeople_cnt : function (){
      this.people_cnt = this.people_cnt-1;

      if(this.people_cnt<0){
        this.people_cnt=0;
      }

      this.r_price = this.content_price*this.people_cnt;
      this.$emit('minuspeople_cnt',this.r_price);

    },

    pluspeople_cnt : function (){
      this.people_cnt = this.people_cnt+1;

      if(this.people_cnt>this.content_capacity){
        alert("제한된 수량입니다.");
        this.people_cnt=this.content_capacity;
      }

      this.r_price = this.content_price*this.people_cnt;
      this.$emit('pluspeople_cnt',this.r_price);
    },
    people_count : function (){
      this.$emit('people_count',this.people_cnt);
      if(!isNaN(this.content_price)){
        this.r_price = this.content_price*this.people_cnt;
      }
    },
    clickedOption(idx) {
      this.selectOption = this.options_list[idx].name;
      this.$emit('clickedOption', this.selectOption);

    },
    ContentOption() {
      const Query_content_no = this.$route.query.content_no;
      axios.post('/api/content/option',
                {Query_content_no})
          .then(res => {
            for(let i=0; i<res.data.length; i++){
              this.options_list.push({
                name : res.data[i].option_name,
                state : false
              });
              this.buttons = res.data.length;
            }

          }).catch(err => {
      })
    },
    countlimit() {
      if(this.count>=2){
        alert("하나의 옵션만 선택해주세요");
        this.options_list.state = false;
        return false;
      }
      else if(this.selectOption==null){
        alert("옵션을 선택해주세요");
        return false;
      }else if(this.people_cnt<=0){  //people_cnt 인원 수 0 이하일때
        alert("인원을 조정해주세요");
        return false;
      }
      else if(this.selectDate1==""){
        alert("날짜를 확인해주세요");
      }
      else {
        if(this.isShow==false){
          alert("날짜를 확인해주세요");
          return false;
        }
        if(sessionStorage.getItem('user_email')==null && sessionStorage.getItem('kakao_email') ==null){
          alert("로그인 후 이용해주세요.");
          window.location.href = "/login";
          return false;
        }
       this.$emit('reservationNotnull',true);

      }
    },

    selectDate : function (selectDate) {
      this.$emit('selectDate1',selectDate);
    },

    saveWishlist() {
      const content_no = this.$route.query.content_no;

      //위시리스트 저장 일반/카카오 유저 분기 처리
      if(!(sessionStorage.getItem('user_email')==null))
        this.user_email = sessionStorage.getItem('user_email');

      if(!(sessionStorage.getItem('kakao_email')==null))
        this.user_email = sessionStorage.getItem('kakao_email');

      const wishlist_info = new Object();
      wishlist_info.content_no = content_no;
      wishlist_info.user_email = this.user_email;

      axios.post('/api/wishlist/insert', wishlist_info)
          .then(res => {
            if(!(res.data==0)){
              alert("이미 등록되어있는 위시리스트입니다.");
            }else {
            alert("위시리스트 저장 완료");
            }
          }).catch(err => {
            alert("위시리스트 저장 실패, 다시 시도해주세요");
      })
    }


    }
}

</script>





<style>
#Reservation-Component{
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 8%);
  padding: 40px;

}
#btn-group{
  padding: 30px;
}
#peopleCount{
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 8%);
  padding: 20px;
  width: 650px;
  height: 70px;
  background-color: #EEEFF1;

}
#count_adjust{
  margin-top: -30px;
}

.price_right0{
  margin-left: 300px;
  margin-top: 0px;
  width: 25px;
  height: 25px;
  background-color: lightgray;
  cursor: pointer;
  border-right: 3px;
  border-radius: 4px;
}
.price_right{
  margin-left: 15px;
  font-size: 22px;
}
.price_right2{
  margin-left: 15px;
  width: 25px;
  height: 25px;
  background-color: lightgray;
  cursor: pointer;
  border-right: 3px;
  border-radius: 4px;
}
.price_right3{
  margin-left: 40px;
  font-size: 22px;
}



</style>
