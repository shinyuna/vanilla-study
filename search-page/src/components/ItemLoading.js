import Component from '../core/Component.js';

export class ItemLoading extends Component {
  template() {
    return `
      <div class="modal">
        <p class="loading__txt">로딩중...</p>
        <p class="loading__txt-sub">잠시만 기다려라 냥 😽</p>
      </div>
    `;
  }
}
