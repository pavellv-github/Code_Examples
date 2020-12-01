import BaseButton from '../BaseButton/BaseButton.vue';

export default {
  props: {
    activePage: {
      type: Number,
      default: 1,
    },
    countItems: {
      type: Number,
      required: true,
    },
    countOfPage: {
      type: Number,
      required: true,
    },
  },
  components: {
    BaseButton,
  },
  data() {
    return {
      count: 0,
      active: 0,
    };
  },
  methods: {
    getNumberStr(number_) {
      const number = parseInt(number_, 10);
      return (number < 10) ? `${number}` : number;
    },
    onClick(index) {
      this.active = parseInt(this.numbers[index].text, 10);
      this.$emit('clickPagination', this.active);
    },
  },

  computed: {
    numbers() {
      let { active } = this;
      const count = parseInt(this.count, 10);
      const numbers = [];

      if (active <= 0) active = 1;
      if (active > count) active = count;

      numbers.push({
        text: '1',
        number: 1,
      });

      if (active - 1 > 1) {
        if (active - 2 > 1) {
          numbers.push({
            text: '...',
            number: '',
            disable: true,
          });
        }

        numbers.push({
          text: this.getNumberStr(active - 1),
          number: active - 1,
        });
      }

      if (active > 1) {
        numbers.push({
          text: this.getNumberStr(active),
          number: active,
        });
      }

      if (active + 1 < count) {
        numbers.push({
          text: this.getNumberStr(active + 1),
          number: active + 1,
        });

        if (active + 2 < count) {
          numbers.push({
            text: '...',
            number: '',
            disable: true,
          });
        }
      }

      if (active < count) {
        numbers.push({
          text: this.getNumberStr(this.count),
          number: this.count,
        });
      }
      return numbers;
    },
    isMobile() {
      if (this.$mq === 'default' && this.$store.state.ModuleSsr.isSsrDetectMobile === true) return true;
      return (this.$mq === 'tablet' || this.$mq === 'phone');
    },
  },
  mounted() {
    const remainder = this.countItems % this.countOfPage;
    if (remainder === 0) this.count = this.countItems / this.countOfPage;
    else this.count = (this.countItems - remainder) / this.countOfPage + 1;
    if (this.activePage > this.count) this.active = this.count;
    else if (this.activePage < 1) this.active = 1;
    else this.active = this.activePage;
  },
};
