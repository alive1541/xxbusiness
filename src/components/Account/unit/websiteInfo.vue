<template>
  <div class="website-wraper bottom-pad">
    <div class="titleBar">
      <button-tab>
        <button-tab-item :selected="selectedIndex === 0" @on-item-click="tabChange">
          <div class="titleBarTitle">{{$i18n.translate("Sort by site")}}</div>
        </button-tab-item>
        <button-tab-item :selected="selectedIndex === 1" @on-item-click="tabChange">
          <div class="titleBarTitle">{{$i18n.translate("Sort by balance")}}</div>
        </button-tab-item>
      </button-tab>
    </div>
    <flexbox class="website-header">
      <flexbox-item>
        <div class="flex-demo">{{$i18n.translate("website")}}</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">{{$i18n.translate("account name")}}</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="demo-title-p">{{$i18n.translate("Balance")}}</div>
          <div class="demo-title-p">{{$i18n.translate("Yesterday's profit2")}}</div>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">{{$i18n.translate("status Action")}}</div>
      </flexbox-item>
    </flexbox>
    <div>
      <flexbox :key="i + 'key'" v-for="(item,i) in websiteData" class="website-content">
        <flexbox-item>
          <div class="flex-demo">{{item.website}}</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">{{item.account}}</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">{{item.balance}}</div>
          <div v-if="!isNagtiveNum(item.yes_profit)" class="flex-demo red">+{{item.yes_profit}}</div>
          <div v-if="isNagtiveNum(item.yes_profit)" class="flex-demo green">{{item.yes_profit}}</div>
        </flexbox-item>
        <flexbox-item>
          <div v-if="isOnline(item.is_online)" class="flex-demo">{{$i18n.translate("online")}}</div>
          <div class="website-mini-btn-wrap" v-if="isOnline(item.is_online)">
            <x-button
              class="website-mini-btn"
              mini
              type="warn"
              @click.native="onOffLine(item.website, -1, item.account)"
            >{{$i18n.translate("offline")}}</x-button>
          </div>
          <div v-if="isOffline(item.is_online)" class="flex-demo">{{$i18n.translate("offline")}}</div>
          <div v-if="isDisable(item.is_online)" class="flex-demo">{{$i18n.translate("Prohibit")}}</div>
          <div
            class="website-mini-btn-wrap"
            v-if="isOffline(item.is_online) || isDisable(item.is_online)"
          >
            <x-button
              class="website-mini-btn"
              mini
              type="primary"
              @click.native="onOffLine(item.website, 1,item.account)"
            >{{$i18n.translate("online")}}</x-button>
          </div>
        </flexbox-item>
      </flexbox>
      <divider v-if="websiteData.length === 0">{{$i18n.translate("not sign info1")}}</divider>
      <divider v-if="websiteData.length === 0">{{$i18n.translate("not sign info2")}}</divider>
      <divider v-if="websiteData.length === 0">{{$i18n.translate("not sign info3")}}</divider>
    </div>
    <confirm
      v-model="show"
      :title="$i18n.translate('System offline operation')"
      @on-confirm="onConfirm"
    >
      <p
        style="text-align:center;"
      >{{$i18n.translate("websiteInfo info1")}} {{websiteStatusBook[toWebsiteStatus]}} {{website}}／{{balance}}?</p>
    </confirm>
  </div>
</template>

<script>
import Api from "@/service/Account";
import {
  ButtonTab,
  ButtonTabItem,
  cookie,
  Divider,
  XButton,
  Confirm
} from "vux";
const orderNameBook = ["Website_code", "balance"];

export default {
  components: {
    Confirm,
    ButtonTab,
    ButtonTabItem,
    Divider,
    XButton
  },
  data() {
    return {
      show: false,
      website: "",
      balance: "",
      toWebsiteStatus: "",
      websiteStatusBook: {
        "-1": this.$i18n.translate("websiteInfo offline"),
        "1": this.$i18n.translate("websiteInfo online")
      },
      selectedIndex: 0,
      websiteData: []
    };
  },
  methods: {
    isOnline(status) {
      return status !== -1 && status !== -2;
    },
    isOffline(status) {
      return status === -1;
    },
    isDisable(status) {
      return status === -2;
    },
    onConfirm() {
      Api.turnWebsiteStatus(
        {
          website: this.website,
          account: this.balance,
          to_website_status: this.toWebsiteStatus
        },
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.show = false;
            this.getWebsiteBalance(orderNameBook[this.selectedIndex]);
            this.$vux.toast.text(res.msg);
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    onOffLine(website, to_website_status, balance) {
      this.show = true;
      this.website = website;
      this.balance = balance;
      this.toWebsiteStatus = to_website_status;
    },
    tabChange(index) {
      this.selectedIndex = index;
      this.getWebsiteBalance(orderNameBook[this.selectedIndex]);
    },
    getWebsiteBalance(order_name = "Website_code") {
      Api.websiteBalance(
        {
          order_name
        },
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const data = res.data;
            this.websiteData = data;
          } else {
            this.errorHandler(res.msg, this.getWebsiteBalance);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    errorHandler(msg, cb) {
      // 显示
      this.$vux.confirm.show({
        title: msg,
        content: this.$i18n.translate("errorHandle info"),
        onConfirm() {
          cb();
        },
        onCancel() {
          // console.log("Plugin: I'm hiding");
        }
      });
    },
    // - : true
    isNagtiveNum(value) {
      if (!value) return false;
      value = value.toString();
      return value.slice(0, 1) === "-";
    }
  },
  mounted: function() {
    this.getWebsiteBalance();
  }
};
</script>

<style>
.titleBarTitle {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.titleBar {
  margin: 20px auto 0px auto;
  width: 90%;
}
.demo-title-p {
  line-height: 16px;
}
.website-mini-btn-wrap {
  text-align: center;
}
.website-mini-btn {
  font-size: 10px;
  height: 30px;
}
.website-wraper {
  font-size: 14px;
}
.website-header {
  line-height: 60px;
}
.flex-demo {
  text-align: center;
  line-height: 12px;
  margin: 5px 0;
}
.red {
  color: #f74c31;
}
.green {
  color: #04be02;
}
.website-content {
  background-color: #ffffff;
  height: 60px;
  margin-bottom: 2px;
  box-shadow: 0 1px 1px #e0e0e0;
}
</style>
