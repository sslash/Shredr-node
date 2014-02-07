define([
	'backbone',
	],function (Backbone) {

  var MainRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
		'theStage' : 'stagePage',
		'shreds' : 'stagePage',
		'shredroom': 'shredroom',
		'profiles' : 'profiles',
		'*action' : 'landingPage'
    },
  });

  return MainRouter;
});