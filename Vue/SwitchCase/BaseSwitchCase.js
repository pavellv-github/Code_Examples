export default {
  props: {
    textLeft: {
      type: String,
      required: true,
    },
    textRight: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  methods: {
    toggle() {
      this.change(!this.value);
    },
    change(newValue) {
      this.$emit('input', newValue);
    },
  },
};
