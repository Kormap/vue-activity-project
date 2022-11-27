<template>
  <div id="Main-page">

    <div id="Navcomponent" style="margin-top: 40px; margin-left: 40px;" @click="categoryMainList()">
      <Nav></Nav>
    </div>
    <br><br>


    <div id="Searchcomponent">
      <Searchcomponent v-on:searchContent="searchContent">
      </Searchcomponent>
    </div>


    <div id="Bodycomponent">
      <Bodycomponent :listArray="pageArray">
      </Bodycomponent>
    </div>

    <!-- 상단으로 이동하기 버튼 -->
    <a href="#" class="btn_gotop">
        <span class="glyphicon glyphicon-chevron-up">
          <i class="fa-solid fa-arrow-up"></i>
        </span>
    </a>

  </div>
</template>


<script scope>
import Nav from "@/components/Nav-component";
import Searchcomponent from "@/components/Search-component";
import Bodycomponent from "@/components/Body-component";
import axios from "axios";

export default {
  name: "Main-page",
  components: {
/*    Header,*/
    Nav,
    Searchcomponent,
    Bodycomponent,
  },
  data() {
    return{
      // // 페이징 처리를 위한 데이터 ===========================
      pageArray : [], // = listArray
      // //===============================================
      content_no : [],
      content_name : [],
      content_info : [],
      content_price : [],
      content_capacity : [],
      content_yn : [],
      usr_id : [],
      image_path : [],
      contentlist_cnt : this.contentlist_cnt,
      searchText : this.searchText,
      Query_category_no : this.Query_category_no,
    }
  },
  mounted() {
    this.getCategory_no();
    if(this.Query_category_no==null){
      this.contentMainList();
    }
    if(!(this.Query_category_no==null)){
      this.categoryMainList();
    }
  },
  methods : {
    //컨텐츠 컨텐츠 리스트, 타이틀 이미지리스트 가져오기
    contentMainList() {
      axios.get('/api/content/mainlist')
          .then(res => {
            for(let i = 0; i < res.data.length; i++) {
              this.content_no.push(res.data[i].content_no);
              this.content_name.push(res.data[i].content_name);
              this.content_info.push(res.data[i].content_info);
              this.content_price.push(res.data[i].content_price);
              this.content_capacity.push(res.data[i].content_capacity);
              this.content_yn.push(res.data[i].content_yn);
              this.usr_id.push(res.data[i].usr_id);
              this.image_path.push(res.data[i].image_path);
            }
            this.contentlist_cnt = res.data.length;
            this.pageArray = res.data;
            console.log(res.data);
          }).catch(err => {
      })
    },
    //카테고리 (Nav -> mainpage) 라우터 이용
    getCategory_no() {
      this.Query_category_no = this.$route.query.category_no;
    },
    //쿼리로 담아온 카테고리 번호를 통해 조회
    categoryMainList(){
      const category_no = this.$route.query.category_no;
      if(!(category_no==null)){
        axios.post('api/content/detailcategory', {category_no : category_no} )
            .then(res => {
              //mainlist 컨텐츠 초기화 후 조회
              this.content_no = [];
              this.content_name = [];
              this.content_info = [];
              this.content_price = [];
              this.content_capacity = [];
              this.content_yn = [];
              this.usr_id = [];
              this.image_path = [];
              this.contentlist_cnt = 0;

              for(let i = 0; i < res.data.length; i++) {
                this.content_no.push(res.data[i].content_no);
                this.content_name.push(res.data[i].content_name);
                this.content_info.push(res.data[i].content_info);
                this.content_price.push(res.data[i].content_price);
                this.content_capacity.push(res.data[i].content_capacity);
                this.content_yn.push(res.data[i].content_yn);
                this.usr_id.push(res.data[i].usr_id);
                this.image_path.push(res.data[i].image_path);
              }
              // 페이징 처리를 위한 데이터 ===========================
              this.pageArray = res.data;
              // ==============================================
            }).catch(err => {
          alert("카테고리별 선택을 다시 시도해주세요");
        })
      }
    },
    searchContent : function (searchText) {
      this.searchText = searchText;
      axios.post('api/content/search',{searchText})
          .then(res => {
            //mainlist 컨텐츠 초기화 후 조회
            this.content_no = [];
            this.content_name = [];
            this.content_info = [];
            this.content_price = [];
            this.content_capacity = [];
            this.content_yn = [];
            this.usr_id = [];
            this.image_path = [];
            this.contentlist_cnt = 0;

            for(let i = 0; i < res.data.length; i++) {
              this.content_no.push(res.data[i].content_no);
              this.content_name.push(res.data[i].content_name);
              this.content_info.push(res.data[i].content_info);
              this.content_price.push(res.data[i].content_price);
              this.content_capacity.push(res.data[i].content_capacity);
              this.content_yn.push(res.data[i].content_yn);
              this.usr_id.push(res.data[i].usr_id);
              this.image_path.push(res.data[i].image_path);
            }
            this.contentlist_cnt = res.data.length;
            // 페이징 처리를 위한 데이터 ===========================
            this.pageArray = res.data;
            if(this.contentlist_cnt == 0){
              alert("검색 결과가 존재하지 않습니다.");
              this.contentMainList();
            }
          }).catch(err => {
            alert("다시 검색해주세요");
      })
    },
  },
}

</script>

<style>

#Searchcomponent{
  width: 1600px;
  height: 100%;
}
#Bodycomponent{
  position: relative;
  margin-top: 450px;
  margin-left: 8%;
}
#Searchcomponent{
  margin-top: -5px;
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
