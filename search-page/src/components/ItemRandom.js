import Component from '../core/Component.js';

export class ItemRandom extends Component {
  template() {
    const { randomList } = this.$props;
    console.log('🚀 ~ template ~ randomList', randomList);
    return `
      <div class="slider__btn">
      <button class="prev">왼쪽</button>
      <button class="next">오른쪽</button>
      </div>
      <div class="slider__box">
        ${randomList
          .map(
            item => `
          <article id="${item.id}" class="slider__item">
            <img src="${item.url}" alt="item.name"/>
          </article>
        `
          )
          .join('')}
      </div>
    `;
  }
}

// 화면에 5개만 노출, 좌우 슬라이드 이동, 트렌지션
