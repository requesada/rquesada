// import {gsap} from 'gsap'
import gsap from 'https://cdn.skypack.dev/gsap'

const backFace = document.querySelector('#back')
const leftFace = document.querySelector('#left')
const topFace = document.querySelector('#top')

let width
let height

const cuboidDepth = {value: 6000}

const changeDepth = () => {
  gsap.to(cuboidDepth, {
    value: 200,
    duration: 1,
    onUpdate: setCuboidTransforms,
    ease: 'power1.in'
  })
}

backFace.addEventListener('click', changeDepth)

const getDimensions = () => {
  width = window.innerWidth - 10
  height = window.innerHeight - 10
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

  topFace.style.transform = formatTransform('X', 90, 0, -cuboidDepth.value / 2, cuboidDepth.value / 2)
  topFace.style.width = `${width}px`
  topFace.style.height = `${cuboidDepth.value}px`
}

const onResize = () => {
  getDimensions()
  setCuboidTransforms()
}
window.addEventListener('resize', onResize)

document.addEventListener('DOMContentLoaded', () => {
  getDimensions()
  setCuboidTransforms()
})