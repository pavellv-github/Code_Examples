<template lang="pug">
  .search
    .search__hover
    nuxt-link.search__link(:to="localePath('search')")
      svg(v-svg, symbol="icon_search")
</template>

<style lang="scss">
@import "~/assets/styles/settings.scss";

.search {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: 400 17px/1.2 "Museo", "Times New Roman", "Times", serif;
  letter-spacing: 0.02em;
  color: $passive;
  text-align: center;
  position: relative;

  @include mq("tablet", "phone") {
    display: none;
  }

  &__link {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 34px 0;

    @include mq("desktop-wide", "desktop") {
      padding: 17px 0;
    }

    @include mq("desktop", "tablet-wide") {
      padding: 12px 0 12px 0;
    }

    @include mq("tablet-wide", "tablet") {
      padding: 18px 0 18px 0;
    }
  }

  &__hover {
    width: 0;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
    transition: width 0.3s ease;
    background-color: $accent;
    opacity: 0.15;
  }

  @include hover {
    .search__hover {
      width: calc(100%);
    }
  }

  svg {
    width: 20px;
    height: 20px;
    color: $passive;
    z-index: 1px;

    @include mq('desktop-wide', 'desktop') {
      width: 20px;
      height: 20px;
    }

    @include mq('tablet', 'phone') {
        display: none;
      }

    @include mq('phone') {
      display: none;
    }
  }
}
</style>
