import { Insurance } from './insurance';
export class Provider {
    id!: number
    clinicId!: number
    name: string | null = null
    imagePath?: string = 'assets/images/clinic.jpeg'
    iconPath?: string = 'assets/images/clinic.jpeg'
    jurisdiction?: string
    description: string = ''
    workStartHour: Date = new Date
    workEndHour: Date = new Date
    rate?: 0
    insurances: Insurance[] = []
    recommendedByUser: boolean | null = null
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
