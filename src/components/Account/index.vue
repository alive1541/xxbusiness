<template>
  <div>
    <userInfo />
    <websiteInfo />
  </div>
</template>

<script>
import UserInfo from "./unit/userInfo";
import WebsiteInfo from "./unit/websiteInfo";
import qs from "qs";
import { cookie } from "vux";

export default {
  components: {
    UserInfo,
    WebsiteInfo
  },
  data() {
    return {};
  },
  methods: {
    init() {
      const query = location.href.split("?")[1];

      try {
        const { token, language } = qs.parse(query);
        if (token) {
          cookie.set("token", token);
        }
        if (language) {
          this.$store.dispatch("changeLanguage", language);
          this.$nextTick(() => {
            this.$i18n.set(language);
          });
        }
      } catch (e) {
        console.log(e);
      }
      // if (query) {
      //   token = query.split("=")[1];
      // }
      // if (token) {
      //   cookie.set("token", token);
      // }
    }
    // logout: function() {
    //   this.logoutInfoVisible = true;
    // },
    // submit(key, item) {
    //   console.log(key, item);
    //   if (key === "ok") {
    //     cookie.remove("token");
    //     this.$router.replace({ name: "LogIn" });
    //   }
    // }
  },
  beforeMount: function() {
    this.init();
  }
  // mounted: function() {
  //   this.init();
  // }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
// .logout {
//   position: absolute;
//   right: 15px;
//   margin: 0 5px 0 10px;
// }
.vux-demo {
  text-align: center;
}
</style>
