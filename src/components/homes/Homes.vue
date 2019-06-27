<template>
  <div>
    <div class="header" :seller="seller">
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
      </div>
    </div>
    <el-row type="flex">
      <el-menu :router="true" default-active="/homes/goods" class="tab-item" mode="horizontal">
        <el-col :span="8">
          <el-menu-item index="/homes/goods">商品</el-menu-item>
        </el-col>
        <el-col :span="8">
          <el-menu-item index="/homes/ratings">评论</el-menu-item>
        </el-col>
        <el-col :span="8">
          <el-menu-item index="/homes/seller">商家</el-menu-item>
        </el-col>
      </el-menu>
    </el-row>
    <!-- 子路由入口 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seller: {},
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  created() {
    this.$http.get('/api/seller')
      .then(res => {
        if (res.data.errno === 0) {
          this.seller = res.data.data
        }
      })

  },
  methods: {

  }
}

</script>
<style lang="less">
.el-menu {
  background-color: transparent;
}

.el-menu-item {
  color: #778593;
  height: 40px;
  line-height: 40px;

  &:hover {
    background-color: transparent;
  }
}

.tab-item {
  width: 100%;
  text-align: center;
}

// 头部
.header {
  color: #fff;
  background-color: #000;

  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;

    .avatar {
      display: inline-block;
      vertical-align: top;
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
  }
}

</style>
