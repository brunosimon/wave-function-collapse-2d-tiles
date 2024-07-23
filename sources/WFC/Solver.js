import Grid from './Grid.js'
import Rand from 'rand-seed'

export default class Solver
{
    constructor(width, height, seed = 'a')
    {
        this.width = width
        this.height = height
        this.seed = seed

        this.solved = false
        this.random = new Rand(seed)
        this.grid = new Grid(this.random, width, height)
        this.modules = []
    }

    setModules(modules)
    {
        this.modules = modules

        for(const cell of this.grid.cells)
            cell.setModules(this.modules)
    }

    step()
    {
        const cells = this.grid.getSmallestEntropyCells()

        if(cells === null)
        {
            this.solved = true
        }

        else
        {
            const cell = cells[Math.floor(this.random.next() * cells.length)] // TODO: Randomize

            if(cell)
                cell.collapse()
        }
    }

    solve()
    {
        let threshold = 999
        while(!this.solved && threshold-- > 0)
        {
            this.step()
        }
    }

    reset(width = null, height = null, seed = null)
    {
        this.width = width !== null ? width : this.width
        this.height = height !== null ? height : this.height
        this.seed = seed !== null ? seed : this.seed
        
        this.solved = false
        this.random = new Rand(seed)
        this.grid = new Grid(this.random, width, height)
    }
}