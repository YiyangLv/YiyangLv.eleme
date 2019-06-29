<template>
  <div>
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
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script>
export default {
  props: ['seller']
}

</script>
<style lang="less">
.el-menu {
  background-color: transparent;
}

.el-menu-item.is-active {
  color: #778593;
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

</style>
