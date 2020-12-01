import MorphBubble from '~/components/MorphBubble/MorphBubble.vue';

export default {
  name: 'caseTeam',
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    MorphBubble,
  },
};
