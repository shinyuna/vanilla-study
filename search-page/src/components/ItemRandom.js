import Component from '../core/Component.js';

export class ItemRandom extends Component {
  template() {
    const { randomList } = this.$props;
    return `
      <div class="slider__btn">
      <button class="prev">⬅</button>
      <button class="next">➡</button>
      </div>
      <div class="slider__box">
        <ul class="slider__list">
          ${
            randomList.length === 0
              ? `<p class="slider__list-txt">🐈  곧 50 냥이가 도착한다 냥 🐈</p>`
              : randomList
                  .map(
                    item => `
                <li id="${item.id}" class="slider__list-item">
                  <img src="${item.url}" loading="lazy" alt="item.name"/>
                </li>
                `
                  )
                  .join('')
          }
        </ul>
      </div>
    `;
  }

  setEvent() {
    const { randomList } = this.$props;
    randomList.length !== 0 && this.slideAnimation(randomList);
  }

  slideAnimation(list) {
    const prev = this.$target.querySelector('.slider__btn .prev');
    const next = this.$target.querySelector('.slider__btn .next');
    const slider = this.$target.querySelector('.slider__box .slider__list');
    const firstChild = slider.firstElementChild.cloneNode(true);
    const lastChild = slider.lastElementChild.cloneNode(true);
    const length = list.length;
    const size = 330;
    let count = 1;

    slider.appendChild(firstChild);
    slider.insertBefore(lastChild, slider.firstElementChild);

    prev.addEventListener('click', e => {
      slider.style.transition = `transform ease-in-out 500ms`;
      count--;
      slider.style.transform = `translateX(-${count * size}px)`;
      if (count <= 0) {
        count = length - 4;
        setTimeout(() => {
          slider.style.transition = 'none';
          slider.style.transform = `translateX(-${count * size}px)`;
        }, 500);
      }
    });
    next.addEventListener('click', e => {
      slider.style.transition = `transform ease-in-out 500ms`;
      count++;
      slider.style.transform = `translateX(-${count * size}px)`;
      if (count >= length - 4) {
        count = 1;
        setTimeout(() => {
          slider.style.transition = 'none';
          slider.style.transform = `translateX(-${size}px)`;
        }, 500);
      }
    });
  }
}
