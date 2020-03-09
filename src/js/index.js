import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

// global state of the app
// -- Search Object
// -- Current Recipe Object
// -- Shopping List Object
// -- Liked Receipes Object
const state = {};

/*
 ** Search Controller
 */
const controlSearch = async () => {
  // 1) Get query from the view
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    console.log(goToPage);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/*
 ** Recipe Controller
 */

const r = new Recipe(47746);
r.getRecipe();
console.log(r);
