export class Review {
    id?: number
    userName?: string
    userImagePath?: string
    rate?: number
    content?: string

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}