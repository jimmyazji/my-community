export class Location {
    id?: number
    name?: string
    phoneNumber?: string
    longitude?: number
    latitude?: number

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}