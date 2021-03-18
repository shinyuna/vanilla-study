import Component from '../core/Component.js';

export class ItemRandom extends Component {
  template() {
    const { randomList } = this.$props;
    return `<p>슬라이드 영역${randomList}</p>`;
  }
}
