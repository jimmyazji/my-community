import { Provider } from "./provider"

export class Clinic {
    id: number | undefined
    name: string | null = null
    phoneNumber: string = ''
    description?: string
    rate?: number
    imagePath?: string = 'assets/images/clinic.jpeg'
    doctors: Provider[] = []

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
