import qs from "qs";
import { cookie } from "vux";

export const handleTabbarAndRoute = (route, ctx) => {
  const routeMap = ["Account", "GetMoney", "Order", "Message", "Card"];
  if (ctx) {
    ctx.$store.dispatch("setCurrentRoute", route);
    sentRouteTitle(route, ctx);
    if (!routeMap.includes(route)) {
      ctx.$store.dispatch("updateRefresh", false);
      ctx.$nextTick(() => {
        ctx.$store.dispatch("updateRefresh", true);
      });
    }
  }
};

function sentRouteTitle(currentRoute, ctx) {
  const book = {
    GetMoney: "make money",
    Order: "Bets",
    Card: "Settings"
  };
  if (book[currentRoute]) {
    currentRoute = book[currentRoute];
  }
  ctx.$nextTick(() => {
    ctx.$store.dispatch("setRouteTitle", ctx.$i18n.translate(currentRoute));
  });
}

export const initFromOfficialWebsite = ctx => {
  const query = location.href.split("?")[1];
  try {
    const { token, language } = qs.parse(query);
    if (token) {
      cookie.set("token", token);
    }
    if (language) {
      console.log("language", language);

      ctx.$store.dispatch("changeLanguage", language);
      ctx.$nextTick(() => {
        ctx.$i18n.set(language);
      });
    }
  } catch (e) {
    console.log(e);
  }
};
