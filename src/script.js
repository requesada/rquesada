import './styles.css'
// import {gsap} from 'gsap'

class CoverGrid {
  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.grid = Array.from({length: rows}, () =>
      Array.from({length: columns}, () => ({ backgroundColor: 'white', adjacentSquares: {} }))
    )

    this.assignAdjacentSquares()
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
}

const coverGrid = new CoverGrid(3, 3)
console.log(coverGrid.grid)
