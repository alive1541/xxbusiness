<template>
  <div>
    <div class="wraper">
      <div class="top-im">
        <div class="top-im-item">
          <span class="userInfo-des-all">
            总资产(元)
            <span class="userinfo-icon">
              <popover placement="right">
                <div slot="content" class="popover-demo-content">
                  是您目前持有的所有资产，
                  <br>它等于总余额+预计收益+未结算
                </div>
                <a>
                  <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                </a>
              </popover>
            </span>
          </span>
          <br>
          <span class="userInfo-des-all-momey">{{all_assets}}</span>
        </div>
        <div>
          <img class="arrow-img" src="../../../assets/img/double-right.svg">
        </div>
        <div class="top-im-item">
          <div style="margin-Bottom:15px">
            <span class="userInfo-des">总余额</span>
            <span class="userinfo-icon">
              <popover placement="right">
                <div slot="content" class="popover-demo-content">总余额是您当前所有账户余额的和</div>
                <a>
                  <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                </a>
              </popover>
            </span>
            <span>{{all_balance}}</span>
          </div>
          <div>
            <span class="userInfo-des">未结算</span>
            <span class="userinfo-icon">
              <popover placement="right">
                <div slot="content" class="popover-demo-content">包含两部分，比赛未结束和比赛已结束未结算。</div>
                <a>
                  <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                </a>
              </popover>
            </span>
            <span v-if="!isNagtiveNum(all_unsettle)" class="red">{{all_unsettle}}</span>
            <span v-if="isNagtiveNum(all_unsettle)" class="green">{{all_unsettle}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wraper">
      <div class="bottom">
        <div class="left">
          <div class="inner-top">
            <span>
              {{all_deposit}}
              <br>
              <span class="userInfo-des">
                充值总额
                <div class="userinfo-icon">
                  <popover placement="right">
                    <div slot="content" class="popover-demo-content">历史上您的所有账户的充值总额</div>
                    <a>
                      <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                    </a>
                  </popover>
                </div>
              </span>
            </span>
          </div>
          <div>
            <span v-if="!isNagtiveNum(all_profit)" class="red">{{all_profit}}</span>
            <span v-if="isNagtiveNum(all_profit)" class="green">{{all_profit}}</span>
            <br>
            <span class="userInfo-des">
              总盈亏
              <span class="userinfo-icon">
                <popover placement="right">
                  <div slot="content" class="popover-demo-content">
                    历史上您使用产品的盈亏情况，
                    <br>它等于总资产-充值总额+提现总额
                  </div>
                  <a>
                    <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                  </a>
                </popover>
              </span>
            </span>
          </div>
        </div>
        <div class="right">
          <div class="inner-top">
            <span v-if="!isNagtiveNum(yes_profit)" class="red">{{yes_profit}}</span>
            <span v-if="isNagtiveNum(yes_profit)" class="green">{{yes_profit}}</span>
            <br>
            <span class="userInfo-des">
              昨日盈亏
              <span class="userinfo-icon">
                <popover placement="right">
                  <div slot="content" class="popover-demo-content">它是昨日已结算的成对的订单的金额的和</div>
                  <a>
                    <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                  </a>
                </popover>
              </span>
            </span>
          </div>
          <div>
            <span>{{all_withdrawals}}</span>
            <br>
            <span class="userInfo-des">
              提现总额
              <span class="userinfo-icon">
                <popover placement="right">
                  <div slot="content" class="popover-demo-content">历史上您的提现总额</div>
                  <a>
                    <x-icon class="btn btn-default" type="ios-information-outline" size="15"></x-icon>
                  </a>
                </popover>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/service/Account";
import { Popover, cookie } from "vux";

export default {
  components: { Popover },
  data() {
    return {
      all_assets: "0",
      all_balance: "0",
      all_unsettle: "0",
      all_deposit: "0",
      all_withdrawals: "0",
      all_profit: "0",
      yes_profit: "0"
    };
  },
  methods: {
    getAllBalance() {
      Api.getAssets({
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token")
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const data = res.data;
            this.all_assets = data["all_assets"];
            this.all_balance = data["all_balance"];
            this.all_unsettle = data["all_unsettle"];
            this.all_deposit = data["all_deposit"];
            this.all_withdrawals = data["all_withdrawals"];
            this.all_profit = data["all_profit"];
            this.yes_profit = data["yes_profit"];
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
.inner-top {
  margin-bottom: 15px;
}
.top-im-item {
  position: relative;
  flex-grow: 1;
}
.arrow-img {
  width: 35px;
}
.popover-demo-content {
  padding: 10px;
}
.userinfo-icon {
  position: absolute;
  right: -20px;
  top: -1px;
  height: 15px;
  font-size: 12px;
  fill: lightskyblue;
  vertical-align: middle;
}
.top-im-item .userinfo-icon {
  position: relative;
  display: inline-block;
  right: 0;
  top: 0;
}
.userInfo-des {
  position: relative;
  font-size: 11px;
  color: gray;
}
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

.userInfo-des-all {
  position: relative;
  vertical-align: middle;
  font-size: 15px;
  color: black;
}

.userInfo-des-all .userinfo-icon {
  top: 2px;
}

.userInfo-des-all-momey {
  font-size: 15px;
  color: black;
  font-weight: 600;
}

.top-im,
.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}

.red {
  color: #f74c31;
}
.green {
  color: #04be02;
}
</style>
