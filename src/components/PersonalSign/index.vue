<template>
  <div class="personal-white-wraper">
    <div class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">{{$i18n.translate('Registration Tips')}}</div>
        <p class="personal-content">1、{{$i18n.translate('Registration Tips info1')}}</p>
        <p class="personal-content">2、{{$i18n.translate('Registration Tips info2')}}</p>
        <p class="personal-content">3、{{$i18n.translate('Registration Tips info3')}}</p>
        <p class="personal-content">4、{{$i18n.translate('Registration Tips info4')}}</p>
      </div>
    </div>
    <div v-if="$route.params.type !== 'recharge'" class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">注册网址</div>
        <div class="personal-flex">
          <div
            @click="openModal(item)"
            class="personal-item"
            :key="i + 'key'"
            v-for="(item,i) in websiteObj"
          >{{item.website_name}}</div>
        </div>
      </div>
    </div>
    <confirm
      v-model="currentWebsiteVisile"
      :show-cancel-button="false"
      :title="website_name"
      @on-confirm="onConfirm"
    >
      <p class="personal-website-info">{{this.currentWebsite}}</p>
      <p style="text-align:center;">{{ $i18n.translate('website info') }}</p>
    </confirm>
    <div class="personal-wraper">
      <div class="personal-wraper-inner">
        <div class="personal-title">{{$i18n.translate('Registration guide')}}</div>
        <p class="personal-content">{{$i18n.translate('Registration guide info')}}</p>
        <group>
          <x-input :placeholder="$i18n.translate('Please enter')" is-type="email" v-model="mail"></x-input>
        </group>
        <x-button
          class="personal-btn"
          type="primary"
          @click.native="getInstruction"
        >{{$i18n.translate('Getting guide')}}</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton, cookie, Confirm } from "vux";
import Api from "../../service/PersonalSign";

export default {
  components: { Group, XInput, XButton, Confirm },
  data() {
    return {
      mail: "",
      websiteObj: [],
      currentWebsiteVisile: false,
      website_name: "",
      currentWebsite: ""
    };
  },
  methods: {
    openModal(item) {
      this.currentWebsiteVisile = true;
      this.website_name = item.website_name;
      this.currentWebsite = item.url;
    },
    onConfirm() {
      this.currentWebsiteVisile = false;
      this.website_name = "";
      this.currentWebsite = "";
    },
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
        mail: this.mail,
        nationality_id: this.$route.params.nationality_id
      };
      this.handleParams(params);
      Api.getInstruction(
        params,
        cookie.get("token"),
        this.$store.state.language
      )
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
        nationality_id: this.$route.params.nationality_id || ""
      };
      this.handleParams(params);
      Api.getWebsiteUrl(params, cookie.get("token"), this.$store.state.language)
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
    //现在把充值拆分出去了，需要整理todo
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
.personal-website-info {
  color: #0288d1;
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
