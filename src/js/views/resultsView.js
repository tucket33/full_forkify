import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query!`;
  _message = ``;
  _generateMarkup() {
    return this._data.map(result => previewView.render(result,false)).join();
  }
}
export default new ResultsView();
