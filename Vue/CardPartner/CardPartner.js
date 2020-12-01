import BasePicture from '~/components/BasePicture/BasePicture.vue';
import BaseTooltip from '~/components/BaseTooltip/BaseTooltip.vue';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    BasePicture,
    BaseTooltip,
  },
  computed: {
    formatCities() {
      return this.item.cities.map(i => i.title).join(', ');
    },
    formatModels() {
      return this.item.models.join(', ');
    },
  },
};
