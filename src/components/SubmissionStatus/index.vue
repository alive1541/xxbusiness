<template>
  <div class="submission-wraper">
    <x-table class="order-table" full-bordered>
      <thead>
        <tr class="order-table-title">
          <th>{{$i18n.translate("Submission time")}}</th>
          <th>{{$i18n.translate("site")}}</th>
          <th>{{$i18n.translate("Account Name")}}</th>
          <th>{{$i18n.translate("Status")}}</th>
          <th>{{$i18n.translate("Action needed")}}</th>
        </tr>
      </thead>
      <tbody :key="i + 'key'" v-for="(item,i) in list">
        <tr>
          <td>{{item.submit_time}}</td>
          <td>{{item.website_name}}</td>
          <td>{{item.account}}</td>
          <td>
            <div
              style="color: #00c853"
              v-if="isSuccess(item.status)"
            >{{$i18n.translate("Successed")}}</div>
            <div v-if="isFailed(item.status)">
              {{$i18n.translate("Failed")}}
              <div v-if="item.reason !== ''">({{item.reason}})</div>
            </div>
            <div v-if="isInVertification(item.status)">{{$i18n.translate("Registering")}}</div>
          </td>
          <td>
            <div v-if="isFailed(item.status)">
              <p @click="reSubmit(item)" class="submission-resubmit">{{$i18n.translate("Resubmit")}}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </x-table>
    <confirm
      ref="confirm"
      v-model="reSubmitModalVisible"
      :title="currentItem.website_name"
      @on-confirm="onConfirm"
      @on-hide="onHide"
      :close-on-confirm="false"
    >
      <group>
        <x-input :title="$i18n.translate('username')" v-model="account"></x-input>
        <x-input :title="$i18n.translate('password')" v-model="password"></x-input>
      </group>
    </confirm>
    <div v-transfer-dom>
      <alert
        v-model="multipleSubmitAlertVisible"
        :title="$i18n.translate('Repeated submission')"
        :button-text="$i18n.translate('close')"
      >
        <br />
        <p>{{$i18n.translate('info15')}}</p>
        <p>{{$i18n.translate('info16')}}</p>
        <br />
        <p>{{$i18n.translate('info17')}}</p>
      </alert>
    </div>
  </div>
</template>

<script>
import Api from "../../service/SubmissionStatus";
import GetMoneyApi from "../../service/GetMoney";
import { XTable, cookie, Confirm, Group, XInput, Alert } from "vux";
import { constants } from "crypto";

export default {
  components: { XTable, Confirm, Group, XInput, Alert },
  data() {
    return {
      reSubmitModalVisible: false,
      multipleSubmitAlertVisible: false,
      account: "",
      password: "",
      currentItem: {},
      list: []
    };
  },
  methods: {
    // ifMultipleSubmit(submit_count) {
    //   return submit_count > 3;
    // },
    alertMultipleSubmit() {
      this.multipleSubmitAlertVisible = true;
    },
    onConfirm() {
      if (this.account.trim() === "") {
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
      }
      if (this.password.trim() === "") {
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
      }
      const {
        currentItem: { nationality_id, website_id },
        account,
        password
      } = this;
      GetMoneyApi.accountSubmit(
        {
          nationality_id,
          website_id,
          account,
          password
        },
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.$vux.toast.text(res.msg);
            this.$refs.confirm._onCancel();
            this.resetData();
            this.getSubmitAccountInfoList();
          } else if (res.errorCode === 13) {
            this.$refs.confirm._onCancel();
            this.alertMultipleSubmit();
            this.resetData();
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.resetData();
          this.$vux.toast.text(
            "accountSubmit" + this.$i18n.translate("error info")
          );
        });
    },
    resetData() {
      this.account = "";
      this.password = "";
      this.currentItem = {};
    },
    onHide() {
      this.resetData();
    },
    reSubmit(item) {
      // if (this.ifMultipleSubmit(item.submit_count)) {
      //   this.multipleSubmitAlertVisible = true;
      // } else {
      //   this.currentItem = item;
      //   this.reSubmitModalVisible = true;
      // }
      this.currentItem = item;
      this.reSubmitModalVisible = true;
    },
    isSuccess(status) {
      return status === 2;
    },
    isFailed(status) {
      return status === 3;
    },
    isInVertification(status) {
      return status === 1;
    },
    getSubmitAccountInfoList() {
      Api.submitAccountInfoList(
        {},
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.list = res.data;
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "submitAccountInfoList" + this.$i18n.translate("error info")
          );
        });
    }
  },
  mounted: function() {
    this.getSubmitAccountInfoList();
  }
};
</script>

<style>
.submission-wraper {
  margin: 20px 10px 60px 10px;
}
.order-table-title {
  font-weight: 500;
  background-color: #f7f7f7;
  color: black;
}

.order-table {
  table-layout: fixed;
  color: black;
  background-color: #fff;
}
.order-table th,
.order-table td {
  line-height: 20px;
  word-break: break-all;
  word-spacing: normal;
}
.submission-resubmit {
  text-decoration: underline;
  color: #e80707;
}
</style>
