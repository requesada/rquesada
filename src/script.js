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
const topBarWidth = topBar.getBoundingClientRect().width
const nameWidth = nameHeading.getBoundingClientRect().width
topBar.style.paddingLeft = `${(topBarWidth - nameWidth) / 2 + 4}px`

const menuItemPortfolio = document.querySelector('#menu-item-portfolio')
const menuItemResume = document.querySelector('#menu-item-resume')
const menuItemArray = [menuItemPortfolio, menuItemResume]

menuItemArray.forEach((element) => {
  const menuItemAnimation = gsap.to(element, {
    paused: true,
    color: color.primary,
    backgroundColor: color.secondary
  })

  console.log(`#${element.id.split('-')[2]}-anchor`)
  
  element.addEventListener('mouseenter', () => menuItemAnimation.play())
  element.addEventListener('mouseleave', () => menuItemAnimation.reverse())
  element.addEventListener('click', () => {
    gsap.to(window, {
      duration: 2,
      ease: 'power2.out',
      scrollTo: {
        y: `#${element.id.split('-')[2]}-anchor`,
        offsetY: 200
      }
    })
  })
})

gsap.to('#top-bar h1', {
  top: 0,
  ease: 'back.out'
})

gsap.to('.menu-item', {
  x: 0,
  duration: 2,
  ease: 'power4.out'
})

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
      gsap.to('#top-bar-menu > div', {
        top: '-100%'
      })
      gsap.to('.menu-item', {
        x: 0,
        duration: 1
      })
    },
    onLeave: () => {
      gsap.to(topBar, {
        borderBottomWidth: '3px',
        ease: 'power1.out'
      })
      gsap.to('#top-bar-menu > div', {
        top: 0,
        ease: 'back.out',
        stagger: 0.1
      })
      gsap.to('#menu-item-portfolio', {
        x: '148px'
      })
      gsap.to('#menu-item-resume', {
        x: '-148px'
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