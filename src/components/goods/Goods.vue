<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item.name" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodswrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list" ref="foodlisthook">
          <h1 class="titile">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="sell">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="p-now">￥{{food.price}}</span><span class="p-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="buys-wrapper">
                  <buys :food="food"></buys>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcarts :selectfoods="selectFoods" :deliveryprice="seller.deliveryPrice" :minprice="seller.minPrice"></shopcarts>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import shopcarts from '../shopcarts/Shopcarts'
import buys from '../buys/Buys'
export default {
  props: ['seller'],
  data() {
    return {
      goods: {},
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      listHeight: [],
      scrollY: 0,
    }
  },
  created() {
    this.$http.get('/api/goods')
      .then(res => {
        if (res.data.errno === 0) {
          this.goods = res.data.data
          this.$nextTick(() => {
            this._initScroll()
            this.countHeight()
          })
        }
      })
  },
  components: {
    shopcarts,
    buys,
  },
  methods: {
    selectMenu(index) {
      let foodList = this.$refs.foodlisthook;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 200)


    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuwrapper, { click: true });
      this.foodsScroll = new BScroll(this.$refs.foodswrapper, { probeType: 3, click: true });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    countHeight() {
      let foodList = this.$refs.foodlisthook;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height)
      }
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        };
      };
      return 0;
    },
    selectFoods() {
      let foods = [];
      let good = Array.from(this.goods);
      good.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        })
      })
      return foods;
    }
  }

}

</script>
<style lang="less" scoped>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;

      &.current {
        position: relative;
        margin-top: -1px;
        z-index: 10;
        background: #fff;
        font-weight: 700;

        .text {
          border-bottom: 0;
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;

        &.decrease {
          background: url(./decrease_3@2x.png)no-repeat;
          background-size: 12px 12px;
        }

        &.discount {
          background: url(./discount_3@2x.png)no-repeat;
          background-size: 12px 12px;
        }

        &.guarantee {
          background: url(./guarantee_3@2x.png)no-repeat;
          background-size: 12px 12px;
        }

        &.invoice {
          background: url(./invoice_3@2x.png) no-repeat;
          background-size: 12px 12px;
        }

        &.special {
          background: url(./special_3@2x.png) no-repeat;
          background-size: 12px 12px;
        }
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .titile {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }

    .food-item {
      position: relative;
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);

      &:last-child {
        border-bottom: 0;
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc,
        .sell {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .sell {
          .count {
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

        .buys-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}

</style>
