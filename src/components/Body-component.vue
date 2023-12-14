<template>
  <div id="Body-component">
    <!----------------------------- 첫번째 줄 컨텐츠 리스트 --------------------------------------->
    <div class="content-List">
      <b-card-group class="b-card">
<!--        {{listArray[0].content_name}}-->
<!--        {{paginatedData[0].content_name}}-->
       <span v-for="(p,idx) in paginatedData" v-bind:key="idx" style="margin-left: 0px;">
          <b-card
              v-bind:title="paginatedData[idx].content_name"
              v-bind:img-src="require('@/assets/images'+paginatedData[idx].image_path)"
              v-bind:key="idx"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem; margin-right:20px; border-radius: 20px; padding:20px;"
              class="mb-2">
            <hr>
            <b-card-text>
              <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; ">{{ paginatedData[idx].content_info }}</div>
              <div class="content_price" style="margin-top: 30px; font-size: 20px; font-weight: bold;">₩{{ paginatedData[idx].content_price | content_price}}</div>
            </b-card-text>
            <router-link v-bind:to="`/detailpage?content_no=${paginatedData[idx].content_no}`">
              <b-button variant="primary">예매하기</b-button>
            </router-link>
          </b-card>
       </span>
      </b-card-group>
    </div>


    <!-- paging 페이징 -->
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
</template>

<script scope>
export default {
  name: "Body-component",
  props : [
    'content_no', 'content_name', 'content_info', 'content_price',
    'content_capacity', 'content_yn', 'usr_id', 'image_path','contentlist_cnt', 'listArray',
  ],
  components: {

  },
  // filters: {
  //   content_price : function (value) {
  //     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   }
  // },
  data() {
    return {

      // 페이징 처리를 위한 데이터 ===========================
      // pageArray : [], // = listArray
      pageNum : 0,
      pageSize: this.pageSize,
      //===============================================
    }
  },
   mounted() {

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
  },
  // 페이징 처리를 위한 데이터 ===========================
  computed: {
    pageCount () {
      this.pageSize = 8;
      let listLeng = this.listArray.length,
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
      return this.listArray.slice(start, end);
    }
  },
  //===============================================
}

</script>

<style>
#Body-component{
  position: relative;
  margin-bottom: 10%;
  width: 100%;
}
.b-card{
  width: 1600px;
  margin-top: 15%;

}
.b-card img{
  min-width: 250px;
  max-width: 120%;
  min-height: 150px;
  max-height: 300px;
  height: 150px;
  display: block;
}
.btn-cover {
  width: 1350px;
}
/*.btn-cover .page-btn {*/
/*  width: 5rem;*/
/*  height: 2rem;*/
/*  letter-spacing: 0.5px;*/
/*}*/
/*.btn-cover .page-count {*/
/*  padding: 0 1rem;*/
/*}*/
</style>
