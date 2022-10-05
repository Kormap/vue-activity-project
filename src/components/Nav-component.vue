<template>
  <div id="Nav-component">
    <div id="bootNav">
      <b-nav tabs fill align="center" style="position: relative; width: 1000px;" >
        <b-nav-item active @click="goHome()">카테고리 홈</b-nav-item>
        <b-nav-item active router-link
                    v-bind:to="`/mainpage?category_no=${category_list[idx].category_no}`"
                    v-for="(category,idx) in category_list"
                    v-bind:key="idx"
        >
          {{ category_list[idx].category_name }}
        </b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script scope>
import axios from "axios";

export default {
  name: "Nav-component",
  data() {
    return{
      category_list : [],
      category_no : this.category_no,

    }
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory(){
      axios.get('api/content/category')
          .then(res => {
            this.category_list = res.data;
            this.category_no = res.data.category_no; // for 문 필요
          }).catch(err => {
      })
    },
    goHome(){
      window.location.href = "/mainpage";
    }


  },
}

</script>

<style>
#Nav-component{
  /*background-color: white;*/
  display: flex;
  margin-top: 10px;


}

/*#nav{
  text-align: right;
}*/
#bootNav{
  background-color: white;
  border-radius: 0px;
  width: 1000px;
  margin-left: 150px;


}

</style>