export class Service {
    id?: number
    name?: string
    iconPath?: string
    description?: string

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
