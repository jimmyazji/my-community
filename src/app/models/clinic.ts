export class Clinic {
    id: number | undefined
    name: string | null = null
    phoneNumber: string = ''
    description?: string
    rating: number = 0
    imagePath?: string = '../../../assets/images/clinic.jpeg'

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
