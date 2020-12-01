export default {
  props: {
    type: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    rankText: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    shortcut: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fixDate: '',
    };
  },
  mounted() {
    this.fixDate = this.newDate(this.date);
  },
  methods: {
    newDate(date) {
      const dateFix = new Date(date);
      const month = dateFix.getMonth();
      const year = dateFix.getFullYear();

      const mouthRusArray = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Ноябрь',
        'Декабрь',
      ];

      const monthRus = mouthRusArray[month];
      const newDate = `${monthRus} ${year}`;

      return newDate;
    },
  },
};
