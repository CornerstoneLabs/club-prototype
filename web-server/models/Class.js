var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Class Model
 * ==========
 */

var Class = new keystone.List('Class', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Class.add({
	title: { type: String, required: true },
	day: { type: Types.Select, options: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday', default: 'Monday', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		details: { type: Types.Html, wysiwyg: true, height: 1000 }
	}
});

Class.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Class.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Class.register();
