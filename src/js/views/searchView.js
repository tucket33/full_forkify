/*25 */
class SearchView {
  _parentElement = document.querySelector('.search');
  //
  /*26   */
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  /*30 */
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  /*28  */
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
