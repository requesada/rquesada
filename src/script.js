import './styles.css' // Have to import to bypass webpack MIME issue
import {gsap} from 'gsap'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#content').style.display = 'flex'
  gsap.to('#content', {
    scale: 1,
    duration: 2,
    ease: 'power2.out'
  })
})

if (module.hot) {
  module.hot.accept();
}