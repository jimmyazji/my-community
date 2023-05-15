export class Post {
    id!: number
    imagePath?: string = ''
    videoPath?: string = ''
    videoThumbnailPath?: string = ''
    isFavourite: boolean = false
    clinicWebSiteUrl: string | null = null

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
