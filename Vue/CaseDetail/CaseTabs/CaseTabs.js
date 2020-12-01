import getOffsetElement from '~/assets/scripts/getOffsetElement';

export default {
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeName: '',
      items: [],
      startPosition: 0,
      startScroll: 0,
      drag: false,
      moveTimer: null,
    };
  },
  methods: {
    onClick(name, e) {
      this.$children.forEach((element_) => {
        const element = element_;
        element.isActive = element.name === name;
        element.isActive && (this.activeName = element.name); // eslint-disable-line
      });
      this.$emit('change', name);
      this.updateLine();
      this.moveTabs(e);
    },
    onUpdateTitle(newValue, name) {
      this.items.forEach((element_) => {
        const element = element_;
        if (element.name === name) {
          element.title = newValue;
        }
      });
    },
    updateLine() {
      this.$nextTick(() => {
        const { line } = this.$refs;
        const button = this.$el.querySelector(`.caseTabs__button[data-name="#${this.activeName}"] span`);
        line.style.width = `${button.clientWidth}px`;
        line.style.transform = `translateX(${getOffsetElement(button).left - getOffsetElement(this.$el).left - this.$refs.header.offsetLeft}px) translateX(${this.$refs.header.scrollLeft}px)`;
      });
    },
    mouseDown(e) {
      this.drag = true;
      if (this.moveTimer !== null) clearInterval(this.moveTimer);
      this.startPosition = e.pageX;
      this.startScroll = this.$refs.header.scrollLeft;
    },
    mouseMove(e) {
      if (this.drag) {
        const currentPosition = e.pageX;
        this.$refs.header.scrollLeft = this.startScroll - (currentPosition - this.startPosition);
      }
    },
    mouseUp() {
      this.drag = false;
    },
    moveTabs({ target }) {
      const button = target.closest('.caseTabs__button');
      const { clientWidth } = this.$refs.tabs;
      if (button && this.$refs.header.scrollWidth > 0) {
        this.moveTimer = setInterval(() => {
          const scroll = this.$refs.header.scrollLeft;
          if (button.offsetLeft < scroll) {
            this.$refs.header.scrollLeft -= 1;
          } else if (button.offsetLeft === scroll || button.offsetLeft - scroll + button.clientWidth <= clientWidth) clearInterval(this.moveTimer);
          else this.$refs.header.scrollLeft += 1;
        });
      }
    },
  },
  created() {
    for (let i = 0; i < this.$slots.default.length; i += 1) {
      const slot = this.$slots.default[i];
      if (slot.componentOptions !== undefined) {
        this.items.push({
          name: slot.componentOptions.propsData.name,
          title: slot.componentOptions.propsData.title,
          child: slot.child,
        });
        if (slot.componentOptions.propsData.isSelected) this.activeName = slot.componentOptions.propsData.name;
      }
    }

    if (this.activeName === '') {
      this.activeName = this.items[0].name;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateLine();
      if (document.fonts) document.fonts.ready.then(this.updateLine);
    });

    this.$on('updateTitle', this.onUpdateTitle);
    window.addEventListener('resize', this.updateLine);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  },
  destroyed() {
    this.$off('updateTitle', this.onUpdateTitle);
    window.removeEventListener('resize', this.updateLine);
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  },
};
