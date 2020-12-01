export default {
  model: {
    prop: 'model',
    event: 'input',
  },
  props: {
    type: {
      type: String,
      default: 'radio',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    model: {
      type: [Array, Boolean, Number, String],
      default: false,
    },
    validate: Object,
    text: String,
  },
  computed: {
    isArray() {
      return Array.isArray(this.model);
    },
    isChecked() {
      if (this.type === 'radio' && this.value) {
        return this.model === this.value;
      }

      if (this.isArray) {
        return this.model.includes(this.value);
      }

      return !!this.model;
    },
  },
  created() {
    this.$validator = this.$parent.$validator;
  },
  methods: {
    setModel(checked) {
      if (this.type === 'radio' && this.value) {
        this.$emit('input', this.value);
      } else if (this.isArray) {
        if (checked) {
          this.$emit('input', this.model.concat([this.value]));
        } else {
          this.$emit('input', this.model.filter(v => v !== this.value));
        }
      } else {
        this.$emit('input', checked);
      }
    },
    onChange(event) {
      this.setModel(event.target.checked);
    },
  },
};
