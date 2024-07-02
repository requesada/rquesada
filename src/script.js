// import {gsap} from 'gsap'
// import {ScrollTrigger} from 'gsap/ScrollTrigger'
import gsap from 'https://cdn.skypack.dev/gsap'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger) 

gsap.to('.menu-item', {
  x: 0,
  y: 0,
  duration: 1
})

const topBar = document.querySelector('#top-bar')
const nameHeading = document.querySelector('#top-bar h1')
const topBarWidth = topBar.getBoundingClientRect().width
const nameWidth = nameHeading.getBoundingClientRect().width
topBar.style.paddingLeft = `${(topBarWidth - nameWidth) / 2 + 4}px`

gsap.to(topBar, {
  scrollTrigger: {
    scrub: true,
    trigger: '#menu-row',
    start: 'top top',
    end: 'bottom top',
    onEnterBack: () => {
      gsap.to(topBar, {
        borderBottomWidth: '0',
        ease: 'power1.out'
      })
    },
    onLeave: () => {
      gsap.to(topBar, {
        borderBottomWidth: '3px',
        ease: 'power1.out'
      })
    }
  },
  height: '3em',
  paddingLeft: 0,
})

gsap.fromTo(nameHeading, {
  fontSize: '6em'
},
{
    fontSize: '2em',
    scrollTrigger: {
      scrub: true,
      trigger: '#menu-row',
      start: 'top top',
      end: 'bottom top',
      onUpdate: () => {
        console.log({test: nameHeading.getBoundingClientRect().width})
      }
    }
})

gsap.to('#flower-five', {
  scrollTrigger: {
    scrub: true,
  },
  rotation: 180,
  transformOrigin: 'center center'
})

gsap.to('#flower-six', {
  scrollTrigger: {
    scrub: true,
  },
  rotation: -180,
  transformOrigin: 'center center'
})