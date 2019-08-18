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
