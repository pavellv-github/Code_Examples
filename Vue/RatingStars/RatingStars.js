export default {
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
    },
  },
  data() {
    return {
      list: [
        {
          title: 'Outstanding',
          value: 5,
          isChecked: false,
        },
        {
          title: 'Very Good',
          value: 4,
          isChecked: false,
        },
        {
          title: 'Good',
          value: 3,
          isChecked: false,
        },
        {
          title: 'Poor',
          value: 2,
          isChecked: false,
        },
        {
          title: 'Very Poor',
          value: 1,
          isChecked: false,
        },
      ],
    };
  },
  methods: {
    inputChange(index) {
      this.list.forEach((item_) => {
        const item = item_;
        if (item.value <= index) item.isChecked = true;
        else item.isChecked = false;
      });
      this.$emit('input', index);
    },
  },
  mounted() {
    this.inputChange(this.value);
  },
};
