const Router = require("koa-router");
const router = new Router();

const routers = app => {
  router.get("/login", (ctx, next) => {
    console.log("/login", ctx.query);
    if (Math.random() > 0.5) {
      ctx.body = {
        errorCode: 1,
        msg: "账户错误",
        flag: true
      };
    } else {
      ctx.body = {
        errorCode: 0,
        msg: "登录成功",
        owner_id: "testownerId-----",
        flag: true,
        token: "woshitoken-test"
      };
    }
  });

  router.get("/customer/assets", (ctx, next) => {
    console.log("/customer/assets", ctx.query);

    const cookies = ctx.cookies.get("token");
    if (cookies) {
      ctx.body = {
        data: {
          all_assets: "all_assets",
          all_balance: "all_balance",
          all_unsettle: "all_unsettle",
          all_deposit: "all_deposit",
          all_withdrawals: "all_withdrawals",
          all_profit: "all_profit",
          yes_profit: "yes_profit"
        },
        flag: true,
        errorCode: 0,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        data: [],
        flag: true,
        errorCode: 1,
        msg: "请求非法"
      };
    }
  });

  router.get("/customer/websiteBalance", (ctx, next) => {
    console.log("/customer/websiteBalance", ctx.query);
    const cookies = ctx.cookies.get("token");
    if (cookies) {
      ctx.body = {
        data: [
          {
            website: "yishengbo1",
            account: "shalina1992",
            balance: "1,7300",
            yes_profit: "+230",
            is_online: 0
          },
          {
            website: "yishengbo2",
            account: "shalina1992",
            balance: "1,7500",
            yes_profit: "-230",
            is_online: 1
          }
        ],
        flag: true,
        errorCode: 0,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        data: [],
        flag: true,
        errorCode: 1,
        msg: "请求非法"
      };
    }
  });

  router.get("/customer/account/turn_website_status", (ctx, next) => {
    console.log("/customer/account/turn_website_status", ctx.query);
    const cookies = ctx.cookies.get("token");
    if (cookies) {
      ctx.body = {
        flag: true,
        errorCode: 0,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        data: [],
        flag: true,
        errorCode: 1,
        msg: "请求非法"
      };
    }
  });

  router.get("/customer/notice_msg/list", (ctx, next) => {
    console.log("/notice_msg/list", ctx.query);
    const cookies = ctx.cookies.get("token");
    if (cookies) {
      ctx.body = {
        data: [{ notice_msg: "yishengbo" }, { notice_msg: "yishengbo" }],
        flag: true,
        errorCode: 0,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        data: [],
        flag: true,
        errorCode: 1,
        msg: "请求非法"
      };
    }
  });

  router.get("/customer/show_owner_info", (ctx, next) => {
    console.log("/customer/show_owner_info", ctx.query);
    const cookies = ctx.cookies.get("token");
    const ifAutoOnline = global.ifAutoOnline;
    console.log("ifAutoOnline", ifAutoOnline);
    if (cookies) {
      ctx.body = {
        data: { on_auto_online: ifAutoOnline || 0 },
        flag: true,
        errorCode: 0,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        data: [],
        flag: true,
        errorCode: 1,
        msg: "请求非法"
      };
    }
  });

  router.get("/customer/auto_online", (ctx, next) => {
    console.log("/customer/auto_online", ctx.query);
    const ifAutoOnline = ctx.query.auto_online;
    const cookies = ctx.cookies.get("token");
    if (cookies) {
      global.ifAutoOnline = ifAutoOnline;
      ctx.body = {
        flag: true,
        errorCode: 0,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        data: [],
        flag: true,
        errorCode: 1,
        msg: "请求非法"
      };
    }
  });

  router.get("/customer/order/list", (ctx, next) => {
    console.log("/customer/order/list", ctx.query);
    const cookies = ctx.cookies.get("token");
    if (cookies) {
      ctx.body = {
        data: [
          {
            order_id: "1",
            website: "1",
            account: "shalina1992",
            balance: "1,7300",
            profit: "+230",
            is_unilateral: 0
          },
          {
            order_id: "1",
            website: "1",
            account: "shalina1992",
            balance: "1,7300",
            profit: "+230",
            is_unilateral: 0
          },
          {
            order_id: "2",
            website: "2",
            account: "shalina1992",
            balance: "1,7300",
            profit: "+230",
            is_unilateral: 1
          },
          {
            order_id: "3",
            website: "3",
            account: "shalina1992",
            balance: "1,7300",
            profit: "+230",
            is_unilateral: 0
          },
          {
            order_id: "3",
            website: "3",
            account: "shalina1992",
            balance: "1,7300",
            profit: "+230",
            is_unilateral: 0
          }
        ],
        flag: true,
        errorCode: 0,
        msg: "请求成功"
      };
    } else {
      ctx.body = {
        data: [],
        flag: true,
        errorCode: 1,
        msg: "请求非法"
      };
    }
  });

  app.use(router.routes()).use(router.allowedMethods());
};

module.exports = { routers };
