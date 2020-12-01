<template lang="pug">
  .lang(@click="panels.isTop = !panels.isTop")
    .lang__hover
    nuxt-link.mobileHidden(v-for="locale in $i18n.locales", v-if="locale.code === $i18n.locale", :key="locale.code", :to="switchLocalePath(locale.code)") {{ locale.name }}
    nuxt-link.desktopHidden(v-for="locale in $i18n.locales", v-if="locale.code !== $i18n.locale", :key="locale.code", :to="switchLocalePath(locale.code)") {{ locale.name }}
    .lang__panel(:class="{ panelVisible: panels.isTop }")
      span(v-for="locale in $i18n.locales", v-if="locale.code == $i18n.locale", :key="locale.code", :to="switchLocalePath(locale.code)") {{ locale.name }}
      nuxt-link(v-for="locale in $i18n.locales", v-if="locale.code !== $i18n.locale", :key="locale.code", :to="switchLocalePath(locale.code)") {{ locale.name }}
</template>

<script>
export default {
  data: () => ({
    panels: {
      isTop: false,
    },
  }),
};
</script>

<style lang="scss">
@import "~/assets/styles/settings.scss";

.lang {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 0;
  position: relative;
  cursor: pointer;

  @include mq("desktop-wide", "desktop") {
    padding: 20px 0;
  }

  @include mq("desktop", "tablet-wide") {
    padding: 12px 0 12px 0;
  }

  @include mq("tablet-wide", "tablet") {
    padding: 18px 0 18px 0;
  }

  @include mq("tablet", "phone") {
    padding: 18px 0 18px 0;
    width: 100%;
  }

  @include mq("phone") {
    padding: 18px 0 18px 0;
    width: 100%;
  }

  .mobileHidden {
    @include mq('tablet', 'phone') {
      display: none;
    }

    @include mq('phone') {
      display: none;
    }
  }
  .desktopHidden {
    display: none;

    @include mq('desktop-wide', 'tablet') {
      display: none;
    }

    @include mq('tablet', 'phone') {
      display: block;
    }

    @include mq('phone') {
      display: block;
    }
  }

  a {
    font: 400 19px/1.2 "Museo", "Times New Roman", "Times", serif;
    letter-spacing: 0.02em;
    color: $grey;
    text-align: center;
    position: relative;
    text-decoration: none;
    margin: 0 10px 0 10px;
    pointer-events: none;

    @include mq('desktop-wide', 'desktop') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
    }

    @include mq('desktop', 'tablet') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
      pointer-events: auto;
    }

    @include mq('tablet', 'phone') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
      pointer-events: auto;
    }

    @include mq('phone') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
      pointer-events: auto;
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

  &__panel {
    width: 200%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: -100%;
    background-color: $bg-insert;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: bottom 0.2s linear;
    z-index: 3;

    @include mq("tablet-wide", "tablet") {
      display: none;
    }

    @include mq("tablet", "phone") {
      display: none;
    }

    @include mq("phone") {
      display: none;
    }

    a {
      font: 400 19px/1.2 "Museo", "Times New Roman", "Times", serif;
      letter-spacing: 0.02em;
      color: $grey;
      text-align: center;
      position: relative;
      text-decoration: none;
      margin: 0 10px 0 10px;
      pointer-events: auto;

      @include mq('desktop-wide', 'desktop') {
        font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
      }

      @include mq('desktop', 'tablet-wide') {
        font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
      }

      @include mq('tablet', 'phone') {
        font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
      }

      @include mq('phone') {
        font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
      }
    }
    span {
      color: $accent;
      margin: 0 10px 0 10px;
    }
  }

  .panelVisible {
    bottom: 0;
  }

  @include hover {
    .lang__hover {
      width: 100%;

      @include mq('tablet', 'phone') {
        width: 0;
      }

      @include mq('phone') {
        width: 0;
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -1px;
    width: 2px;
    height: 39px;
    background: $passive;
    opacity: 0.3;

    @include mq('desktop-wide', 'desktop') {
      height: 36px;
    }

    @include mq('desktop', 'tablet-wide') {
      height: 43px;
    }

    @include mq('tablet-wide', 'tablet') {
      height: 39px;
    }

    @include mq('tablet', 'phone') {
      display: none;
    }

    @include mq('phone') {
      display: none;
    }
  }

  span {
    font: 400 19px/1.2 "Museo", "Times New Roman", "Times", serif;
    letter-spacing: 0.02em;
    color: $accent;
    text-align: center;
    position: relative;
    text-decoration: none;

    @include mq('desktop-wide', 'desktop') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
    }

    @include mq('desktop', 'tablet-wide') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
    }

    @include mq('tablet', 'phone') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
    }

    @include mq('phone') {
      font: 400 16px/1.2 "Museo", "Times New Roman", "Times", serif;
    }
  }
}
</style>
