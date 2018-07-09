<template lang="html">
    <header class="topic-header">
      <div class="left-back" v-show="showGoback" @click="goback">
        <span class="fa fa-chevron-left"></span>
      </div>

      <span class="title">{{title}}</span>

      <router-link to="/tfMyCenter" class="right-login" v-show="showCenter">
        <span class="fa fa-bars"></span>
      </router-link>
      <!--<router-link to="/tfCenter" class="right-login" v-show="showCenter">
        <span class="fa fa-plus"></span>
      </router-link>-->
    </header>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    showGoback: Boolean,
    title: String,
    showCenter: Boolean
  },
  methods: {
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">

  @import "./../assets/scss/common.scss";

  .topic-header{
    z-index : 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease;
    background-color: hsla(0,0%,100%,.95);

    &.show-nav{
      transform: translateX(200px);
    }

    .left-menu,.left-back{
      width: 49px;
      height: $header-height;
      position: absolute;  //absolute是相对于第一个非static(默认)的父元素定位 之前一直以为相对于relative
      top: 0;
      left: 0;
    }

    .left-menu span,.left-back span,.right-login span{
      width: 100%;
      height: $header-height;
      line-height: $header-height;
      text-align: center;
      font-size: 20px;
    }

    .title{
      display: inline-block;
      width: 100%;
      height: $header-height;
      line-height: $header-height;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
    }

    .right-login{
      display: inline-block;
      width: 49px;
      height: $header-height;
      position: absolute;
      top: 0;
      right: 0;

      span{
        color : $color42b;
      }

      img{
        display: block;
        margin: 8px;
        width: 33px;
        border-radius: 50%;
      }
    }
  }
</style>
