import getOffsetElement from '~/assets/scripts/utils';

export default {
  data() {
    return {
      trasformPercent: undefined,
    };
  },
  methods: {
    setAnimation(percent) {
      this.trasformPercent = `translateY(${percent}%)`;
    },
    scrollCount() {
      let scrollEl = 0;

      const postionSection = getOffsetElement(this.$el).top;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const heihtDisplay = window.innerHeight;
      const scroll = scrollTop + heihtDisplay;
      const sectionHeight = this.$el.clientHeight;

      if (this.$el.clientWidth <= 639) {
        const percent = 0;
        this.setAnimation(percent);
        console.log(percent, '640');
        return;
      }

      if (this.$el.clientWidth <= 1024) {
        scrollEl = scroll - postionSection;
        const percent = (scrollEl * 100) / sectionHeight;
        this.setAnimation(percent / 2);
        return;
      }

      if (this.$el.clientWidth <= 1250) {
        scrollEl = scroll - postionSection;
        const percent = (scrollEl * 100) / sectionHeight;
        this.setAnimation(percent / 2);
        return;
      }

      if (scroll >= postionSection) {
        scrollEl = scroll - postionSection;
        const percent = (scrollEl * 100) / sectionHeight / 2;
        this.setAnimation(percent);
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollCount);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollCount);
  },
};
