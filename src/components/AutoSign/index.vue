<template>
  <div class="sign-wraper">
    <div class="sign-wraper-inner">
      <div
        class="sign-info"
      >{{$i18n.translate("important")}}: {{$i18n.translate("auto sign info1")}}</div>
      <group>
        <selector
          :title="$i18n.translate('Place of residence')"
          :options="neighborhood_list"
          v-model="neighborhood_id"
          @on-change="neighborhoodChange"
        ></selector>
        <selector
          :title="$i18n.translate('Country of Citizenship')"
          :options="nationality_list"
          v-model="nationality_id"
        ></selector>
        <x-input
          class="isSpecial"
          :title="$i18n.translate('Last name')"
          v-model="last_name"
          :show-clear="false"
        ></x-input>
        <x-input :title="$i18n.translate('First name')" v-model="first_name" :show-clear="false"></x-input>
        <popup-radio :title="$i18n.translate('Gender')" :options="genderOptions" v-model="gender"></popup-radio>
        <datetime
          :title="$i18n.translate('Date of birth')"
          min-year="1900"
          v-model="birthdate"
          @on-confirm="onDateConfirm"
        ></datetime>
        <x-input
          :title="$i18n.translate('Email')"
          is-type="email"
          v-model="mail"
          :show-clear="false"
        ></x-input>
        <div class="sign-group-wraper">
          <div></div>
          <selector class="sign-prefix" :options="phone_prefix_list" v-model="phone_prefix"></selector>
          <x-input class="sign-phone" v-model="phone" :show-clear="false"></x-input>
        </div>
      </group>
      <div class="sign-agreement">
        <div class="sign-agreement-inner">{{$i18n.translate("auto sign info2")}}</div>
      </div>
      <xButton type="primary" @click.native="submit">{{$i18n.translate("submit")}}</xButton>
    </div>
  </div>
</template>

<script>
import {
  Selector,
  Group,
  XButton,
  XInput,
  PopupRadio,
  Datetime,
  cookie
} from "vux";
import { getLanguage } from "../../assets/util";
import Api from "../../service/AutoSign";

const indonesia_phone_prefix = "2";
const PLACEHOLDER =
  "Jika Anda tidak memiliki nama belakang\nsilakan isi nama Anda di sini";

export default {
  components: { Group, Selector, XButton, XInput, PopupRadio, Datetime },
  data() {
    return {
      neighborhood_id: "",
      nationality_id: "",
      last_name: "",
      first_name: "",
      nationality_list: [],
      neighborhood_list: [],
      phone_prefix_list: [],
      gender: "1",
      genderOptions: [
        { key: "1", value: this.$i18n.translate("male") },
        { key: "2", value: this.$i18n.translate("Female") }
      ],
      birthdate: "",
      mail: "",
      phone_prefix: "",
      phone: ""
    };
  },
  methods: {
    isIndonesia(value) {
      return value === 2;
    },
    languageIsId() {
      return getLanguage(this) === "id";
    },
    setPlaceHolder(isSet) {
      if (isSet) {
        const isSpecialEle = document.querySelector(".isSpecial");
        if (!this.inputEle) {
          this.inputEle = document.querySelector(".isSpecial input");
        }
        if (!this.divEle) {
          this.divEle = document.createElement("div");
        }
        const inputEle = this.inputEle;
        const divEle = this.divEle;
        divEle.innerHTML = PLACEHOLDER;
        divEle.setAttribute("class", "div-placeholder");
        if (this.languageIsId() && inputEle) {
          if (inputEle.value === "") {
            divEle.style.display = "block";
          }

          isSpecialEle.appendChild(divEle);

          inputEle.onfocus = function() {
            divEle.style.display = "none";
          };
          inputEle.onblur = function() {
            if (this.value === "") {
              divEle.style.display = "block";
            }
          };
        }
      } else {
        if (this.inputEle) {
          this.inputEle.onfocus = null;
          this.inputEle.onblur = null;
        }

        if (this.divEle) {
          this.divEle.style.display = "none";
        }
      }
    },
    neighborhoodChange(value) {
      if (this.isIndonesia(value)) {
        this.phone_prefix = indonesia_phone_prefix;
        this.setPlaceHolder(true);
      } else {
        this.setPlaceHolder(false);
      }
    },
    findValueFromList(id) {
      let val;
      this.phone_prefix_list.forEach(item => {
        if (item.id == id) {
          val = item.value;
        }
      });
      return val;
    },
    // dateChange() {},
    submit() {
      let {
        neighborhood_id,
        nationality_id,
        last_name,
        first_name,
        gender,
        birthdate,
        mail,
        phone_prefix,
        phone
      } = this;
      //兼容处理
      phone_prefix = this.findValueFromList(phone_prefix);
      const ifHasEmpty = this.nonEmptyCheck(
        neighborhood_id,
        nationality_id,
        last_name,
        first_name,
        gender,
        birthdate,
        mail,
        phone_prefix,
        phone
      );
      if (ifHasEmpty) {
        return this.$vux.toast.text(
          this.$i18n.translate("Please complete the information")
        );
      }
      Api.registerWebsites(
        {
          neighborhood_id,
          nationality_id,
          last_name,
          first_name,
          gender,
          birthdate,
          mail,
          phone_prefix,
          phone
        },
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            this.$router.push({ name: "AutoSignResult" });
          } else {
            this.$vux.toast.text(res.msg);
          }
        })
        .catch(e => {
          this.$vux.toast.text(
            "registerWebsites" + this.$i18n.translate("error info")
          );
        });
    },
    nonEmptyCheck(...args) {
      let result = false;
      args.forEach(item => {
        if (item === "") {
          result = true;
        }
      });
      return result;
    },
    onDateConfirm(value) {
      this.birthdate = value;
    },
    init() {
      Api.registerFilledInfoRange(
        {},
        cookie.get("token"),
        this.$store.state.language
      )
        .then(res => {
          if (!res) return;
          if (res.errorCode === 0) {
            const {
              nationality_list,
              neighborhood_list,
              phone_prefix_list
            } = res.data;
            this.nationality_list = nationality_list.map(v => {
              v.key = v.id;
              return v;
            });
            this.nationality_id = this.nationality_list[0].id;

            this.neighborhood_list = neighborhood_list.map(v => {
              v.key = v.id;
              return v;
            });
            this.neighborhood_id = this.neighborhood_list[0].id;

            this.phone_prefix_list = phone_prefix_list.map(v => {
              v.key = v.id;
              return v;
            });
            this.phone_prefix = indonesia_phone_prefix;
          } else {
            this.$vux.toast.text(res.msg);
          }
          this.mail = "";
        })
        .catch(e => {
          this.$vux.toast.text(
            "registerFilledInfoRange" + this.$i18n.translate("error info")
          );
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
.div-placeholder {
  position: absolute;
  font-size: 8px;
  color: gray;
  padding-left: 42%;
  z-index: 0;
}
.isSpecial .weui-cell__bd {
  z-index: 99;
}
// .isSpecial {
//   input::-webkit-input-placeholder {
//     color: transparent;
//   }
//   input::-webkit-input-placeholder:before {
//     display: block;
//     color: #999;
//     content: "第一行文本提示 \A 第二行文本提示 \A 第三行文本提示 \A";
//   }
// }
</style>

<style scoped lang="less">
@import "~vux/src/styles/1px.less";

.sign-wraper {
  font-size: 14px;
  padding: 10px 0;
  width: 95%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 10px;
  box-shadow: 0 2px 8px #e0e0e0;
  padding: 5px;
  padding-bottom: 80px;
}

.sign-wraper-inner {
  padding: 15px;
}
.sign-info {
  color: #c62828;
}
.sign-group-wraper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.sign-prefix {
  width: 100px;
  margin-right: 15px;
}
.sign-phone {
  flex: 1;
  padding: 10px 0;
  &:before {
    width: 100%;
    left: 0;
  }
}
.sign-agreement {
  height: 50px;
  color: #424242;
  margin-bottom: 30px;
}
.sign-agreement-inner {
  float: right;
  height: 50px;
  line-height: 50px;
}
</style>
