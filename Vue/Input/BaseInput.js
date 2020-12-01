import { IMaskDirective } from 'vue-imask';
import phoneValidate from '~/assets/scripts/phoneValidate';
import dateValidate from '~/assets/scripts/dateValidate';

export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    filedName: {
      type: String,
    },
    icon: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    value: {},
    placeholder: {
      type: String,
      required: true,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Object,
    },
    validate: {
      type: Object,
    },
    message: {
      type: String,
      default: '',
    },
  },
  directives: {
    imask: IMaskDirective,
  },
  data() {
    return {
      fileName: '',
      toggle: false,
      isBlur: false,
    };
  },
  methods: {
    setModel(value) {
      this.$emit('input', value);
    },
    // Обновление значения для инпута без маски
    onInput(e) {
      if (this.isFile === true) this.fileName = e.srcElement.files[0].name;
      if (this.dynamicMask !== undefined) return;

      this.setModel(!this.isFile ? e.target.value : e.srcElement.files[0]);
    },
    // Обновление значения для инпута с маской
    onAccept() {
      this.setModel(this.$refs.field.maskRef.value);
    },
    clickIconToggle() {
      this.toggle = !this.toggle;
    },
  },
  computed: {
    isFocus() {
      return this.isBlur || this.value !== '';
    },
    isFile() {
      return this.type === 'file';
    },
    isToggle() {
      return this.type === 'password';
    },
    dynamicProps() {
      const pr = {};

      if (this.value !== undefined && !this.isFile) pr.value = this.value;
      if (this.disabled === true) pr.disabled = true;
      if (this.toggle === true) pr.type = 'text';
      else pr.type = this.type;

      return pr;
    },
    dynamicMask() {
      if (this.mask !== undefined) return this.mask;
      if (this.type === 'tel') return { mask: phoneValidate.mask };
      if (this.type === 'day') {
        return {
          mask: dateValidate.mask,
          blocks: dateValidate.blocks,
          lazy: false,
        };
      }
      return undefined;
    },
    dynamicValidate() {
      const { validate } = this;

      if (this.type === 'tel') {
        if (validate !== undefined && validate.regex === undefined) {
          validate.regex = phoneValidate.regex;
        }
      } else if (this.type === 'day') {
        if (validate !== undefined && validate.regex === undefined) {
          validate.regex = dateValidate.regex;
        }
      }

      return validate;
    },
    compMessage() {
      if (this.message !== undefined && this.message !== '') { return this.message; }
      return this.errors.first(this.name);
    },
  },
  created() {
    this.$validator = this.$parent.$validator;
  },
  mounted() {
    if (this.isFile === true) this.fileName = this.placeholder;

    if (this.dynamicMask !== undefined) {
      this.setModel(this.$refs.field.maskRef.value);
    }
  },
};
