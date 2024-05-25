import './styles.css'

const flowers = [
  require('./images/flower1.jpg').default,
  require('./images/flower2.jpg').default,
  require('./images/flower3.jpg').default,
  require('./images/flower4.jpg').default,
  require('./images/flower5.jpg').default,
  require('./images/flower6.jpg').default,
  require('./images/flower7.jpg').default,
  require('./images/flower8.jpg').default,
  require('./images/flower9.jpg').default
]

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('.image-grid-container')
  gridContainer.innerHTML = '' // Hot loading causing event listener to fire twice?

  flowers.forEach((src, index) => {
    const gridItem = document.createElement('div')
    gridItem.className = 'image-grid-item'
    gridItem.innerHTML = `
      <div class="image-grid-item-inner">
        <div class="front-face"></div>
        <div class="back-face">
          <img src="${src}" alt="flower ${index + 1}">
        </div>
      </div>
    `
    gridContainer.appendChild(gridItem)
  })
})

if (module.hot) {
  module.hot.accept();
}