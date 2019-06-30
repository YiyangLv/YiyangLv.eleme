<template>
  <div>
    <div class="header" :seller="seller">
      <!-- 头部 -->
      <div class="content-wrapper">
        <!-- 头像 -->
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar">
        </div>
        <!-- 中间内容 -->
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="suppore">
            <span class="icon" :class=" classMap[seller.supports[0].type]"></span>
            <span class="text">
              {{seller.supports[0].description}}
            </span>
          </div>
        </div>
        <div v-if="seller.supports" class="support-count" @click=changeShowDetail>
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <!-- 公告 -->
      <div class="bulletin-wrapper" @click=changeShowDetail>
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!-- 头部大背景图 -->
      <div class="h-background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <!-- 点击弹层页 -->
      <transition name="fade">
        <div v-show="showDetail" class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close">
            <i class="icon-close" @click="closeDetail"></i>
          </div>
        </div>
      </transition>
    </div>
    <!-- 引入头部下面组件 -->
    <conten :seller="seller"></conten>
  </div>
</template>
<script>
// 星星组件  商品商家组件
import star from '../stars/Stars'
import conten from '../conten/Contents'
export default {
  data() {
    return {
      seller: {},
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      showDetail: false
    }
  },
  created() {
    this.$http.get('/api/seller')
      .then(res => {
        if (res.data.errno === 0) {
          this.seller = res.data.data
          console.log(this.seller)
        }
      })
  },
  components: {
    star,
    conten,
  },
  methods: {
    changeShowDetail() {
      this.showDetail = true
    },
    closeDetail() {
      this.showDetail = false
    }
  },
}

</script>
<style lang="less" scoped>
// 头部
.header {
  color: #fff;
  position: relative;
  background: rgba(7, 17, 27, 0.5);
  overflow: hidden;

  // <!-- 头部 -->
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      margin-left: 16px;
      display: inline-block;
      font-size: 14px;

      .title {
        margin: 2px 0 8px 0;

        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          background: url(./brand@2x.png) no-repeat;
          background-size: 30px 18px;
        }

        .name {
          font-size: 16px;
          margin-left: 6px;
          font-weight: bold;
          line-height: 18px;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }

      .suppore {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;

          &.decrease {
            background: url(./decrease_1@2x.png)no-repeat;
            background-size: 12px 12px;
          }

          &.discount {
            background: url(./discount_1@2x.png)no-repeat;
            background-size: 12px 12px;
          }

          &.guarantee {
            background: url(./guarantee_1@2x.png)no-repeat;
            background-size: 12px 12px;
          }

          &.invoice {
            background: url(./invoice_1@2x.png) no-repeat;
            background-size: 12px 12px;
          }

          &.special {
            background: url(./special_1@2x.png) no-repeat;
            background-size: 12px 12px;
          }
        }

        .text {
          line-height: 12px;
          font-size: 12px;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 18px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        font-size: 10px;
        vertical-align: top;
      }

      .icon-keyboard_arrow_right {
        font-size: 10px;
        line-height: 24px;
        margin-left: 2px;
      }
    }
  }

  // 公告
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      background: url(./bulletin@2x.png) no-repeat;
      background-size: 22px 12px;
      vertical-align: middle;
    }

    .bulletin-text {
      margin: 0 4px;
      font-size: 10px;
    }

    .icon-keyboard_arrow_right {
      font-size: 10px;
      position: absolute;
      right: 12px;
      top: 12px;
    }
  }

  // 头部大背景图
  .h-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  // 弹层页
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);

    .detail-wrapper {
      min-height: 100%;
      overflow: hidden;

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;

        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }

        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 20px auto;

          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }

        .supports {
          width: 80%;
          margin: 0 auto;

          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;

            &:last-child {
              margin-bottom: 0;
            }

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;

              &.decrease {
                background: url(./decrease_2@2x.png)no-repeat;
                background-size: 12px 12px;
              }

              &.discount {
                background: url(./discount_2@2x.png)no-repeat;
                background-size: 12px 12px;
              }

              &.guarantee {
                background: url(./guarantee_2@2x.png)no-repeat;
                background-size: 12px 12px;
              }

              &.invoice {
                background: url(./invoice_2@2x.png) no-repeat;
                background-size: 12px 12px;
              }

              &.special {
                background: url(./special_2@2x.png) no-repeat;
                background-size: 12px 12px;
              }
            }

            .text {
              font-size: 12px;
              line-height: 12px;
            }
          }
        }

        .bulletin {
          width: 80%;
          margin: 0 auto;
          padding: 0 12px;

          p {
            font-size: 12px;
            line-height: 24px;
            color: rgb(255, 255, 255);
          }
        }
      }
    }

    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
}

</style>
