export class Post {
    id!: number
    imagePath?: string = ''
    videoPath?: string = ''
    videoThumbnailPath?: string = ''
    isFavourite: boolean = false

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
