import ArticleItem from '../ArticleItem/ArticleItem.vue';

export default {
  props: {
    items: Array,
  },
  components: {
    ArticleItem,
  },
  watch: {
    items() {
      setTimeout(() => {
        this.setNewHeight(false);
      });
    },
  },
  methods: {
    setNewHeight(fast) {
      if (fast === false) {
        this.$el.style.transition = 'height 1s ease-in-out';
      }
      if (this.$refs.container !== undefined) {
        this.$el.style.height = `${this.$refs.container.clientHeight}px`;
        if (fast === false) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.$el.style.height = '';
          }, 1000);
        }
      }
    },
  },
  beforeUpdate() {
    this.setNewHeight(true);
  },
  mounted() {
    window.addEventListener('resize', this.setNewHeight);
  },
};
