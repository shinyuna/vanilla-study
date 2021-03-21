export default class Component {
  $target;
  $props;
  $state = {};
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.created();
    this.render();
    this.setEvent();
  }
  setup() {}
  created() {}
  mounted() {}
  template() {
    return '';
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setEvent() {}
  setState(newData) {
    this.$state = { ...this.$state, ...newData };
    this.render();
  }
}
