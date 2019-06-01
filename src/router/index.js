import Vue from "vue";
import Router from "vue-router";
import LogIn from "@/components/Login/index";
import Base from "@/components/Base/index";
import Account from "@/components/Account/index";
import Order from "@/components/Order/index";
import Message from "@/components/Message/index";
import Card from "@/components/Card/index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: LogIn
    },
    {
      path: "/login",
      name: "LogIn",
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
        }
      ]
    }
  ]
});
