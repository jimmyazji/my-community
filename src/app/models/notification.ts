export class Notification {
    id!: number
    title!: string
    body!: string
    isSeen?: boolean = false
    imagePath!: string
    isSucceeded: boolean = false
    type: number = 1
    creationTime: Date = new Date
    name!: string
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}