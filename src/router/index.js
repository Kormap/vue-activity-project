import Vue from 'vue';
import VueRouter from 'vue-router';
import loginpage from '../page/Login-page.vue';
import calendar from "@/components/Calendar-component";
import mainpage from "@/page/Main-page";
import nav from "@/components/Nav-component";
import Header from "@/components/Header";
import signuppage from "@/page/Signup-page";
import searchComponent from "@/components/Search-component";
import detailpage from "@/page/Detail-page";
import ReservationComponent from "@/components/Reservation-Component";
import testSpringboot from "@/page/Test-springboot";
import myprofilePage from "@/page/Myprofile-page";
import Myreservationinfo from "@/page/Myreservationinfo";
import ReservationcheckPage from "@/page/Reservationcheck-page";
import WishlistPage from "@/page/Wishlist-page";
import ImageSlide from "@/page/ImageSlide";



Vue.use(VueRouter);

export default new VueRouter({
    mode:'history', //해쉬값 제거 방식 : 도메인 주소 관련
    routes: [{
        path: '/',
        redirect: '/mainpage'
    }, {
        path: '/login',
        component:loginpage,
    }, {
        path: '/mainpage',
        component: mainpage,
    }, {
        path: '/signup',
        component: signuppage,
    },
        {
        path: '/detailpage',
        component: detailpage,
    },
        {
        path: '/detailpage?:content_no',
        component: detailpage,
    },{
            path: '/reservationcheck',
            component: ReservationcheckPage,
            name: 'Params',
            props: true,

    },{
            path: '/profile',
            component: myprofilePage,
        },{
            path: '/reservationinfo',
            component: Myreservationinfo,
        },{
            path: '/wishlist',
            component: WishlistPage,
        },


        {               //============ 확인용 컴포넌트들을 라우터 화 함 (삭제예정) ================
        path: '/calendar',
        component: calendar,
    }, {
        path: '/nav',
        component: nav,
    }, {
        path: '/',
        component: searchComponent,
    },{
        path: '/header',
        component: Header,
    }, {
        path: '/reservation',
        component: ReservationComponent,
    },

        //스프링부트 연동 테스트페이지 라우터
        {
            path: '/test',
            component: testSpringboot,
        },
        //이미지슬라이드 테스트용 path
        {
            path: '/image',
            component: ImageSlide,
        }
    ]
});
