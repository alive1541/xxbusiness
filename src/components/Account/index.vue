<template>
  <div>
    <userInfo />
    <websiteInfo />
  </div>
</template>

<script>
import UserInfo from "./unit/userInfo";
import WebsiteInfo from "./unit/websiteInfo";
import { initFromOfficialWebsite } from "../../assets/util/index";

export default {
  components: {
    UserInfo,
    WebsiteInfo
  },
  data() {
    return {};
  },
  methods: {
    // init() {
    //   const query = location.href.split("?")[1];
    //   try {
    //     const { token, language } = qs.parse(query);
    //     if (token) {
    //       cookie.set("token", token);
    //     }
    //     if (language) {
    //       this.$store.dispatch("changeLanguage", language);
    //       this.$nextTick(() => {
    //         this.$i18n.set(language);
    //       });
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  },
  beforeMount: function() {
    initFromOfficialWebsite(this);
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
