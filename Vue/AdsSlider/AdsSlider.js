import { TweenLite, Power0 } from 'gsap';
import AdsItem from '../../components/AdsItem/AdsItem.vue';

export default {
  props: {
    items: Array,
  },
  components: {
    AdsItem,
  },
  methods: {
    getOffset(element_) {
      const rect = element_.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
      };
    },
  },
  mounted() {
    Promise.all([
      import('swiper/dist/js/swiper.esm.js'),
      import('swiper/dist/css/swiper.min.css'),
    ]).then(([{ Swiper, Pagination }]) => {
      if (this.startCode !== undefined) {
        this.activeId = this.getIndexByCode(this.startCode);
      }

      Swiper.use([Pagination]);
      this.swiper = new Swiper(this.$el.querySelector('.swiper-container'), {
        speed: 400,
        spaceBetween: 100,
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: true,
        pagination: {
          el: this.$el.querySelector('.swiper-pagination'),
          type: 'bullets',
          clickable: true,
        },
        on: {
          slideChange: () => {
            TweenLite.to(document.documentElement, 0.2, {
              scrollTop: this.getOffset(this.$el).top,
              ease: Power0.easeNone,
            });
          },
        },
      });
    });
  },
};
