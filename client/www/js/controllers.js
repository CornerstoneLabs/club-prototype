angular
	.module('starter.controllers', [
		'app.config',
		'components.base-image',
		'controllers.app.controller',
		'repositories.news.factory',
		'repositories.brand.factory',
		'controllers.news.controller',
		'controllers.news-detail.controller',
		'repositories.classes.factory',
		'repositories.class-sessions.factory',
		'repositories.class-session-notification.factory',
		'controllers.classes.controller',
		'controllers.classes-detail.controller'
	]);
