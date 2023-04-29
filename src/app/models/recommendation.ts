export class Recommendation {
    upVotesPercentage: number = 100
    downVotesPercentage: number = 0

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}