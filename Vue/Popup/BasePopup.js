export default {
  props: {
    name: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    this.$popups.register(this);
  },
};
