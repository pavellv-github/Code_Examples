import VClamp from 'vue-clamp';

export default {
  props: {
    day: {
      required: true,
      type: String,
    },
    month: {
      required: true,
      type: String,
    },
    position_address: {
      required: true,
      type: String,
    },
    time: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    anons: {
      required: true,
      type: String,
    },
    to: {
      required: true,
      type: Object,
    },
  },
  components: {
    VClamp,
  },
};
