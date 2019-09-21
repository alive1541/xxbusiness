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
          yes_profit: "yes_profit",
          updated_at: "1554048000000"
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

  router.get("/customer/order/history_list", (ctx, next) => {
    console.log("/customer/order/history_list", ctx.query);
    const cookies = ctx.cookies.get("token");
    if (cookies) {
      ctx.body = {
        errorCode: 0,
        flag: true,
        data: [
          {
            first_website: "1",
            second_website: "2",
            first_account: "2",
            second_account: "1",
            game_time: "3",
            host_team: "2",
            guest_team: "1",
            first_select_team: "2",
            second_select_team: "1",
            first_settle_amount: "2",
            second_settle_amount: "3",
            first_order_amount: "1",
            second_order_amount: "2",
            first_odds: "3",
            second_odds: "1",
            is_unilateral: 0,
            order_time: "1",
            profit: "2",
            first_settle_status: "3",
            second_settle_status: "1"
          }
        ]
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

  router.get("/customer/get_all_websites", (ctx, next) => {
    console.log("/customer/get_all_websites", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = {
      data: [
        {
          website_id: 4,
          nationality_id: 3,
          website_name: "平博",
          nationality_name: "印度尼西亚"
        },
        {
          website_id: 2,
          nationality_id: 1,
          website_name: "平博2",
          nationality_name: "印度尼西亚2"
        },
        {
          website_id: 4,
          nationality_id: 3,
          website_name: "平博",
          nationality_name: "印度尼西亚"
        }
      ],
      flag: true,
      errorCode: 0,
      msg: "请求成功"
    };
  });

  router.post("/customer/account_submit", (ctx, next) => {
    console.log("/customer/account_submit", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = { flag: true, errorCode: 0, msg: "操作成功" };
  });

  router.get("/customer/website_url", (ctx, next) => {
    console.log("/customer/website_url", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = {
      data: [
        { website_name: "平博1", url: "http://www.xxx.com/register" },
        { website_name: "平博2", url: "http://www.xxx.com/register" },
        { website_name: "平博3", url: "http://www.xxx.com/register" },
        { website_name: "平博4", url: "http://www.xxx.com/register" }
      ],
      flag: true,
      errorCode: 0,
      msg: "请求成功"
    };
  });

  router.get("/customer/instruction", (ctx, next) => {
    console.log("/customer/instruction", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = {
      flag: true,
      errorCode: 0,
      msg: "请求成功"
    };
  });

  router.get("/customer/register_filled_info_range", (ctx, next) => {
    console.log("/customer/register_filled_info_range", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = {
      msg: "操作成功",
      flag: true,
      errorCode: 0,
      data: {
        neighborhood_list: [
          {
            id: 1,
            value: "中国"
          },
          {
            id: 2,
            value: "印度尼西亚"
          },
          {
            id: 3,
            value: "越南"
          },
          {
            id: 4,
            value: "菲律宾"
          }
        ],
        nationality_list: [
          {
            id: 1,
            value: "中国"
          },
          {
            id: 2,
            value: "印度尼西亚"
          },
          {
            id: 3,
            value: "越南"
          },
          {
            id: 4,
            value: "菲律宾"
          }
        ],
        phone_prefix_list: [
          {
            id: 1,
            value: "+86"
          },
          {
            id: 2,
            value: "+62"
          },
          {
            id: 3,
            value: "+84"
          },
          {
            id: 4,
            value: "+63"
          }
        ]
      }
    };
  });

  router.post("/customer/register_websites", (ctx, next) => {
    console.log("/customer/register_websites", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = {
      flag: true,
      errorCode: 0,
      msg: "请求成功"
    };
  });

  router.get("/customer/register_info_list", (ctx, next) => {
    console.log("/customer/register_info_list", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = {
      msg: "操作成功",
      flag: true,
      errorCode: 0,
      data: [
        {
          website_name: "liji",
          phone_last_four: "9208",
          submit_time: "2019-07-25 10:28:41",
          status: 2,
          extra_info:
            '[{"keyName":"账号","value":"1123"},{"keyName":"密码","value":"1123"}]'
        },
        {
          website_name: "pinnacle",
          phone_last_four: "9208",
          submit_time: "2019-07-25 10:28:41",
          status: 1,
          extra_info: null
        },
        {
          website_name: "12bet",
          phone_last_four: "9208",
          submit_time: "2019-07-25 10:28:41",
          status: 1,
          extra_info:
            '[{"keyName":"账号","value":"1123"},{"keyName":"密码","value":"1123"},{"keyName":"密码22","value":"xxxxxx"}]'
        }
      ]
    };
  });

  router.get("/news/get_news_detail", (ctx, next) => {
    console.log("/news/get_news_detail", ctx.query);
    // const cookies = ctx.cookies.get("token");
    ctx.body = {
      code: 2000,
      msg: "",
      data: {
        news_id: 0,
        title:
          "文本我是新闻标题，我最多显示三行，我是印尼语的，文本我是新闻标题，我最多显示三",
        body:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean e<br/></p ><p><img src="http://img2.imgtn.bdimg.com/it/u=1290030057,1414681145&fm=26&gp=0.jpg" title="tu.jpg" alt="tu.jpg"/></p ><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p >',
        is_collected: true,
        comment_list: [
          {
            mail: "str",
            comment: "str",
            publish_time: 0
          }
        ],
        publish_time: "2019-11-29 14:49"
      }
    };
  });

  app.use(router.routes()).use(router.allowedMethods());
};

module.exports = { routers };
