<template>
  <div class="buys">
    <transition name="rotateDownRight" leave-active-class="fadeOutRight">
      <div class="buys-down icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent=downBuys></div>
    </transition>
    <transition name="rotateDownRight" leave-active-class="fadeOutRight">
      <div class="buys-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="buys-add icon-add_circle" @click.stop.prevent="addBuys"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['food'],
  methods: {
    addBuys() {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    downBuys() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}

</script>
<style lang="less" scoped>
.buys {
  font-size: 0;

  .buys-down,
  .buys-add {
    display: inline-block;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
  }

  .buys-count {
    display: inline-block;
    width: 12px;
    vertical-align: top;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .buys-add {}
}

</style>
