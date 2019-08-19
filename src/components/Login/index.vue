<template>
  <div class="box-wraper">
    <h1 class="login-title">{{this.$store.state.title}}</h1>
    <group title="内部人员登录">
      <x-input title="登录账号" v-model="username" novalidate :icon-type="iconType1" :show-clear="true"></x-input>
      <x-input
        title="登录密码"
        type="password"
        v-model="password"
        novalidate
        :icon-type="iconType2"
        :show-clear="true"
      ></x-input>
    </group>
    <div class="login-btn">
      <p class="logon-info">{{infoMsg}}</p>
      <x-button type="primary" @click.native="login">登录</x-button>
    </div>
  </div>
</template>



<script>
import { XInput, XButton, md5, cookie, XDialog, Radio } from "vux";
import Api from "@/service/Login";

export default {
  components: {
    XInput,
    XButton,
    XDialog,
    Radio
  },
  data() {
    return {
      username: "",
      password: "",
      iconType1: "",
      iconType2: "",
      infoMsg: ""

      // dialogStatus: false,
      // value: "zh-CN",
      // options: ["zh-CN", "en"]
    };
  },
  methods: {
    // check(value, label) {
    //   this.$nextTick(() => {
    //     this.$i18n.set(value);
    //   });
    //   // this.dialogStatus = false;
    // },
    async login() {
      const ifAccess = this.validate();
      if (!ifAccess) return;
      Api.login({
        user_name: this.username,
        passwd: md5(this.password)
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const {
              data: { token }
            } = res;
            cookie.set("token", token);
            this.$router.replace({ path: "/page/account" });
          } else {
            return (this.infoMsg = res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    validate() {
      if (this.username.length === 0) {
        this.infoMsg = "账号不能为空";
        this.iconType1 = "error";
        return false;
      }
      if (this.password.length === 0) {
        this.infoMsg = "密码不能为空";
        this.iconType2 = "error";
        return false;
      }
      this.infoMsg = "";
      this.iconType1 = "";
      this.iconType2 = "";
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.login-title {
  margin: 60px 0 45px 0;
  text-align: center;
}
.login-header {
  font-size: 16px;
}
.logon-info {
  margin: 10px 0;
  color: red;
  font-size: 14px;
}
.login-btn {
  width: 94%;
  margin: 20px auto;
}
</style>
