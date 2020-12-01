import ScrollAnimate from '~/assets/scripts/scrollAnimate';

export default {
  name: 'CaseSolution',
  data() {
    return {
      offset1: 0,
      offset2: 0,
    };
  },
  mounted() {
    this.$nextTick();
    this.scrollAnimate = new ScrollAnimate({
      target: this.$el,
      elementScroll: window,
      callback: this.animate,
    });
    this.animate(0);
  },

  methods: {
    animate(percent) {
      const { text, line1, line2 } = this.$refs;

      const length1 = line1.getTotalLength();
      const length2 = line2.getTotalLength();

      let t = 100 - percent * 2;
      if (t < 0) t = 0;

      let m = 100 - percent * 2.5;
      if (m < 0) m = 0;

      const percent1 = (length1 * t) / 100;
      const percent2 = (length2 * t) / 100;

      line1.setAttribute('stroke-dasharray', length1);
      line1.setAttribute('stroke-dashoffset', percent1);

      line2.setAttribute('stroke-dasharray', length2);
      line2.setAttribute('stroke-dashoffset', percent2);

      text.style.transform = `translateX(${m}%)`;
    },
  },

  destroy() {
    this.scrollAnimate.destroy();
  },
};
