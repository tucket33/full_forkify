import recipeViews from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView';
import paginationView from './views/paginationView.js';
import * as model from './model.js';
import 'regenerator-runtime/runtime';
if (module.hot) {
  module.hot.accept();
}
// import 'core-js/stable';
//

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //
    if (!id) return;
    // marks selected srch result
    resultsView.update(model.getSearchResultsPerPage());
    bookmarksView.update(model.state.bookmarks);
    recipeViews.renderSpinner();
    // 1 first thing after cutting code to model--load recipe
    await model.loadRecipe(id);
    /*1.B, (THIS IS TEMPORARY) after,  head to the recipeView module*/
    // const { recipe } = model.state;
    /*3. Create an instance*/
    recipeViews.render(model.state.recipe);
  } catch (err) {
    /*21b) continued*/
    recipeViews.renderError();
  }
};
/*24  */
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    /*27 */
    const query = searchView.getQuery();
    if (!query) return;
    // load results
    await model.loadSearchResults(query);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPerPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotopage) {
  resultsView.render(model.getSearchResultsPerPage(gotopage));
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeViews.render(model.state.recipe);
  recipeViews.update(model.state.recipe);
  // controlServings();
};
//
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeViews.update(model.state.recipe);
  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
//
const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newrecipe){
  try{
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newrecipe);
    recipeViews.render(model.state.recipe);
    // display success msg
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close form
    setTimeout(function(){
      addRecipeView._toggleWindow();
    }, 2000)
  }catch(err){
    console.error(`🥩, err `);
    addRecipeView.renderError(err.message);
  }
}
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeViews.addHandlerRender(controlRecipes);
  recipeViews.addHandlerUpdateServings(controlServings);
  recipeViews.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
