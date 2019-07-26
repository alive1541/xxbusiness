<template>
  <div class="personal-white-wraper">
    <div class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">注册要点</div>
        <p class="personal-content">1、请一定要用真实的姓名、手机邮箱注册，否则将无法充值和提款</p>
        <p class="personal-content">2、注册时选择国家和货币请注意选择自己的真实国家和货币，否则注册完成后无法充值和提款</p>
        <p class="personal-content">3、多个网站的用户名尽量不要重复，避免被盗号撞库</p>
        <p class="personal-content">4、注册完成后一定要保存好自己的账号及密码还有相关的安全问题答案和安全码。这些都是提款时的必要素，丢失找回很麻烦且可能影响提款</p>
      </div>
    </div>
    <div v-if="$route.params.type !== 'recharge'" class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">注册网址</div>
        <div class="personal-flex">
          <a
            :href="item.url"
            class="personal-item"
            :key="i + 'key'"
            v-for="(item,i) in websiteObj"
          >{{item.website_name}}</a>
        </div>
      </div>
    </div>
    <div class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">注册指南</div>
        <p
          class="personal-content"
        >如果您注册某个网址时还有什么问题，可以提交您的邮箱，我们会把注册指南发到您的邮箱。查看我们的注册指南，注册指南详细描写了每个网站的注册流程，确保你顺利注册成功。</p>
        <group>
          <x-input placeholder="请输入邮箱地址" is-type="email" v-model="mail"></x-input>
        </group>
        <x-button class="personal-btn" type="primary" @click.native="getInstruction">获取指南</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, cookie } from "vux";
import Api from "../../service/PersonalSign";

export default {
  components: { Group, XInput, XButton },
  data() {
    return {
      mail: "",
      websiteObj: []
    };
  },
  methods: {
    handleParams(params) {
      console.log(111, this.$route.params.type);
      if (this.$route.params.type === "recharge") {
        params.type = 2;
        delete params.nationality_id;
      } else {
        params.type = 1;
      }
    },
    getInstruction() {
      if (this.mail === "") {
        return this.$vux.toast.text("请填写邮箱");
      }
      let params = {
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token"),
        mail: this.mail,
        nationality_id: this.$route.params.nationality_id
      };
      this.handleParams(params);
      Api.getInstruction(params)
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.$vux.toast.text(res.msg);
          } else {
            this.$vux.toast.text(res.msg);
          }
          this.mail = "";
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    getWebsiteUrl() {
      let params = {
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token"),
        nationality_id: this.$route.params.nationality_id || ""
      };
      this.handleParams(params);
      console.log(1111222, params);
      Api.getWebsiteUrl(params)
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.websiteObj = res.data;
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    check() {
      const id = this.$route.params.nationality_id;
      const type = this.$route.params.type;
      if (!type) {
        this.$router.replace({
          name: "GetMoney"
        });
      }
    }
  },
  mounted() {
    this.check();
    this.getWebsiteUrl();
  }
};
</script>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";
.personal-white-wraper {
  padding-bottom: 75px;
}
.personal-wraper {
  font-size: 14px;
  padding: 10px 0;
  width: 95%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: 0 2px 8px #e0e0e0;
  padding: 5px;
}
.personal-wraper-inner {
  padding: 15px;
}
.personal-title {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 10px;
}
.personal-content {
  margin-bottom: 5px;
}
.personal-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.personal-item {
  display: inline-block;
  padding: 10px 5px;
  margin: 10px 0;
  width: 70px;
  text-align: center;
  color: #673ab7;
  border: 2px solid #673ab7;
}
.personal-btn {
  margin: auto;
  margin-top: 25px;
}
</style>
