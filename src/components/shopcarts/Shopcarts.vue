<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="con-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'light':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'light':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'light':totalPrice>0}">￥{{totalPrice}}
          </div>
          <div class="desc">另需配送费 {{deliveryprice}}元</div>
        </div>
        <div class="con-right">
          <div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fade" enter-active-class=" " leave-active-class="fadeOutDown">
        <div class="shopcart-list fold" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clear">清空</span>
          </div>
          <div class="list-countent" ref="listcountent">
            <ul>
              <li class="food" v-for="(food,index) in selectfoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="buyss">
                  <buys :food="food"></buys>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="hide"></div>
  </div>
</template>
<script>
import buys from '../buys/Buys'
import BScroll from 'better-scroll'
export default {
  props: ['deliveryprice', 'minprice', 'selectfoods'],
  data() {
    return {
      fold: true
    }
  },
  components: {
    buys,
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    clear() {
      if (this.selectfoods) {
        this.selectfoods.forEach((food) => {
          food.count = 0;
        })
      }
    },
    hide() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minprice) {
        return
      }
      window.alert(`支付成功${this.totalPrice}元`)
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      if (this.selectfoods) {
        this.selectfoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      }
    },
    totalCount() {
      let count = 0;
      if (this.selectfoods) {
        this.selectfoods.forEach((food) => {
          count += food.count;
        })
        return count;
      }
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minprice}元起送`;
      } else if (this.totalPrice < this.minprice) {
        let diff = this.minprice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice < this.minprice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listcountent, { click: true })
          } else {
            this.scroll.refresh();
          }
        })
      }
      return show;
    }
  }
}

</script>
<style lang="less" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background-color: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .con-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 10px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2b343c;
          text-align: center;

          &.light {
            background-color: rgb(0, 160, 220);
          }

          .icon-shopping_cart {
            font-size: 24px;
            line-height: 44px;
            color: #80858a;

            &.light {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          background-color: rgb(244, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        line-height: 24px;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 0.5px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;

        &.light {
          color: #fff;
        }
      }


      .desc {
        display: inline-block;
        line-height: 48px;
        margin-left: 12px;
        font-size: 16px;
        font-weight: 500;
        font-size: 10px;
      }

    }

    .con-right {
      flex: 0 0 105px;
      width: 105px;
      background-color: #2b333b;

      .pay {
        font-size: 12px;
        line-height: 48px;
        height: 48px;
        text-align: center;
        font-weight: 700;

        &.not-enough {
          background-color: #2b333b;
        }

        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;

    &.fold {
      transform: translate3d(0, -100%, 0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background-color: #f3f5f7;
      border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 17px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 55220);
      }
    }

    .list-countent {
      padding: 0 18px;
      max-height: 217px;
      background-color: #fff;
      overflow: hidden;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .buyss {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  background-color: rgba(7, 17, 27, 0.6)
}

</style>
