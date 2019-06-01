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

  router.get("/customer/allBalance", (ctx, next) => {
    console.log("/customer/allBalance", ctx.query);

    const cookies = ctx.cookies.get("token");
    if (cookies) {
      ctx.body = {
        data: {
          yes_profit: " +8,900.23 ",
          yes_unsettle: "4,500.23",
          all_money: "10000，000.00",
          all_profit: "+8965,000.00"
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
        msg: "请重新登录"
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
            profit: "+230"
          },
          {
            website: "yishengbo2",
            account: "shalina1992",
            balance: "1,7500",
            profit: "-230"
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
        msg: "请重新登录"
      };
    }
  });

  router.get("/customer/order/list", (ctx, next) => {
    console.log("/order/list", ctx.query);
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
        msg: "请重新登录"
      };
    }
  });

  app.use(router.routes()).use(router.allowedMethods());
};

module.exports = { routers };
