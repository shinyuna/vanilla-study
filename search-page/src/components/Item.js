import Component from '../core/Component.js';

export class Item extends Component {
  template() {
    const { catList, noticeMessage } = this.$props;
    return `
      <section class="wrapper">
        ${
          catList &&
          catList
            .map(
              item =>
                `<article class="wrapper__item"><div class="cover"><p>${item.name}</p></div><img src="${item.url}" alt="${item.name}" id="${item.id}" /></article>`
            )
            .join('')
        }
        ${noticeMessage && `<p class="notice">${noticeMessage}</p>`}
        </section>
    `;
  }
}
