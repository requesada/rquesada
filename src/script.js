// import {gsap} from 'gsap'
// import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
// import {ScrollTrigger} from 'gsap/ScrollTrigger'
import gsap from 'https://cdn.skypack.dev/gsap'
import ScrollToPlugin from 'https://cdn.skypack.dev/gsap/ScrollToPlugin'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const color = {
  primary: '#b8d6bc',
  secondary: '#002d7a'
}

const topBar = document.querySelector('#top-bar')
const nameHeading = document.querySelector('#top-bar h1')
const menuRow = document.querySelector('#menu-row')
const menuItemPortfolio = document.querySelector('#menu-item-portfolio')
const menuItemResume = document.querySelector('#menu-item-resume')
const topBarMenuItems = document.querySelectorAll('.top-bar-menu-item')
const menuItemArray = [menuItemPortfolio, menuItemResume, ...topBarMenuItems]
const sectionTitleNodes = document.querySelectorAll('.section-title')

menuItemArray.forEach((element) => {
  const menuItemAnimation = gsap.to(element, {
    paused: true,
    color: color.primary,
    backgroundColor: color.secondary,
    duration: 0.25,
    ease: 'power4.out'
  })

  element.addEventListener('mouseenter', () => menuItemAnimation.play())
  element.addEventListener('mouseleave', () => menuItemAnimation.reverse())
  
  const identifier = element.id.split('-')[2]
  const sectionElement = Array.from(sectionTitleNodes).find((node) => node.innerText.toLowerCase() === element.innerText.toLowerCase())

  element.addEventListener('click', () => {
    gsap.to(window, {
      duration: 2,
      ease: 'power2.out',
      scrollTo: {
        y: identifier === 'arrow' ? 0 : sectionElement,
        offsetY: identifier === 'arrow' ? 0 : element.id.includes('top') ? 100 : 200
      }
    })
  })
})

gsap.to('#top-bar h1', {
  top: 0,
  duration: 2,
  ease: 'power4.out'
})

gsap.to('.menu-item', {
  x: 0,
  duration: 2,
  ease: 'power4.out'
})

const matchMedia = gsap.matchMedia()

// matchMedia.add('(min-width: 800px)', () => {
  gsap.to(topBar, {
    scrollTrigger: {
      scrub: 0.5,
      trigger: '#menu-row',
      start: 'top top',
      end: 'bottom top',
      onEnterBack: () => {
        gsap.to('#top-bar-menu > div', {
          top: '-500%'
        })
        gsap.to('.menu-item', {
          x: 0,
          duration: 1
        })
      },
      onLeave: () => {
        gsap.to('#top-bar-menu > div', {
          top: 0,
          ease: 'power4.out',
          stagger: 0.1
        })
        gsap.to(menuItemPortfolio, {
          x: '100%'
        })
        gsap.to(menuItemResume, {
          x: '-100%'
        })
      }
    },
    height: '3rem',
    paddingTop: 0,
    color: color.primary,
    borderBottomWidth: '3px'
  })
  
  gsap.to(nameHeading, {
      fontSize: '2rem',
      scrollTrigger: {
        scrub: true,
        trigger: '#menu-row',
        start: 'top top',
        end: 'bottom top',
      }
  })
// })

matchMedia.add('(orientation: portrait)', () => {
  gsap.to('#flower-vase-container', {
    borderWidth: 0
  })
})

gsap.to('#flower-five', {
  scrollTrigger: {
    scrub: 2,
  },
  rotation: 180,
  transformOrigin: 'center center'
})

gsap.to('#flower-six', {
  scrollTrigger: {
    scrub: 2,
  },
  rotation: -180,
  transformOrigin: 'center center'
})