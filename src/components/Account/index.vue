<template>
  <div>
    <userInfo/>
    <websiteInfo/>
  </div>
</template>

<script>
import UserInfo from "./unit/userInfo";
import WebsiteInfo from "./unit/websiteInfo";

export default {
  components: {
    UserInfo,
    WebsiteInfo
  },
  data() {
    return {};
  },
  methods: {
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
  }
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
