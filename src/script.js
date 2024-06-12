// import {gsap} from 'gsap'
import gsap from 'https://cdn.skypack.dev/gsap'

const backFace = document.querySelector('#back')
const leftFace = document.querySelector('#left')
const rightFace = document.querySelector('#right')
const topFace = document.querySelector('#top')
const bottomFace = document.querySelector('#bottom')

let width
let height

const cuboidDepth = {value: 6000}

const lightColors = ['#002d7a', '#b8d6bc']

const randomActivation = setInterval(() => {
  const index = randomIndex()
  gsap.to(`#cell-${index}`, {
    backgroundColor: gsap.utils.random(lightColors),
    duration: randomDuration(),
    ease: 'elastic.out(1, 0.1)',
    onComplete: () => {
      if (!cascadeStarted) {
        gsap.to(`#cell-${index}`, {
          backgroundColor: 'black',
          duration: 0.25
        })
      }
    },
    onInterrupt: () => lightOff(`cell-${index}`)
  })
}, 1000)

let depthChanged = false
const changeDepth = () => {
  gsap.killTweensOf('.face')
  gsap.to(cuboidDepth, {
    value: 200,
    duration: 0.5,
    ease: 'power1.in',
    onUpdate: setCuboidTransforms,
    onComplete: () => {
    depthChanged = true,
    clearInterval(randomActivation)
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

const gridSide = 20
const root = document.querySelector(':root')
root.style.setProperty('--grid-side', gridSide)

const findAdjacentCells = (index) => {
  const row = Math.floor(index / gridSide)
  const col = index % gridSide

  const top = row > 0 ? `cell-${index - gridSide}` : null
  const bottom = row < gridSide - 1 ? `cell-${index + gridSide}` : null
  const left = col > 0 ? `cell-${index - 1}` : null
  const right = col < gridSide - 1 ? `cell-${index + 1}` : null

  return {adjacentCells: [top, bottom, left, right], isTriggered: false}
}

const randomIndex = gsap.utils.random(0, Math.pow(gridSide, 2) - 1, 1, true)
const randomDuration = gsap.utils.random(0.1, 2, 0.1, true)

let cascadeStarted = false
const lightOff = (cellID) => {
  if (depthChanged && !cascadeStarted) {
    gsap.killTweensOf(`#${cellID}`)
    gsap.to(`#${cellID}`, {
      backgroundColor: 'black',
      duration: 0
    })
  }
}
const lightOn = (cellID) => {
  if (depthChanged && !cascadeStarted) {
    gsap.to(`#${cellID}`, {
      backgroundColor: gsap.utils.random(lightColors),
      duration: 0.5,
      ease: 'elastic.out(1, 0.1)',
      onInterrupt: () => lightOff(cellID)
    })
  }
}

const triggerCascade = (cellID) => {
  if (depthChanged) {
    cascadeStarted = true
    if (cellID && !cellLayout[cellID].isTriggered) {
      gsap.killTweensOf(`#${cellID}`)
      gsap.to(`#${cellID}`, {
        backgroundColor: 'transparent',
        duration: 0.01,
        onComplete: () => {
          cellLayout[cellID].adjacentCells.forEach((cell) => triggerCascade(cell))
          cellLayout[cellID].isTriggered = true
        }
      })
    }
  }
}

const cellLayout = {}
const gridContainer = document.querySelector('#grid-container')
for (let i = 0; i < Math.pow(gridSide, 2); i++) {
  const gridCell = document.createElement('div')
  gridCell.className = 'grid-cell'
  // gridCell.textContent = i
  gridContainer.appendChild(gridCell)
  
  const cellID = `cell-${i}`
  gridCell.id = cellID
  cellLayout[cellID] = findAdjacentCells(i)
  document.querySelector(`#${cellID}`).addEventListener('mouseenter', () => lightOn(cellID))
  document.querySelector(`#${cellID}`).addEventListener('mouseleave', () => lightOff(cellID))
  document.querySelector(`#${cellID}`).addEventListener('click', () => triggerCascade(cellID))
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