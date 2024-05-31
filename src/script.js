import './styles.css'
// import {gsap} from 'gsap'

class CoverGrid {
  constructor(container, rows, columns, squareSize) {
    this.container = document.querySelector(container)
    this.rows = rows
    this.columns = columns
    this.squareSize = squareSize
    this.grid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ backgroundColor: 'gray', adjacentSquares: {} }))
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

// Cuboid faces
const frontFace = document.querySelector('#front')
const backFace = document.querySelector('#back')
const rightFace = document.querySelector('#right')
const leftFace = document.querySelector('#left')
const topFace = document.querySelector('#top')
const bottomFace = document.querySelector('#bottom')

const cuboidWidth = 300
const cuboidHeight = 300
const cuboidDepth = 300

let width
let height

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
  frontFace.style.transform = formatTransform(0, 0, (width - cuboidWidth) / 2, (height - cuboidHeight) / 2, 0)
  backFace.style.transform = formatTransform('Y', 180, (cuboidWidth - width) / 2, (height - cuboidHeight) / 2, cuboidDepth)
  rightFace.style.transform = formatTransform('Y', 90, cuboidDepth / 2, (height - cuboidHeight) / 2, width / 2)
  leftFace.style.transform = formatTransform('Y', -90, -cuboidDepth / 2, (height - cuboidHeight) / 2, cuboidWidth - width / 2)
  topFace.style.transform = formatTransform('X', 90, (width - cuboidWidth) / 2, -cuboidDepth / 2, cuboidHeight - height / 2)
  bottomFace.style.transform = formatTransform('X', -90, (width - cuboidWidth )/ 2, cuboidDepth / 2, height / 2)
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