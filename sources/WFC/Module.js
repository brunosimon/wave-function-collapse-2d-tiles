export default class Module
{
    constructor(data)
    {
        this.data = data
        this.sockets = { yNeg: '', yPos: '', xNeg: '', xPos: '' }
    }

    check(direction, socket)
    {
        return this.sockets[direction] === socket
    }
}