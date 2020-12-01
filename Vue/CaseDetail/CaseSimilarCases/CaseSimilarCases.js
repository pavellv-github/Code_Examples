import BaseSlider from '~/components/ui/BaseSlider/BaseSlider.vue';
import WorkCard from '~/components/WorkCard/WorkCard.vue';

export default {
  components: {
    BaseSlider,
    WorkCard,
  },
  props: {
    cases: {
      type: Array,
      default: [],
    },
  },
};
