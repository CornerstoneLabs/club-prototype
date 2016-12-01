export class NewsModel {
	constructor (
		public id: number,
		public title: string,
		public content: string,
		public author: string,
		public author_id: number,
		public date_published: string,
		public image_url: string,
		public published: boolean,
		public date_created: string
		) {
		console.log(arguments);
	}
}
