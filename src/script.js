// import {gsap} from 'gsap'
// import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
// import {ScrollTrigger} from 'gsap/ScrollTrigger'
// import {TextPlugin} from 'gsap/TextPlugin'
import gsap from 'https://cdn.skypack.dev/gsap'
import ScrollToPlugin from 'https://cdn.skypack.dev/gsap/ScrollToPlugin'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger'
import TextPlugin from 'https://cdn.skypack.dev/gsap/TextPlugin'
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, TextPlugin)

const matchMedia = gsap.matchMedia()

const color = {
  primary: '#b8d6bc',
  secondary: '#002d7a'
}

let initialLoad = true
window.addEventListener('resize', () => {
  initialLoad = false
})

const topBar = document.querySelector('#top-bar')
const nameHeading = document.querySelector('#top-bar h1')
const menuRow = document.querySelector('#menu-row')
const menuItemPortfolio = document.querySelector('#menu-item-portfolio')
const menuItemResume = document.querySelector('#menu-item-resume')
const topBarMore = document.querySelector('#top-bar-more')
const dropdown = document.querySelector('#dropdown')

const topBarMenuItems = document.querySelectorAll('.top-bar-menu-item')
const dropdownMenuItems = document.querySelectorAll('.dropdown-menu-item')
const menuItemArray = [menuItemPortfolio, menuItemResume, ...topBarMenuItems, ...dropdownMenuItems]
const sectionTitleNodes = document.querySelectorAll('.section-title')

let isDropdownOpen = false

nameHeading.innerText = 'Roberto Quesada'

const switchToTopBar = () => {
  gsap.to(topBar, {
    height: '3rem',
    paddingTop: 0,
    color: color.primary,
    borderBottomWidth: '3px'
  })
  gsap.to(nameHeading, {
    fontSize: '2rem',
    duration: 0
  })
  gsap.to(nameHeading, {
    top: 1,
    duration: 2,
    ease: 'power4.out'
  })
  gsap.to('#top-bar-menu', {
    top: 0,
    duration: 0
  })
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

const initialTopBar = () => {
  gsap.to(topBar, {
    height: '3rem',
    paddingTop: 0,
    color: color.primary,
    borderBottomWidth: '3px',
    duration: 0
  })
  gsap.to(nameHeading, {
    fontSize: '2rem',
    top: 1,
    duration: 0
  })
  gsap.to('#top-bar-menu > div', {
    top: 0,
    duration: 0
  })
  gsap.to(menuItemPortfolio, {
    x: '100%',
    duration: 0
  })
  gsap.to(menuItemResume, {
    x: '-100%',
    duration: 0
  })
}

matchMedia.add('(orientation: portrait) or (max-width: 699px)', () => {
  if (!initialLoad) {
    switchToTopBar()
  } else {
    initialTopBar()
  }
})

const closeDropdown = () => {
  dropdownOpen.pause(0)
    isDropdownOpen = false
}

document.addEventListener('click', () => {
  if (isDropdownOpen) {
    closeDropdown()
  }
})

const dropdownOpen = gsap.to(dropdown, {
  display: 'block',
  paused: true,
  onComplete: () => {
    isDropdownOpen = true
  }
})

topBarMore.addEventListener('click', () => {
  if (dropdownOpen.isActive() || isDropdownOpen) {
    closeDropdown()
  } else {
    dropdownOpen.play()
  }
})

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
        offsetY: identifier === 'arrow' ? 0 : element.id.includes('top') || element.className.includes('dropdown') ? 100 : 200
      }
    })
  })
})

matchMedia.add('(orientation: landscape) and (min-width: 700px)', () => {
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
  gsap.to(nameHeading, {
    top: 1,
    duration: 2,
    ease: 'power4.out'
  })
  gsap.to('.menu-item', {
    x: 0,
    duration: 2,
    ease: 'power4.out'
  })
})

matchMedia.add('(max-width: 699px)', () => {
  gsap.to(nameHeading, {
    duration: 0,
    text: 'RQuesada',
    ease: 'none'
  })
})

matchMedia.add('(max-width: 550px)', () => {
  gsap.to(['#top-bar-portfolio', '#top-bar-resume'], {
    display: 'none',
    duration: 0
  })
  gsap.to('#top-bar-more', {
    display: 'block'
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