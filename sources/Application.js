import UI from './UI.js'
import Module from './WFC/Module.js'
import Solver from './WFC/Solver.js'

export default class Application
{
    constructor()
    {
        this.setSolver()
        this.ui = new UI(this.solver)
    }

    setSolver()
    {
        this.solver = new Solver(8, 8, 'f')

        const tileSources = [
            'tile_0000',
            'tile_0001',
            'tile_0002',
            'tile_0012',
            'tile_0013',
            'tile_0014',
            'tile_0024',
            'tile_0025',
            'tile_0026',
            'tile_0036',
            'tile_0037',
            'tile_0038',
            'tile_0039',
            'tile_0040',
            'tile_0041',
            'tile_0042',
        ]

        const modules = new Map()
        for(const tileSource of tileSources)
        {
            const module = new Module({ tileSource: `sources/tiles/${tileSource}.png` })
            modules.set(tileSource, module)
        }

        modules.get('tile_0000').sockets = { xNeg: 'ggg', xPos: 'ggg', yNeg: 'ggg', yPos: 'ggg' }
        modules.get('tile_0001').sockets = { xNeg: 'ggg', xPos: 'ggg', yNeg: 'ggg', yPos: 'ggg' }
        modules.get('tile_0002').sockets = { xNeg: 'ggg', xPos: 'ggg', yNeg: 'ggg', yPos: 'ggg' }
        modules.get('tile_0012').sockets = { xNeg: 'ggg', xPos: 'gdd', yNeg: 'ggg', yPos: 'gdd' }
        modules.get('tile_0013').sockets = { xNeg: 'gdd', xPos: 'gdd', yNeg: 'ggg', yPos: 'ddd' }
        modules.get('tile_0014').sockets = { xNeg: 'gdd', xPos: 'ggg', yNeg: 'ggg', yPos: 'ddg' }
        modules.get('tile_0024').sockets = { xNeg: 'ggg', xPos: 'ddd', yNeg: 'gdd', yPos: 'gdd' }
        modules.get('tile_0025').sockets = { xNeg: 'ddd', xPos: 'ddd', yNeg: 'ddd', yPos: 'ddd' }
        modules.get('tile_0026').sockets = { xNeg: 'ddd', xPos: 'ggg', yNeg: 'ddg', yPos: 'ddg' }
        modules.get('tile_0036').sockets = { xNeg: 'ggg', xPos: 'ddg', yNeg: 'gdd', yPos: 'ggg' }
        modules.get('tile_0037').sockets = { xNeg: 'ddg', xPos: 'ddg', yNeg: 'ddd', yPos: 'ggg' }
        modules.get('tile_0038').sockets = { xNeg: 'ddg', xPos: 'ggg', yNeg: 'ddg', yPos: 'ggg' }
        modules.get('tile_0039').sockets = { xNeg: 'gdd', xPos: 'ddd', yNeg: 'gdd', yPos: 'ddd' }
        modules.get('tile_0040').sockets = { xNeg: 'ddd', xPos: 'gdd', yNeg: 'ddg', yPos: 'ddd' }
        modules.get('tile_0041').sockets = { xNeg: 'ddd', xPos: 'ddg', yNeg: 'ddd', yPos: 'ddg' }
        modules.get('tile_0042').sockets = { xNeg: 'ddg', xPos: 'ddd', yNeg: 'ddd', yPos: 'gdd' }

        this.solver.setModules(modules)
        this.solver.step()
        // this.solver.solve()

        // this.solver.grid.cells[0].collapse(modules.get('tile_0001'))
    }
}