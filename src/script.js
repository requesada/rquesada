import './styles.css'
import { gsap } from 'gsap'

// Dynamically import images
const images = [
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

function createGrid() {
  const gridContainer = document.querySelector('.image-grid-container')
  gridContainer.innerHTML = ''

  images.forEach((src, index) => {
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

    const itemInner = gridItem.querySelector('.image-grid-item-inner')
    gridItem.addEventListener('mouseenter', () => {
      gsap.to(itemInner, { rotationY: 180, duration: 1, ease: 'power2.inOut' })
    })
    gridItem.addEventListener('mouseleave', () => {
      gsap.to(itemInner, { rotationY: 0, duration: 1, ease: 'power2.inOut' })
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  createGrid()

  document.querySelector('#content').style.display = 'flex'
  gsap.to("#content", {
    scale: 1,
    duration: 2,
    ease: "power2.out"
  })
})

if (module.hot) {
  module.hot.accept()
}
