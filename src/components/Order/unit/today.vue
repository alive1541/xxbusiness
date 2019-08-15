<template>
  <div>
    <div class="msg" v-if="noAuthority">
      <divider>暂未开放，敬请期待</divider>
    </div>
    <x-table v-if="!noAuthority" class="order-table">
      <thead>
        <tr class="order-table-title">
          <th>网站</th>
          <th>账号</th>
          <th>比赛时间</th>
          <th>A&B</th>
          <th>主客</th>
          <th>购买金额</th>
          <th>赔率</th>
          <!-- <th>结算金额</th> -->
        </tr>
      </thead>
      <tbody>
        <tr :key="i + 'key'" v-for="(item,i) in list">
          <td>{{item.website}}</td>
          <td>{{item.account}}</td>
          <td>{{item.game_time || '网站未显示'}}</td>
          <td>
            {{item.host_team}} 对
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
      selectTeamBook: { left: "主", right: "客" }
    };
  },
  methods: {
    getList() {
      Api.getList(
        {
          owner_id: window.localStorage.getItem("owner_id")
        },
        cookie.get("token")
      )
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
          this.$vux.toast.text(e);
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
  color: black;
  background-color: #fff;
}
.order-table th,
.order-table td {
  line-height: 20px;
}
</style>
