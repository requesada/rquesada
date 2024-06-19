// import {gsap} from 'gsap'
import gsap from 'https://cdn.skypack.dev/gsap'

const backFace = document.querySelector('#back')
const leftFace = document.querySelector('#left')
const rightFace = document.querySelector('#right')
const topFace = document.querySelector('#top')
const bottomFace = document.querySelector('#bottom')

let width
let height

// const colors = ['#002d7a', '#b8d6bc']

const cuboidDepth = {value: 6000}

const changeDepth = () => {
  gsap.killTweensOf('.face')
  gsap.to(cuboidDepth, {
    value: 200,
    duration: 0.5,
    ease: 'power4.out',
    onUpdate: setCuboidTransforms,
    onComplete: () => {
      gsap.to('#left-container', {
        x: '-100%',
        ease: 'power4.out',
        duration: 0.5
      })
      gsap.to('#right-container', {
        x: '100%',
        ease: 'power4.out',
        duration: 0.5,
        onComplete: () => {
          document.querySelector('body').style.overflow = 'hidden visible'
          document.querySelector('.cuboid-container').style.position = 'static'
          document.querySelector('#roberto').style.filter = 'invert(94%) sepia(15%) saturate(403%) hue-rotate(67deg) brightness(92%) contrast(82%)'
          document.querySelector('#quesada').style.filter = 'invert(94%) sepia(15%) saturate(403%) hue-rotate(67deg) brightness(92%) contrast(82%)'
          document.querySelector('#top').style.backgroundColor = '#002d7a'
          document.querySelector('#left').style.backgroundColor = '#002d7a'
        }
      })
    }
  })
}

backFace.addEventListener('click', changeDepth)

const getDimensions = () => {
  width = window.innerWidth
  height = window.innerHeight
}

const formatTransform = (axis, deg, xPx, yPx, zPx) => {
  let rotation = ''
  if (axis) {
    rotation = `rotate${axis}(${deg}deg) `
  }
  return `${rotation}translate3d(${xPx}px, ${yPx}px, ${zPx}px)`
}

const setCuboidTransforms = () => {
  backFace.style.transform = formatTransform('Y', 0, 0, 0, -cuboidDepth.value)
  backFace.style.width = `${width}px`
  backFace.style.height = `${height}px`

  leftFace.style.transform = formatTransform('Y', -90, -cuboidDepth.value / 2, 0, cuboidDepth.value / 2)
  leftFace.style.width = `${cuboidDepth.value}px`
  leftFace.style.height = `${height}px`
  
  rightFace.style.transform = formatTransform('Y', 90, cuboidDepth.value / 2, 0, width - cuboidDepth.value / 2)
  rightFace.style.width = `${cuboidDepth.value}px`
  rightFace.style.height = `${height}px`

  topFace.style.transform = formatTransform('X', 90, 0, -cuboidDepth.value / 2, cuboidDepth.value / 2)
  topFace.style.width = `${width}px`
  topFace.style.height = `${cuboidDepth.value}px`
  
  bottomFace.style.transform = formatTransform('X', -90, 0, cuboidDepth.value / 2, height - cuboidDepth.value / 2)
  bottomFace.style.width = `${width}px`
  bottomFace.style.height = `${cuboidDepth.value}px`
}

const onResize = () => {
  getDimensions()
  setCuboidTransforms()
}
window.addEventListener('resize', onResize)

document.addEventListener('DOMContentLoaded', () => {
  getDimensions()
  setCuboidTransforms()
  document.querySelector('#cuboid').style.display = 'block'
})