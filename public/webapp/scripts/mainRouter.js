define([
	'backbone',
	],function (Backbone) {

  var MainRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
		'theStage' : 'stagePage',
		'shredroom': 'shredroom',
		'*action' : 'landingPage'
    },
  });

  return MainRouter;
});