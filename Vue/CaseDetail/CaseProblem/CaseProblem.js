import getRandomInt from '~/assets/scripts/getRandomInt';
import ScrollAnimate from '~/assets/scripts/scrollAnimate';

export default {
  name: 'SectionProblem',
  data() {
    return {
      dots: [],
    };
  },
  methods: {
    generateDots() {
      const dots = [];

      const radiusY = (this.$el.clientHeight / 2) - this.$el.clientHeight * 0.04;
      const radiusX = (this.$el.clientWidth / 2) - this.$el.clientWidth * 0.04;
      const x0 = (this.$el.clientWidth / 2);
      const y0 = (this.$el.clientHeight / 2);

      const vw = 100 / this.$el.clientWidth;
      for (let i = 0; i < 30; i += 1) {
        const size = getRandomInt(9, 29);

        const u = Math.random();
        const v = Math.random();

        const t = 2 * Math.PI * v;
        const x = radiusX * Math.sqrt(u) * Math.cos(t);
        const y = radiusY * Math.sqrt(u) * Math.sin(t);

        const xp = x / Math.cos(y0);

        const top = (y + y0);
        const left = (xp + x0);

        dots.push({
          id: i,
          top,
          left,
          size,
          style: {
            top: `${top * vw}vw`,
            left: `${left * vw}vw`,
            width: `${size * vw}vw`,
            height: `${size * vw}vw`,
          },
        });
      }

      this.metaDots = [...dots];
      this.dots = [...dots];
    },

    interpolate(start, end, m) {
      const mn = m <= 0 ? 1 : m;

      return start + (end - start) / mn;
    },

    animate(percent) {
      let m = 100 - percent * 2;
      if (m < 0) m = 0;

      const endTop = this.$el.clientHeight;
      const endLeft = this.$el.clientWidth / 2;
      const vw = 100 / this.$el.clientWidth;

      const newDots = this.metaDots.map((item) => {
        const x = this.interpolate(0, endLeft - item.left, m) * vw;
        const y = this.interpolate(0, endTop - item.top - item.size, m) * vw;
        const scale = this.interpolate(1, 0, m);

        return {
          ...item,
          style: {
            ...item.style,
            transform: `translate(${x}vw, ${y}vw) scale(${scale})`,
          },
        };
      });
      this.dots = [...newDots];
    },
  },
  mounted() {
    this.generateDots();
    this.animate(0);
    this.scrollAnimate = new ScrollAnimate({
      target: this.$el,
      elementScroll: window,
      callback: this.animate,
    });
  },
  destroy() {
    this.scrollAnimate.destroy();
  },
};
