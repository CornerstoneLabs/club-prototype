export class SituationModel {
    constructor (
        public id: number,
        public title: string,
        public content: string
    ) {
        console.log(arguments);
    }
}
