<template>
  <div class="wraper">
    <div class="top">
      <div>
        <span>昨日盈亏</span>
        <br>
        <span v-if="!isNagtiveNum(lastDay)" class="red">{{lastDay}}</span>
        <span v-if="isNagtiveNum(lastDay)" class="green">{{lastDay}}</span>
      </div>
      <div>
        <span>未结算</span>
        <br>
        <span v-if="!isNagtiveNum(notAccount)" class="red">{{notAccount}}</span>
        <span v-if="isNagtiveNum(notAccount)" class="green">{{notAccount}}</span>
      </div>
    </div>
    <div class="bottom">
      <div>
        <span>总资产</span>
        <br>
        <span>{{allAssets}}</span>
      </div>
      <div>
        <span>总盈亏</span>
        <br>
        <span v-if="!isNagtiveNum(allIncome)" class="red">{{allIncome}}</span>
        <span v-if="isNagtiveNum(allIncome)" class="green">{{allIncome}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/service/Account";
import { cookie } from "vux";

export default {
  data() {
    return {
      lastDay: "0",
      allAssets: "0",
      notAccount: "0",
      allIncome: "0"
    };
  },
  methods: {
    getAllBalance() {
      Api.userBalance({
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token")
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const data = res.data;
            console.log("this", this);
            this.lastDay = data["yes_profit"];
            this.allAssets = data["all_money"];
            this.notAccount = data["yes_unsettle"];
            this.allIncome = data["all_profit"];
          } else {
            this.errorHandler(res.msg, this.getAllBalance);
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
        content: "点击确定可以重新获取内容",
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
    this.getAllBalance();
  }
};
</script>

<style>
.wraper {
  font-size: 14px;
  padding: 10px 0;
  width: 95%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: 0 2px 8px #e0e0e0;
}
.top,
.bottom {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.bottom {
  margin-top: 15px;
}
.red {
  color: #f74c31;
}
.green {
  color: #04be02;
}
</style>
