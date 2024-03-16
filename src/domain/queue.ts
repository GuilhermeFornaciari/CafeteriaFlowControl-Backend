export default class Queue {
    constructor(readonly sequence: Array<String>) {}
    create() {
        return new Queue(this.sequence)
    }
}