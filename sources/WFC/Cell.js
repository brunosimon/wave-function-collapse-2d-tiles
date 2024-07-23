export default class Cell
{
    collapsed = false
    needsCheck = false

    constructor(random, index, x, y)
    {
        this.random = random
        this.index = index
        this.x = x
        this.y = y

        this.neighbours = { yNeg: null, yPos: null, xNeg: null, xPos: null }
    }

    setModules(modules)
    {
        this.modules = [...modules.values()]
    }

    collapse(module = null)
    {
        this.collapsed = true

        // Forced module
        if(module !== null)
        {
            if(!this.modules.includes(module))
            {
                console.log('module', module, 'not available in', this.modules)
            }
            else
            {
                this.modules = [module]
            }
        }

        // Random module
        else
        {
            const randomIndex = Math.floor(this.random.next() * this.modules.length)

            this.modules = [this.modules[randomIndex]]
            if(this.x === 0 && this.y === 2)
            {
                console.log(this.modules[randomIndex])
                console.log(this.modules)
            }
        }

        this.neighbours.xNeg?.checkModules('xPos', this.modules)
        this.neighbours.xPos?.checkModules('xNeg', this.modules)
        this.neighbours.yNeg?.checkModules('yPos', this.modules)
        this.neighbours.yPos?.checkModules('yNeg', this.modules)
    }

    checkModules(direction, againstModules)
    {
        const filteredModules = []
        for(const currentModule of this.modules)
        {
            for(const againstModule of againstModules)
            {
                const oppositeDirections = { xPos: 'xNeg', xNeg: 'xPos', yPos: 'yNeg', yNeg: 'yPos' }
                const oppositeDirection = oppositeDirections[direction]
                const isCompatible = currentModule.check(direction, againstModule.sockets[oppositeDirection])

                if(isCompatible)
                    filteredModules.push(currentModule)
            }
        }

        this.modules = filteredModules
    }
}