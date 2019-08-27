<template>
  <div>
    <div class="msg" v-if="noAuthority">
      <divider>{{$i18n.translate("We are not open yet")}}</divider>
    </div>
    <x-table v-if="!noAuthority" class="order-table" full-bordered>
      <thead>
        <tr class="order-table-title">
          <th>{{$i18n.translate("web")}}</th>
          <th>{{$i18n.translate("account")}}</th>
          <th>{{$i18n.translate("time")}}</th>
          <th>{{$i18n.translate("A&B")}}</th>
          <th>{{$i18n.translate("turn")}}</th>
          <th>{{$i18n.translate("money")}}</th>
          <th>{{$i18n.translate("odds")}}</th>
          <!-- <th>结算金额</th> -->
        </tr>
      </thead>
      <tbody>
        <tr :key="i + 'key'" v-for="(item,i) in list">
          <td>{{item.website}}</td>
          <td>{{item.account}}</td>
          <td>{{item.game_time || $i18n.translate("Website not displayed")}}</td>
          <td>
            {{item.host_team}} &
            <br />
            {{item.guest_team}}
          </td>
          <td>{{selectTeamBook[item.select_team]}}</td>
          <td>{{item.order_amount}}</td>
          <td>{{item.odds}}</td>
          <!-- <td>{{item.settle_amount}}</td> -->
        </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
import Api from "@/service/Order";
import { XTable, cookie, Divider } from "vux";

export default {
  components: { XTable, Divider },
  data() {
    return {
      noAuthority: false,
      list: [],
      selectTeamBook: {
        left: this.$i18n.translate("Host"),
        right: this.$i18n.translate("Guest")
      }
    };
  },
  methods: {
    getList() {
      Api.getList({}, cookie.get("token"), this.$store.state.language)
        .then(res => {
          if (!res) return;
          this.noAuthority = false;
          if (res.errorCode === 0) {
            // const result = this.addStyleTypeToList(res.data);
            const result = res.data;
            this.list = result;
          } else if (res.errorCode === 4) {
            this.noAuthority = true;
          } else {
            this.errorHandler(res.msg, this.getList);
          }
        })
        .catch(e => {
          this.$vux.toast.text("getList" + this.$i18n.translate("error info"));
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
    }
  },
  mounted: function() {
    this.getList();
  }
};
</script>

<style>
.msg {
  margin-top: 20px;
  font-size: 16px;
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
</style>
