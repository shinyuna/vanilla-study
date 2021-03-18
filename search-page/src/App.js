import Component from './core/Component.js';
import ItemSearch from './components/ItemSearch.js';
import { API } from './api/index.js';
import { ItemLoading } from './components/ItemLoading.js';
import { Item } from './components/Item.js';
import { ItemRandom } from './components/ItemRandom.js';

export default class App extends Component {
  setup() {
    this.$state = {
      catList: this.getStorage('last_search') || [],
      randomList: [],
      isLoading: false,
      noticeMessage: '',
      latelySearchKeyword: this.getStorage('search_keyword') || [],
    };
  }

  template() {
    return `
      <header data-component="item-header" class="header"></header>
      <main>
        <section data-component="item-slide" class="slide"></section>
        <section data-component="item-main" class="wrapper"></section>
      </main>
      <div data-component="item-modal"></div>
    `;
  }

  mounted() {
    const $itemHeader = this.$target.querySelector('[data-component="item-header"]');
    const $itemSlide = this.$target.querySelector('[data-component="item-slide"]');
    const $itemMain = this.$target.querySelector('[data-component="item-main"]');
    const $itemModal = this.$target.querySelector('[data-component="item-modal"]');

    new ItemSearch($itemHeader, {
      searchCats: this.searchCats.bind(this),
      latelySearchKeyword: this.$state.latelySearchKeyword,
    });

    new ItemRandom($itemSlide, {
      randomList: this.$state.randomList,
    });

    new Item($itemMain, {
      catList: this.$state.catList,
      noticeMessage: this.$state.noticeMessage,
    });

    if (this.$state.isLoading) {
      new ItemLoading($itemModal);
    }
  }

  setEvent() {
    this.getRandom();
  }

  setStorage(key, item) {
    window.sessionStorage.setItem(key, JSON.stringify(item));
  }
  getStorage(item) {
    const result = window.sessionStorage.getItem(item);
    return result && JSON.parse(result);
  }

  async getRandom() {
    try {
      const randomList = this.$state.randomList;
      const { data } = await API.randomCats();
      this.setState({
        randomList: [data, ...randomList],
      });
    } catch (error) {
      console.log('🚀 ~ getRandom ~ error', error);
    }
  }

  async searchCats(searchData) {
    try {
      this.setState({ isLoading: true });
      const { data: cats } = await API.getCats(searchData);
      if (!cats || cats.length === 0) {
        this.setState({
          isLoading: false,
          catList: cats,
          noticeMessage: '검색 결과가 없다 냥, 다시 검색해라 냥 😹',
        });
      } else {
        this.setState({
          isLoading: false,
          catList: cats,
          noticeMessage: '',
        });
        this.setStorage('last_search', cats);
      }
      this.updateSearchKeyword(searchData);
    } catch (error) {
      this.setState({
        isLoading: false,
        noticeMessage: '문제가 생겼다 냥, 다시 검색 부탁한다 냥 🙀',
      });
      console.log('🚀 ~ searchCats ~ error', error);
    }
  }

  updateSearchKeyword(keyword) {
    const state = this.$state.latelySearchKeyword;
    const index = state.indexOf(keyword);

    if (index > -1) {
      state.splice(index, 1);
    }
    if (state.length > 4) {
      state.shift();
    }
    this.setState({
      latelySearchKeyword: [keyword, ...state],
    });
    this.setStorage('search_keyword', this.$state.latelySearchKeyword);
  }
}
