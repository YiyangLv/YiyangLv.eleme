<template>
  <div class="rats">
    <div class="rat-type">
      <span @click="select(2)" class="block positive" :class="{'active':mySelectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span @click="select(0)" class="block positive" :class="{'active':mySelectType===0}">{{desc.positive}}<span class="count">{{ positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':mySelectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':myOnlyContent===true}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['ratings', 'selectType', 'onlyContent', 'desc'],
  data() {
    return {
      mySelectType: this.selectType,
      myOnlyContent: this.onlyContent
    }
  },
  methods: {
    select(type) {
      this.mySelectType = type;
      this.$emit('changeselect', type)
    },
    toggleContent(content) {
      this.myOnlyContent = !this.myOnlyContent
      this.$emit('changeonlycontent', this.myOnlyContent)
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === 0;
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === 1;
      })
    }
  }
}

</script>
<style lang="less" scoped>
.rats {
  .rat-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
    font-size: 0px;
  }

  .block {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 2px;
    margin-right: 8px;
    color: rgb(77, 85, 93);
    font-size: 12px;
    line-height: 16px;

    &.active {
      color: #fff;
    }

    .count {
      font-size: 8px;
      margin-left: 2px;
    }

    &.positive {
      background-color: rgba(0, 160, 220, 0.2);

      &.active {
        background-color: rgb(0, 160, 220);
      }
    }

    &.negative {
      background-color: rgba(77, 85, 93, 0.2);

      &.active {
        background-color: rgb(77, 85, 93);
      }
    }
  }

  .switch {
    line-height: 24px;
    padding: 12px 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);

    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }

    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      font-size: 24px;
      margin-right: 4px;
    }

    .text {
      display: inline-block;
      font-size: 12px;
    }
  }
}

</style>
