import Vue from "vue";
import Router from "vue-router";
import ctx from "../main.js";
import LogIn from "@/components/Login/index";
import Base from "@/components/Base/index";
import Account from "@/components/Account/index";
import GetMoney from "@/components/GetMoney/index";
import Order from "@/components/Order/index";
import Message from "@/components/Message/index";
import Card from "@/components/Card/index";
import AutoSign from "@/components/AutoSign/index";
import AutoSignResult from "@/components/AutoSignResult/index";
import PersonalSign from "@/components/PersonalSign/index";
import PersonalRecharge from "@/components/PersonalRecharge/index";
import { handleTabbarAndRoute } from "../assets/util";

Vue.use(Router);

let route = new Router({
  routes: [
    {
      path: "/",
      component: LogIn
    },
    {
      path: "/login",
      name: "LogIn",
      name_ch: "登陆",
      component: LogIn
    },
    {
      path: "/page",
      name: "Page",
      component: Base,
      children: [
        {
          path: "account",
          name: "Account",
          component: Account
        },
        {
          path: "getMoney",
          name: "GetMoney",
          component: GetMoney
        },
        {
          path: "order",
          name: "Order",
          component: Order
        },
        {
          path: "message",
          name: "Message",
          component: Message
        },
        {
          path: "card",
          name: "Card",
          component: Card
        },
        {
          path: "autoSign",
          name: "AutoSign",
          component: AutoSign
        },
        {
          path: "autoSignResult",
          name: "AutoSignResult",
          component: AutoSignResult
        },
        {
          path: "personalSign",
          name: "PersonalSign",
          component: PersonalSign
        },
        {
          path: "PersonalRecharge",
          name: "PersonalRecharge",
          component: PersonalRecharge
        }
      ]
    }
  ]
});

route.beforeEach((to, from, next) => {
  // console.log("to", to);
  // console.log("from", from);
  // console.log("next", next);
  handleTabbarAndRoute(to.name, ctx);
  next();
});

export default route;
