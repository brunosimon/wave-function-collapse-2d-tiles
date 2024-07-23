export default class UI
{
    constructor(solver)
    {
        this.solver = solver

        // DOM Elements
        this.$ui = document.querySelector('.js-ui')
        this.$grid = this.$ui.querySelector('.js-grid')
        this.$resetButton = this.$ui.querySelector('.js-reset-button')
        this.$solveButton = this.$ui.querySelector('.js-solve-button')
        this.$progressiveSolveButton = this.$ui.querySelector('.js-progressive-solve-button')
        this.$stepButton = this.$ui.querySelector('.js-step-button')
        this.$seedInput = this.$ui.querySelector('.js-seed-input')

        // lines and cells
        this.cells = []

        for(let y = 0; y < this.solver.grid.height; y++)
        {
            const $line = document.createElement('div')
            $line.classList.add('line')
            this.$grid.append($line)

            for(let x = 0; x < this.solver.grid.width; x++)
            {
                const cell = {}
                cell.instance = this.solver.grid.cells[this.solver.grid.coordToIndex(x, y)]
                
                cell.$container = document.createElement('div')
                cell.$container.classList.add('cell')
                $line.append(cell.$container)

                this.cells.push(cell)
            }
        }

        // Interactions
        this.$resetButton.addEventListener('click', () =>
        {
            this.solver.reset()
            this.update()
        })

        this.$solveButton.addEventListener('click', () =>
        {
            this.solver.solve()
            this.update()
        })

        this.$progressiveSolveButton.addEventListener('click', () =>
        {
            this.progressiveSolve.start()
        })

        this.$stepButton.addEventListener('click', () =>
        {
            this.solver.step()
            this.update()
        })

        this.$seedInput.addEventListener('input', () =>
        {
            this.solver.random.str = this.$seedInput.value
        })

        this.setProgressiveSolve()

        // Update
        this.update()
    }

    setProgressiveSolve()
    {
        this.progressiveSolve = {}
        this.progressiveSolve.running = false
        this.progressiveSolve.duration = 50
        this.progressiveSolve.timeout = null
        this.progressiveSolve.update = () =>
        {
            if(!this.solver.solved)
            {
                this.solver.step()
                this.update()

                this.progressiveSolve.timeout = window.setTimeout(this.progressiveSolve.update, this.progressiveSolve.duration)
            }
            else
            {
                this.progressiveSolve.running = false
            }
        }
        this.progressiveSolve.start = () =>
        {
            this.progressiveSolve.running = true
            this.progressiveSolve.update()
        }
        this.progressiveSolve.pause = () =>
        {

        }
    }

    update()
    {
        for(const cell of this.cells)
        {
            if(cell.instance.collapsed)
            {
                cell.$container.style.backgroundImage = `url(${cell.instance.modules[0].data.tileSource})`
            }
        }
    }
}
