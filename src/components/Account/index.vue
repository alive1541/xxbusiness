<template>
  <div class="box-wraper">
    <!-- <x-header title="账户" :left-options="leftOp">
      <div class="title">
        账户
        <span class="logout" @click="logout">退出</span>
      </div>
    </x-header>-->
    <userInfo/>
    <!-- <actionsheet v-model="logoutInfoVisible" :menus="menus" show-cancel @on-click-menu="submit"></actionsheet> -->
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
    return {
      // leftOp: { showBack: false },
      // logoutInfoVisible: false,
      // menus: [
      //   {
      //     label: `确定咩?<br/><span style="color:#666;font-size:12px;">确定退出${
      //       this.$store.state.title
      //     }</span>`,
      //     type: "info"
      //   },
      //   {
      //     label: "确定",
      //     type: "warn",
      //     value: "ok"
      //   }
      // ]
    };
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
