export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isSelected: {
      default: false,
    },
  },
  data() {
    return {
      isActive: this.isSelected,
      isMounted: this.isSelected,
    };
  },
  computed: {
    isShow() {
      return this.isActive || !this.$parent.isActive;
    },
  },
  created() {
    if (this.$parent.activeName === this.name) this.isActive = true;
  },
  watch: {
    isActive(newValue) {
      if (newValue === true) this.isMounted = true;
    },
    title(newValue) {
      this.$parent.$emit('updateTitle', newValue, this.name);
    },
  },
};
