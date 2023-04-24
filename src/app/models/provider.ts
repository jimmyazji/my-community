import { Insurance } from './Insurance';
export class Provider {
    id?: number
    name: string | null = null
    imagePath?: string = 'assets/images/clinic.jpeg'
    iconPath?: string = 'assets/images/clinic.jpeg'
    jurisdiction?: string
    description: string = ''
    workStartHour: Date = new Date
    workEndHour: Date = new Date
    rate?: 0
    insurances: Insurance[] = []
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
