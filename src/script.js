import './styles.css' // Have to import to bypass webpack MIME issue

if (module.hot) {
  module.hot.accept();
}