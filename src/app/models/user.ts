enum Gender {
    Male = 0,
    Female = 1
}

export class User {
    username: string = ''
    email: string = ''
    imagePath: string = ''
    name: string = ''
    phoneNumber: string = ''
    gender!: 0 | 1;
    getGender() {
        return Gender[this.gender]
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}