<template>
  <div class="sell-wrapper" ref="sell">
    <div class="sell-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <stars :size="36" :score="seller.score" class="st"></stars>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="send">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="info">{{seller.minPrice}}
              </span>
              <span class="small">元</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="info">{{seller.deliveryPrice}}
              </span>
              <span class="small">元</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="info">{{seller.deliveryTime}}
              </span>
              <span class="small">分钟</span>
            </div>
          </li>
        </ul>
        <div class="love">
          <span class="icon-favorite" :class="{'active':like===true,'noactive':like===false}" @click=changeLike></span>
          <div class="text">{{likeText}}</div>
        </div>
      </div>
      <splits></splits>
      <div class="detail">
        <h1 class="title">公告与活动</h1>
        <div class="info">
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <splits></splits>
      <div class="outlook">
        <h1 class="title">商家实景</h1>
        <div class="img-wrapper" ref="imgwrapper">
          <ul class="wrapper" ref="wrapper">
            <li class="item" v-for="(item,index) in seller.pics" :key="index">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <splits></splits>
      <div class="message">
        <h1 class="title">商家信息</h1>
        <ul v-if="seller.infos" class="infos">
          <li class="infos-item" v-for="(item,index) in seller.infos" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import stars from '../stars/Stars'
import splits from '../splits/Splits'
import BScroll from 'better-scroll'
export default {
  props: ['seller'],
  data() {
    return {
      like: false,
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
    }
  },
  methods: {
    changeLike() {
      return this.like = !this.like
    }
  },
  computed: {
    likeText() {
      return this.like ? '已收藏' : '未收藏'
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.sell, { click: true })
    if (this.seller.pics) {
      let picWidth = 120;
      let margin = 6;
      let width = (picWidth + margin) * this.seller.pics.length;
      this.$refs.wrapper.style.width = width;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.imgwrapper, { click: true, scrollX: true, })
      })
    }
  },
  components: {
    stars,
    splits
  }
}

</script>
<style lang="less" scoped="">
.sell-wrapper {
  position: fixed;
  left: 0;
  top: 174px;
  width: 100%;
  background-color: #fff;
  z-index: 50;
  overflow: hidden;

  .sell-content {
    .overview {
      position: relative;
      padding: 18px;

      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }

      .desc {
        padding-bottom: 18px;
        border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);

        .st,
        .ratingCount,
        .sellCount {
          display: inline-block;
          vertical-align: top;
        }

        .ratingCount {
          margin: 0 12px 0 8px;
        }

        .ratingCount,
        .sellCount {
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
        }
      }

      .love {
        position: absolute;
        right: 18px;
        top: 18px;
        text-align: center;

        .icon-favorite {
          font-size: 24px;
          line-height: 24px;
          margin-bottom: 4px;

          &.active {
            color: rgb(240, 20, 20);
          }

          &.noactive {
            color: rgb(147, 153, 159);
          }
        }

        .text {
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 10px;

        }
      }

      .send {
        padding-top: 18px;
        display: flex;

        .block {
          flex: 1;
          border-right: 0.5px solid rgba(7, 17, 27, 0.1);
          text-align: center;

          .title {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
          }

          .content {
            font-size: 0px;

            .info,
            .small {
              display: inline-block;
              font-weight: 200;
              line-height: 24px;
              color: rgb(7, 17, 27);
            }

            .info {
              font-size: 24px;
            }

            .small {
              font-size: 10px;
            }
          }
        }
      }
    }

    .detail {
      padding: 18px 18px 0 18px;

      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }

      .info {
        padding: 0 12px;
        margin-bottom: 16px;

        .bulletin {
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
          color: rgb(240, 20, 20);
        }
      }

      .supports {

        .support-item {
          border-top: 0.5px solid rgba(7, 17, 27, 0.1);
          padding: 16px 12px;
          font-size: 0;

          .icon {
            display: inline-block;
            vertical-align: top;
            margin-right: 6px;
            width: 16px;
            height: 16px;

            &.decrease {
              background: url(./decrease_4@2x.png)no-repeat;
              background-size: 12px 12px;
            }

            &.discount {
              background: url(./discount_4@2x.png)no-repeat;
              background-size: 12px 12px;
            }

            &.guarantee {
              background: url(./guarantee_4@2x.png)no-repeat;
              background-size: 12px 12px;
            }

            &.invoice {
              background: url(./invoice_4@2x.png) no-repeat;
              background-size: 12px 12px;
            }

            &.special {
              background: url(./special_4@2x.png) no-repeat;
              background-size: 12px 12px;
            }
          }

          .text {
            font-size: 12px;
            line-height: 16px;
            color: rgb(7, 17, 27);
            font-weight: 200;
          }
        }
      }
    }

    .outlook {
      padding: 18px 0 18px 18px;

      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        margin-bottom: 12px;

      }

      .img-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        .wrapper {
          font-size: 0;

          .item {
            display: inline-block;
            margin-right: 6px;

            &.last-child {
              margin-right: 0px;
            }

          }

        }
      }
    }

    .message {
      padding: 18px 0 18px 18px;

      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        margin-bottom: 12px;
      }

      .infos {
        .infos-item {
          border-top: 0.5px solid rgba(7, 17, 27, 0.1);
          padding: 16px 12px;
          font-size: 12px;
          line-height: 16px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
}

</style>
