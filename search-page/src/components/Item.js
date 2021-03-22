import Component from '../core/Component.js';

export class Item extends Component {
  template() {
    const { catList, noticeMessage } = this.$props;
    return `
      ${
        catList &&
        catList
          .map(
            item =>
              `<article class="wrapper__item"><div class="cover"><p>${item.name}</p></div><img src="" alt="${item.name}" id="${item.id}"/></article>`
          )
          .join('')
      }
      ${noticeMessage && `<p class="notice">${noticeMessage}</p>`}
    `;
  }

  setEvent() {
    const { catList } = this.$props;
    const option = {
      root: this.$target,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        entry.target.src = catList.find(item => item.id === entry.target.id).url;
        observer.unobserve(entry.target);
      });
    }, option);

    const item = this.$target.querySelectorAll('.wrapper__item > img');
    item.forEach(el => io.observe(el));
  }
}
