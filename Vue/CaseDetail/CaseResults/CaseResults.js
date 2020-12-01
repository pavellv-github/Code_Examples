import BaseSlider from '~/components/ui/BaseSlider/BaseSlider.vue';
import CaseTabs from '~/components/CaseDetail/CaseTabs/CaseTabs.vue';
import CaseTabsItem from '~/components/CaseDetail/CaseTabs/CaseTabsItem/CaseTabsItem.vue';
import InfoCard from '~/components/InfoCard/InfoCard.vue';

export default {
  props: {
    results: {
      type: Object,
      default: {},
    },
  },
  components: {
    BaseSlider,
    CaseTabs,
    CaseTabsItem,
    InfoCard,
  },
  data() {
    return {
      activeTab: 'bussines',
    };
  },
  methods: {
    onTabChange(name) {
      this.activeTab = name;
    },
  },
};
