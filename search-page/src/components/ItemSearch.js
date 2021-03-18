import Component from '../core/Component.js';

export default class ItemSearch extends Component {
  template() {
    const { latelySearchKeyword: keywords } = this.$props;
    return `
      <form class="search__form">
        <button type="submit" class="search__form-btn">🔎</button>
        <input type="text" class="search__form-input" placeholder="고양이를 검색해주라 냥 😸" autofocus="true" />
      </form>
      ${keywords && keywords.length ? this.keywordUI(keywords) : ''}
    `;
  }

  keywordUI(keywords) {
    return `<div class="search__keyword">
      <p>최근 검색어</p>
      <div class="search__keyword-box">
        ${keywords.map(keyword => `<span class="search__keyword-box-item">${keyword}</span>`).join('')}
      </div>
    </div>`;
  }

  setEvent() {
    const { searchCats } = this.$props;
    const input = this.$target.querySelector('.search__form-input');

    this.$target.addEventListener('click', async e => {
      e.preventDefault();
      if (e.target.className === 'search__form-btn') {
        await searchCats(input.value.trim());
        input.value = '';
      }
      if (e.target.className === 'search__keyword-box-item') {
        await searchCats(e.target.innerText.trim());
        input.value = '';
      }
    });
  }
}
