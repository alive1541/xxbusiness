const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const port = 3000;
const { routers } = require("./router.js");
const ips = "http://192.168.1.85:8080";

app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ips);
  ctx.set("Access-Control-Allow-Credentials", "true");
  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set(
    "Access-Control-Allow-Headers",
    "x-requested-with, accept, origin, content-type"
  );
  await next();
});
routers(app);

app.listen(port, () => {
  console.log(`mock server has started, listening port ${port}`);
});
