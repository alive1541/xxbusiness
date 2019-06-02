<template>
  <div class="card-wraper">
    <div class="titleBar">
      <button-tab>
        <button-tab-item :selected="selectedIndex === 0" @on-item-click="tabChange">今日</button-tab-item>
        <button-tab-item :selected="selectedIndex === 1" @on-item-click="tabChange">历史</button-tab-item>
      </button-tab>
    </div>
    <div class="historyContent" v-if="selectedIndex === 1">
      <divider>暂未开放，敬请期待</divider>
    </div>
    <div v-if="selectedIndex === 0" class="todayContent">
      <x-table :cell-bordered="false" :content-bordered="false" class="order-table">
        <thead>
          <tr class="order-table-title">
            <th>网站</th>
            <th>账号</th>
            <th>比赛时间</th>
            <th>A&B</th>
            <th>主客</th>
            <th>购买金额</th>
            <th>赔率</th>
            <th>结算金额</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{'firstColor':item.colorClass === 'firstColor','secondColor':item.colorClass === 'secondColor','isUnilateral': item.is_unilateral}"
            :key="i + 'key'"
            v-for="(item,i) in list"
          >
            <td>{{item.website}}</td>
            <td>{{item.account}}</td>
            <td>{{item.game_time}}</td>
            <td>
              {{item.host_team}} 对
              <br>
              {{item.guest_team}}
            </td>
            <td>{{selectTeamBook[item.select_team]}}</td>
            <td>{{item.order_amount}}</td>
            <td>{{item.odds}}</td>
            <td>{{item.settle_amount}}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script>
import { ButtonTab, ButtonTabItem, Divider, XTable, cookie } from "vux";
import Api from "@/service/Order";

export default {
  components: { ButtonTab, ButtonTabItem, Divider, XTable },
  data() {
    return {
      selectTeamBook: { left: "主", right: "客" },
      selectedIndex: 0,
      list: []
    };
  },
  methods: {
    tabChange(index) {
      this.selectedIndex = index;
    },
    getList() {
      Api.getList({
        owner_id: window.localStorage.getItem("owner_id"),
        token: cookie.get("token")
      })
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const result = this.addStyleTypeToList(res.data);
            this.list = result;
          } else {
            this.errorHandler(res.msg, this.getList);
          }
        })
        .catch(e => {
          this.$vux.toast.text(e);
        });
    },
    addStyleTypeToList(list) {
      let currentColorClass = "firstColor";
      const dataSource = list.slice();
      const result = [];
      for (let i = 0; i < dataSource.length; i++) {
        let listFirst = list.shift();
        const resultLast = result[result.length - 1];
        if (!resultLast) {
          result.push({
            colorClass: currentColorClass,
            ...listFirst
          });
        } else if (listFirst.is_unilateral === 1) {
          result.push({
            colorClass: "isUnilateral",
            ...listFirst
          });
        } else if (resultLast.order_id === listFirst.order_id) {
          result.push({
            colorClass: resultLast.colorClass,
            ...listFirst
          });
        } else {
          currentColorClass =
            currentColorClass === "firstColor" ? "secondColor" : "firstColor";
          result.push({
            colorClass: currentColorClass,
            ...listFirst
          });
        }
      }
      return result;
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
    }
  },
  mounted: function() {
    this.getList();
  }
};
</script>

<style scoped>
.order-table-title {
  font-weight: 500;
  background-color: #f7f7f7;
  color: black;
}
.order-table {
  background-color: #fff;
}
/* .order-table tr,
.order-table th,
.order-table td {
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
} */
.firstColor {
  background-color: #4db6ac;
}
.secondColor {
  background-color: #8bc34a;
}
.isUnilateral {
  background-color: #ff7043;
}
.todayContent {
  color: #fff;
  margin-top: 20px;
}
.historyContent {
  margin-top: 20px;
  font-size: 16px;
}
.titleBar {
  margin: 0 auto;
  width: 90%;
}
.card-wraper {
  margin: 15px auto;
}
</style>
