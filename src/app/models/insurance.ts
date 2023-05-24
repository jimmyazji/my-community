export class Insurance {
    id!: number
    clinicId?: number
    name: string = 'NaN'
    iconPath?: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}