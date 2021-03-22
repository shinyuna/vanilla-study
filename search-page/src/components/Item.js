import Component from '../core/Component.js';

export class Item extends Component {
  template() {
    const { catList, noticeMessage } = this.$props;
    return `
      ${
        catList &&
        catList
          .map(
            (item, index) =>
              `<article id="${item.id}" class="wrapper__item"><div class="cover"><p>${item.name}</p></div><img id="${item.id}" src="" alt="${item.name}"/></article>`
          )
          .join('')
      }
      ${noticeMessage && `<p class="notice">${noticeMessage}</p>`}
    `;
  }

  setEvent() {
    const { catList } = this.$props;
    const option = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.lazyLoading(catList, option);
  }
  lazyLoading(list, option) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        entry.target.src = list.find(item => item.id === entry.target.id).url;
        observer.unobserve(entry.target);
      });
    }, option);
    const item = this.$target.querySelectorAll('.wrapper__item > img');
    item.forEach(el => io.observe(el));
  }
  scrollPaging(option) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.target.id === 'last' && entry.isIntersecting) {
        }
      });
    }, option);
    io.observe(document.getElementById('last'));
  }
}

// 이미지 보여야 할 시점 lazy loading
