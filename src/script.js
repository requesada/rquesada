// import {gsap} from 'gsap'
import gsap from 'https://cdn.skypack.dev/gsap'

class CoverGrid {
  constructor(container, rows, columns, squareSize) {
    this.container = document.querySelector(container)
    this.rows = rows
    this.columns = columns
    this.squareSize = squareSize
    this.grid = Array.from({length: rows}, () =>
      Array.from({length: columns}, () => ({backgroundColor: 'gray', adjacentSquares: {}}))
    )
  }

  getAdjacentSquares(row, column) {
    const adjacentSquares = {
      above: null,
      below: null,
      toLeft: null,
      toRight: null
    }

    const directions = {
      above: [-1, 0],
      below: [1, 0],
      toLeft: [0, -1],
      toRight: [0, 1]
    }

    for (const direction in directions) {
      const [dRow, dColumn] = directions[direction]
      const checkingRow = row + dRow
      const checkingColumn = column + dColumn

      if (checkingRow >= 0 && checkingRow < this.rows && checkingColumn >= 0 && checkingColumn < this.columns) {
        adjacentSquares[direction] = this.grid[checkingRow][checkingColumn]
      }
    }

    return adjacentSquares
  }

  assignAdjacentSquares() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        this.grid[row][column].adjacentSquares = this.getAdjacentSquares(row, column)
      }
    }
  }

  renderGrid() {
    this.container.style.display = 'grid'
    this.container.style.gridTemplateColumns = `repeat(${this.columns}, ${this.squareSize}px)`
    this.container.style.gridTemplateRows = `repeat(${this.rows}, ${this.squareSize}px)`

    this.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('grid-cell')
        cellElement.style.width = `${this.squareSize}px`
        cellElement.style.height = `${this.squareSize}px`
        cellElement.style.backgroundColor = cell.backgroundColor
        cellElement.textContent = `${rowIndex},${colIndex}` // TODO: Remove or replace
        this.container.appendChild(cellElement)
      })
    })
  }
}

const coverGrid = new CoverGrid('#grid-container', 3, 8, 50)

// Individual faces
// const frontFace = document.querySelector('#front')
const backFace = document.querySelector('#back')
const rightFace = document.querySelector('#right')
const leftFace = document.querySelector('#left')
const topFace = document.querySelector('#top')
const bottomFace = document.querySelector('#bottom')
const cuboid = document.querySelector('#cuboid')


let width
let height

// const cuboidWidth = width
// const cuboidHeight = height
const cuboidDepth = {value: 6000}
const perspectiveOrigin = {value: 50}

const changeDepth = () => {
  gsap.to(cuboidDepth, {
    value: 200,
    duration: 1,
    onUpdate: setCuboidTransforms,
    ease: 'power1.in'
  })
  gsap.to(perspectiveOrigin, {
    value: 100,
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
  cuboid.style.perspectiveOrigin = `${perspectiveOrigin.value}% 100%`

  // frontFace.style.width = `${width}px`
  // frontFace.style.height = `${height}px`

  backFace.style.transform = formatTransform('Y', 180, 0, 0, cuboidDepth.value)
  backFace.style.width = `${width}px`
  backFace.style.height = `${height}px`

  rightFace.style.transform = formatTransform('Y', 90, cuboidDepth.value / 2, 0, width - cuboidDepth.value / 2)
  rightFace.style.width = `${cuboidDepth.value}px`
  rightFace.style.height = `${height}px`

  leftFace.style.transform = formatTransform('Y', -90, -cuboidDepth.value / 2, 0, cuboidDepth.value / 2)
  leftFace.style.width = `${cuboidDepth.value}px`
  leftFace.style.height = `${height}px`

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
  coverGrid.assignAdjacentSquares()
  coverGrid.renderGrid()
  getDimensions()
  setCuboidTransforms()
})