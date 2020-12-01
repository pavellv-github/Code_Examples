import BasePicture from '~/components/BasePicture/BasePicture.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';

export default {
  props: {
    to: {
      required: true,
      type: Object,
    },
    anons: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    seatsInfo: {
      required: true,
      type: String,
    },
    sources: {
      default: () => [],
      type: Array,
    },
    src: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    day: {
      required: true,
      type: String,
    },
    month: {
      required: true,
      type: String,
    },
    stubElement: {
      type: Object,
    },
    stub: {
      type: Boolean,
      default: false,
    },
    isLarge: {
      default: false,
      type: Boolean,
    },
    button: {
      type: String,
      default: 'Учавствовать',
    },
  },
  components: {
    BasePicture,
    BaseButton,
  },
};
