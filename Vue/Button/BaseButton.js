export default {
  props: {
    isTransparent: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
    },
    to: {
      type: Object,
    },
    showArrow: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    target: {
      default: '_self',
      type: String,
    },
    rel: {
      default: '',
      type: String,
    },
  },
};
