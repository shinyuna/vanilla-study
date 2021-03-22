import Component from '../core/Component.js';

export class itemModal extends Component {
  template() {
    const { catInfo } = this.$props;
    return `
      <div class="modal">
        <div class="detail">
          <button class="detail-close">닫기 👋</button>
          <div class="detail__info">
            <img src="${catInfo.url}" alt="${catInfo.name}"/>
            <p>묘종: ${catInfo.name}</p>
            <p>국적: ${catInfo.origin}</p>
            <p>성향: ${catInfo.temperament}</p>
          </div>
        </div>
      </div>
    `;
  }

  setEvent() {
    const { closeModal } = this.$props;
    document.documentElement.style.setProperty('--modal-opacity', 1);
    this.$target.addEventListener('click', e => {
      if (e.target.className === 'modal' || e.target.className === 'detail-close') {
        closeModal(false);
      }
    });
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27 || e.key === 'Escape') {
        closeModal(false);
      }
    });
  }
}
