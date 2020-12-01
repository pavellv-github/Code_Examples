export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    name: String,
    options: Array,
    placeholder: String,
    validate: {
      type: Object,
    },
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isChanged: false,
      isNative: false,
      isOpen: false,
      isTransition: false,
      activeValue: '',
    };
  },
  watch: {
    isOpen() {
      if (!this.isNative) {
        this.isTransition = true;
      }
    },
    /* eslint-disable */
    '$attrs.model': function(newModel) {
      if (newModel !== this.activeValue) {
        this.activeValue = newModel;
        this.$refs.select.value = this.activeValue;
        this.isChanged = true;
      }
    }
    /* eslint-enable */
  },
  computed: {
    activeText() {
      const option = this.options.filter(element => (element.value === this.activeValue));
      if (option.length === 0) this.isChanged = false;
      return (option.length === 0) ? this.placeholder : option[0].text;
    },
    compMessage() {
      if (this.message !== undefined && this.message !== '') { return this.message; }
      return this.errors.first(this.name);
    },
  },
  mounted() {
    if ('ontouchstart' in document.documentElement) {
      this.isNative = true;
    } else {
      this.isNative = false;
    }
    document.addEventListener('click', this.clickDocument);

    if (this.$attrs.model !== '') {
      this.activeValue = this.$attrs.model;
      this.$refs.select.value = this.activeValue;
      this.isChanged = true;
    }
  },
  destroyed() {
    document.removeEventListener('click', this.clickDocument);
  },
  created() {
    this.$validator = this.$parent.$validator;
  },
  methods: {
    clickDocument(e) {
      if (e.srcElement.closest('.baseSelect') !== this.$el) this.isOpen = false;
    },
    endTransition() {
      this.isTransition = false;
    },
    change({ srcElement }) {
      this.isChanged = true;
      this.activeValue = srcElement.value;
      this.$emit('change', this.activeValue);
    },
    toggle() {
      if (this.isNative === true) return;
      this.isOpen = !this.isOpen;
      if (this.flag === undefined) {
        this.flag = true;
        setTimeout(() => {
          this.$vuebar.initScrollbar(this.$refs.scroll, {});
        }, 100);
      }
    },
    optionClick(e) {
      this.isOpen = false;
      const newValue = e.srcElement.getAttribute('href');
      this.activeValue = newValue;
      this.$refs.select.value = this.activeValue;
      this.isChanged = true;
      this.$emit('change', this.activeValue);
      this.$validator.validate();
    },
  },
};
