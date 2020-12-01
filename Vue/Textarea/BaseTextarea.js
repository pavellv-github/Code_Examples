export default {
  props: {
    name: {
      type: String,
    },
    pattern: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    validate: {
      type: Object,
    },
    value: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isBlur: false,
      activeText: '',
      gradient: false,
    };
  },
  watch: {
    value(newValue) {
      this.activeText = newValue;
    },
  },
  methods: {
    setModel(value) {
      this.$emit('input', value);
    },
    onInput(e) {
      this.setModel(e.target.value);

      // const wrapperHeight = document.querySelectorAll('.baseTextarea__body')[0];
      const textareaHeight = document.querySelectorAll('.baseTextarea__field')[0];

      if (textareaHeight.scrollHeight > textareaHeight.offsetHeight) {
        this.gradient = true;
      } else {
        this.gradient = false;
      }
    },
    onResize() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$vuebar.destroyScrollbar(this.$el, {});
        this.$vuebar.initScrollbar(this.$el, {});
      }, 200);
    },
  },
  computed: {
    isFocus() {
      return this.isBlur || this.value !== '';
    },
    isGradient() {
      return this.gradient;
    },
    dynamicProps() {
      const pr = {};

      if (this.value !== undefined) pr.value = this.value;

      return pr;
    },
    compMessage() {
      if (this.message !== undefined && this.message !== '') { return this.message; }
      return this.errors.first(this.name);
    },
  },
  created() {
    this.$validator = this.$parent.$validator;
  },
};
