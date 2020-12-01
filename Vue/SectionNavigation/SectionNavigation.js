const opt = {
  item: 'sectionNavigation__item',
};

export default {
  props: {
    dataItems: Array,
    startCode: String,
  },
  data() {
    return {
      activeId: 0,
    };
  },
  watch: {
    activeId() {
      this.updateLine();
      this.updateScrollTransition();
    },
    dataItems() {
      this.updateLine();
      this.swiper.update();
    },
  },
  methods: {
    getIndexByCode(code) {
      let id = 0;
      this.dataItems.forEach((element, index) => {
        if (element.code === code) {
          id = index;
        }
      });
      return id;
    },
    getOffset(element_) {
      if (element_ === undefined) return { top: 0, left: 0 };
      const rect = element_.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
      };
    },

    updateLine() {
      const { line } = this.$refs;
      if (line === undefined) return;
      const activeItem = this.items[this.activeId].children[0];
      const width = activeItem.clientWidth;
      const offset = this.getOffset(activeItem);
      const offsetContainer = Math.abs(this.getOffset(this.$refs.container).left);
      let translateX = parseInt(offset.left, 10) - offsetContainer;

      if (this.swiper !== undefined) {
        translateX -= this.swiper.translate;
      }

      line.style.transform = `translateX(${translateX}px)`;
      line.style.width = `${width}px`;
    },

    updateScrollTransition() {
      this.swiper.slideTo(this.activeId);
    },

    clickItem(e) {
      const item = e.srcElement.parentNode;
      this.activeId = parseInt(item.getAttribute('data-id'), 10);
    },
  },
  mounted() {
    Promise.all([
      import('swiper/dist/js/swiper.esm.js'),
      import('swiper/dist/css/swiper.min.css'),
    ]).then(([{ Swiper }]) => {
      if (this.startCode !== undefined) {
        this.activeId = this.getIndexByCode(this.startCode);
      }

      this.swiper = new Swiper(this.$el.querySelector('.swiper-container'), {
        slidesPerView: 'auto',
      });

      this.items = [].slice.call(this.$el.querySelectorAll(`.${opt.item}`));
      this.scroll = this.$refs.scroll;
      this.updateLine();

      window.addEventListener('resize', () => {
        this.swiper.update();
        this.updateLine();
      });
    });
  },
};
