import TransitionExpand from '../TransitionExpand.vue';

export default {
  components: {
    TransitionExpand,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    paddingTop() {
      return `${(this.item.preview_picture.height / this.item.preview_picture.width) * 100}%`;
    },
    isVertical() {
      return parseInt(this.item.preview_picture.height, 10) > parseInt(this.item.preview_picture.width, 10);
    },
  },
  methods: {
    loaded() {
      this.show = true;
    },
  },
  mounted() {
    Promise.all([
      import('clamp-js'),
    ]).then(([ClampJS]) => {
      [].slice.call(this.$el.querySelectorAll('.articleItem__announ')).forEach((element) => {
        ClampJS(element, { clamp: 'auto' });
      });
      [].slice.call(this.$el.querySelectorAll('.articleItem__title')).forEach((element) => {
        ClampJS(element, { clamp: '3' });
      });

      if (this.$refs.image !== undefined) {
        if (this.$refs.image.complete) {
          this.loaded();
        } else {
          this.$refs.image.addEventListener('load', this.loaded);
        }
      }
    });
  },
};
