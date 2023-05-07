export class User {
    username: string = ''
    email: string = ''
    imagePath: string = ''
    name: string = ''
    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}