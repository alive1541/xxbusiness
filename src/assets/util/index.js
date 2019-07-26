export const handleTabbarAndRoute = (route, ctx) => {
  const routeMap = ["Account", "GetMoney", "Order", "Message", "Card"];
  if (ctx) {
    ctx.$store.dispatch("setCurrentRoute", route);
    if (!routeMap.includes(route)) {
      ctx.$store.dispatch("updateRefresh", false);
      ctx.$nextTick(() => {
        ctx.$store.dispatch("updateRefresh", true);
      });
    }
  }
};
