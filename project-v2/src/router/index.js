import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    hidden: true,
    component: () => import("@/views/MyLogin.vue"),
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/views/MyLogin.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    hidden: true,
    component: () => import("@/views/NotFound.vue"),
  },
  // 学生
  {
    path: "/home",
    name: "学生管理",
    iconClass: "fa fa-users",
    redirect: "/home/student",
    component: () => import("@/views/MyHome.vue"),
    children: [
      {
        path: "/home/student",
        name: "学生列表",
        iconClass: "fa fa-list",
        component: () => import("@/components/students/StudentList"),
      },
      {
        path: "/home/info",
        name: "信息列表",
        iconClass: "fa fa-list-alt",
        component: () => import("@/components/students/InfoList"),
      },
      {
        path: "/home/infos",
        name: "信息管理",
        iconClass: "fa fa-list-alt",
        component: () => import("@/components/students/InfoLists"),
      },
      {
        path: "/home/work",
        name: "作业列表",
        iconClass: "fa fa-list",
        component: () => import("@/components/students/WorkList"),
      },
      {
        path: "/home/works",
        name: "作业管理",
        iconClass: "fa fa-th-list",
        component: () => import("@/components/students/WorkMent"),
      },
    ],
  },
  // 数据
  {
    path: "/home",
    name: "数据分析",
    iconClass: "fa fa-bar-chart",
    component: () => import("@/views/MyHome.vue"),
    children: [
      {
        path: "/home/dataview",
        name: "数据概览",
        iconClass: "fa fa-line-chart",
        component: () => import("@/components/dataAnalysis/DataView"),
      },
      {
        path: "/home/mapview",
        name: "地图概览",
        iconClass: "fa fa-line-chart",
        component: () => import("@/components/dataAnalysis/MapView"),
      },
      {
        path: "/home/travel",
        name: "旅游地图",
        iconClass: "fa fa-line-chart",
        component: () => import("@/components/dataAnalysis/TravelMap"),
      },
      {
        path: "/home/score",
        name: "分数地图",
        iconClass: "fa fa-line-chart",
        component: () => import("@/components/dataAnalysis/ScoreMap"),
      },
    ],
  },
  // 用户中心
  {
    path: "/user",
    name: "用户中心",
    iconClass: "fa fa-user",
    component: () => import("@/views/MyHome.vue"),
    children: [
      {
        path: "/users/user",
        name: "权限管理",
        iconClass: "fa fa-user",
        component: () => import("@/components/users/UsersView"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
