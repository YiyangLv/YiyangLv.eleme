<template>
  <transition name="fade" enter-active-class="fadeInRightBig">
    <div class="foods" v-show="showFlag" ref="foods">
      <div class="food-content">
        <div class="img-header">
          <img :src="foods.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{foods.name}}</h1>
          <div class="detail">
            <span class="sell">月售{{foods.sellCount}}份</span><span class="rating">好评率{{foods.rating}}%</span>
          </div>
          <div class="price">
            <span class="p-now">￥{{foods.price}}</span><span class="p-old" v-show="foods.oldPrice">￥{{foods.oldPrice}}</span>
          </div>
          <div class="cat-wrapper">
            <buys :food="foods"></buys>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!foods.count || foods.count===0">加入购物车</div>
          </transition>
        </div>
        <splits v-show="foods.info"></splits>
        <div class="info" v-show="foods.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{foods.info}}</p>
        </div>
        <splits></splits>
        <div class="rating">
          <div class="title">商品评价</div>
          <rats :ratings="foods.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></rats>
          <div class="rating-wrapper">
            <ul v-show="foods.ratings && foods.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in foods.ratings" :key="index" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime |formatDate('-')}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!foods.ratings || !foods.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
import buys from '../buys/Buys'
import Vue from 'vue'
import splits from '../splits/Splits'
import rats from '../rats/Rats'
export default {
  props: ['foods'],
  data() {
    return {
      showFlag: false,
      selectType: 2,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  filters: {
    formatDate: function(time, sep) {
      let date = new Date(time)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let h = date.getHours()
      let mine = date.getMinutes()
      let s = date.getSeconds()
      m = m > 10 ? m : '0' + m
      d = d > 10 ? d : '0' + d
      h = h > 10 ? h : '0' + h
      mine = mine > 10 ? mine : '0' + mine
      s = s > 10 ? s : '0' + s
      return y + sep + m + sep + d + ' ' + h + ':' + mine + ':' + s
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = 2;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foods, { click: true })
        }
      })
    },
    chSelect(type) {
      this.selectType = type;
    },
    chOnlyContent(content) {
      this.onlyContent = content;
    },
    addFirst() {
      Vue.set(this.foods, 'count', 1)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === 2) {
        return true
      } else {
        return type === this.selectType
      }
    },
    hide() {
      this.showFlag = false
    }
  },
  components: {
    buys,
    splits,
    rats
  }
}

</script>
<style lang="less" scoped>
.foods {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  z-index: 30;
  background-color: #fff;

  .img-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .back {
      position: absolute;
      top: 0;
      left: 0;

      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }

  .content {
    padding: 18px;
    position: relative;

    .title {
      font-size: 14px;
      line-height: 14px;
      margin-bottom: 8px;
      color: rgb(7, 17, 27);
      font-weight: 700;
    }

    .detail {
      margin-bottom: 18px;
      line-height: 10px;

      .sell,
      .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }

      .sell {
        margin-right: 12px;
      }
    }

    .price {
      font-weight: 700;
      line-height: 24px;

      .p-now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }

      .p-old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .cat-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }

    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      font-size: 10px;
      border-radius: 12px;
      color: #fff;
      background-color: rgb(0, 160, 220);
    }
  }

  .info {
    padding: 18px;

    .title {
      line-height: 14px;
      margin-bottom: 6px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .text {
      line-height: 24px;
      padding: 0 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
    }
  }

  .rating {
    padding-top: 18px;

    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .rating-wrapper {
      padding: 0 18px;

      .rating-item {
        position: relative;
        padding: 16px 0;
        border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);

        .user {
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 0;
          line-height: 12px;

          .name {
            display: inline-block;
            font-size: 10px;
            vertical-align: top;
            color: rgb(147, 153, 159);
            margin-right: 6px;
          }

          .avatar {
            border-radius: 50%;
          }
        }

        .time {
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);

          .icon-thumb_up,
          .icon-thumb_down {
            margin-right: 4px;
            line-height: 16px;
          }

          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }
        }
      }

      .no-rating {
        padding: 16px 0;
        font-size: 24px;
        color: rgb(147, 153, 159);
      }
    }
  }


}

</style>
