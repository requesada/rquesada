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
// const menuRow = document.querySelector('#menu-row')
const menuItemPortfolio = document.querySelector('#menu-item-portfolio')
const menuItemResume = document.querySelector('#menu-item-resume')
const topBarMore = document.querySelector('#top-bar-more')
const dropdown = document.querySelector('#dropdown')
const slideButtonLeft = document.querySelector('.slide-button.left')
const slideButtonRight = document.querySelector('.slide-button.right')

const topBarMenuItems = document.querySelectorAll('.top-bar-menu-item')
const dropdownMenuItems = document.querySelectorAll('.dropdown-menu-item')
const slideButtons = document.querySelectorAll('.slide-button')
const menuItemArray = [menuItemPortfolio, menuItemResume, ...topBarMenuItems, ...dropdownMenuItems, ...slideButtons]
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
  gsap.to('#top-bar-menu', {
    top: 0,
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

let showcaseSlideIndex = 0
const showSlide = (currentSlideIndex) => {
  const slides = document.querySelectorAll('.showcase-gif')
  if (currentSlideIndex === 'all') {
    showcaseSlideIndex = 0
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'block'
      gsap.to(slides[i], {
        opacity: 1,
        duration: 0
      })
    }
    for (let i = 0; i < slideButtons.length; i++) {
      slideButtons[i].style.display = 'none'
    }
  } else {
    if (currentSlideIndex > slides.length - 1) {showcaseSlideIndex = 0}
    if (currentSlideIndex < 0) {showcaseSlideIndex = slides.length - 1}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none'
      gsap.to(slides[i], {
        opacity: 0,
        duration: 0,
        ease: 'none'
      })
    }
    for (let i = 0; i < slideButtons.length; i++) {
      slideButtons[i].style.display = 'flex'
    }
    slides[showcaseSlideIndex].style.display = 'block'
    gsap.to(slides[showcaseSlideIndex], {
      opacity: 1,
      duration: 0.5
    })
    const slideLocation = slides[showcaseSlideIndex].src
    // Reset location to start gif from beginning
    slides[showcaseSlideIndex].src = ''
    slides[showcaseSlideIndex].src = slideLocation
  }
}

const changeSlide = (increment) => {
  showSlide(showcaseSlideIndex += increment)
}
slideButtonLeft.addEventListener('click', () => {
  changeSlide(-1)
})
slideButtonRight.addEventListener('click', () => {
  changeSlide(1)
})

// TODO: Block screens

matchMedia.add('(orientation: portrait) or (max-width: 699px)', () => {
  if (!initialLoad) {
    switchToTopBar()
  } else {
    initialTopBar()
  }
  showSlide(showcaseSlideIndex)
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
        gsap.to('#top-bar-menu', {
          top: '-500%',
          duration: 0
        })
        gsap.to('#top-bar-menu > div', {
          top: '-500%'
        })
        gsap.to('.menu-item', {
          x: 0,
          duration: 1
        })
      },
      onLeave: () => {
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
  showSlide('all')
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