<template>

  <div id="Calendar-component">
    <h5>예약 날짜</h5>

    <div @click="selectDate">
      <DatePicker
          locale="kr"
          color="red"
          v-model="date"
          :minDate="`${this.setminDate}`"
          :model-config="{
                type: 'string',
                mask: 'YYYY-MM-DD',
              }"
          mode="date"
      >
      </DatePicker>
    </div>

    <br>

    <div id="dateConsole">
      <h6>선택 날짜</h6>
<!--      <input type="text" v-model="date" v-on:click="changeDate()"/>-->
       <div>
         {{date}}</div>
      <!--    v-model="endDate"
          @input="clickEndDate()"
          :model-comfig="modelConfig"
          is-required
          :style="{display:isShowEndCalendar}"
          style="z-index:1"-->
    </div>



  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
/*import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';*/


export default {
  name: "Calendar-component",
  data() {
    return {
      date: '',
      isdateShow: true,
      setminDate : '',
    }
  },
  components: {
    DatePicker
  },
  mounted() {
    this.selectDate();
  },
  methods: {
    selectDate(){
      this.$emit('selectDate',this.date);
      this.setminDate = new Date().toLocaleDateString();
    }

  }

}
</script>

<style scoped>
#Calendar-component{
  text-align: left;
}
#dateConsole{
  margin-left: 300px;
  margin-top: -200px;
  margin-bottom: 200px;
}

</style>