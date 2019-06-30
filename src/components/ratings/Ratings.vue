<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="o-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="o-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <stars :size="36" :score="seller.serviceScore" class="star"></stars>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <stars :size="36" :score="seller.foodScore" class="star"></stars>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapeer">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <splits></splits>
      <rats :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @changeselect="chSelect" @changeonlycontent=chOnlyContent></rats>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key="index" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <stars :size="24" :score="rating.score" class="st"></stars>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="txet">{{rating.text}}</p>
              <div class="like" v-show="rating.recommend || rating.recommend.length">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                <span v-for="(item,index) in rating.recommend" :key="index" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime |formatDate('-')}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import stars from '../stars/Stars'
import splits from '../splits/Splits'
import rats from '../rats/Rats'
export default {
  props: ['seller'],
  data() {
    return {
      ratings: [],
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
  created() {
    this.$http.get('./api/ratings')
      .then((res) => {
        if (res.data.errno === 0) {
          this.ratings = res.data.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, { click: true })
          })
        }
      })
  },
  components: {
    stars,
    splits,
    rats
  },
  methods: {
    chSelect(type) {
      this.selectType = type;
    },
    chOnlyContent(content) {
      this.onlyContent = content;
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
  }
}

</script>
<style lang="less" scoped>
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    display: flex;
    padding: 18px 0;

    .o-left {
      flex: 0 0 137px;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      padding: 6px 0;

      @media only screen and (max-width: 320px) {
        flex: 0 0 100px;
        width: 100px;
      }

      .score {
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;
      }

      .title {
        font-size: 12px;
        line-height: 12px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }

      .rank {
        font-size: 10px;
        line-height: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .o-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      .score-wrapper {
        line-height: 18px;
        margin-bottom: 8px;
        font-size: 0;

        .title,
        .star,
        .score {
          vertical-align: top;
          display: inline-block;
        }

        .title {
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          margin: 0 12px;
        }

        .score {
          font-size: 12px;
          color: rgb(255, 153, 0);
        }

      }

      .delivery-wrapeer {
        font-size: 12px;

        .title {
          color: rgb(7, 17, 27);
        }

        .time {
          line-height: 12px;
          color: rgb(147, 153, 159);
          margin-left: 12px;
        }
      }
    }
  }

  .rating-wrapper {

    .rating-item {
      display: flex;
      padding: 18px;
      border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);

      .avatar {
        img {
          margin-right: 12px;
          border-radius: 50%;
          flex: 0 0 28px;
          width: 28px;
        }
      }

      .content {
        flex: 1;
        position: relative;

        .name {
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          margin-bottom: 4px;
        }

        .st,
        .delivery {
          display: inline-block;
        }

        .st {
          margin-right: 6px;
        }

        .delivery {
          font-size: 10px;
          font-weight: 200;
          line-height: 12px;
          color: rgb(147, 153, 159);
          margin-bottom: 6px;
        }

        .txet {
          line-height: 36px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }

        .like {
          font-size: 0px;

          .icon-thumb_up,
          .icon-thumb_down {
            display: inline-block;
            font-size: 12px;
            line-height: 32px;
            margin-right: 8px;
          }

          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          .icon-thumb_down {
            color: rgb(183, 187, 191);
          }

          .item {
            display: inline-block;
            margin-right: 8px;
            padding: 0 6px;
            border: 0.5px solid rgba(7, 17, 27, 0.1);
            border-radius: 2px;
            background-color: rgb(255, 255, 255);
            font-size: 10px;
            line-height: 18px;
            color: rgb(147, 153, 159);
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 10px;
          font-weight: 200;
          color: rgb(147, 153, 159);
          line-height: 12px;
        }
      }
    }
  }
}

</style>
