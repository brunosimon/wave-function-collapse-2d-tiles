import Cell from './Cell.js'

//       Directions
//
//        | yNeg |
// ----------------------
//   xNeg |      | xPos
// ----------------------
//        | yPos |


//    Indexes
//
//   0 | 1 | 2
// -------------
//   3 | 4 | 5
// -------------
//   6 | 7 | 8


//   0 | 1
// ---------
//   2 | 3

export default class Grid
{
    constructor(random, width, height)
    {
        this.random = random
        this.width = width
        this.height = height
        this.count = this.width * this.height

        this.setCells()
    }

    setCells()
    {
        this.cells = []

        // Initial cells
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                const index = this.coordToIndex(x, y)
                const cell = new Cell(this.random, index, x, y)
                this.cells.push(cell)
            }
        }

        // Update cells neighbours
        for(let y = 0; y < this.height; y++)
        {
            for(let x = 0; x < this.width; x++)
            {
                const cell = this.cells[y * this.width + x]
                cell.neighbours.xNeg = x === 0 ? null : this.cells[this.coordToIndex(cell.x - 1, cell.y)]
                cell.neighbours.xPos = x === this.width - 1 ? null : this.cells[this.coordToIndex(cell.x + 1, cell.y)]
                cell.neighbours.yNeg = y === 0 ? null : this.cells[this.coordToIndex(cell.x, cell.y - 1)]
                cell.neighbours.yPos = y === this.width - 1 ? null : this.cells[this.coordToIndex(cell.x, cell.y + 1)]
            }
        }
    }

    coordToIndex(x, y)
    {
        return y * this.width + x
    }

    getSmallestEntropyCells()
    {
        let cells = null
        let currentEntropy = Infinity
        
        for(const cell of this.cells)
        {
            if(!cell.collapsed)
            {
                const entropy = cell.modules.length
                if(entropy < currentEntropy)
                {
                    currentEntropy = entropy
                    cells = []
                }

                if(entropy === currentEntropy)
                {
                    cells.push(cell)
                }
            }
        }

        return cells
    }
}