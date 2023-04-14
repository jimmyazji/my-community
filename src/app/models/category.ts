export class Category {
    id?: number
    name: string = 'NaN'
    iconPath?: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}