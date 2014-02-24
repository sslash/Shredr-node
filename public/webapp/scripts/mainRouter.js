define([
	'backbone',
	],function (Backbone) {

  var MainRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
		'theStage' : 'stagePage',
		'shreds' : 'stagePage',
		'shredroom': 'shredroom',
		'profiles' : 'profiles',
		'shredders/:id' : 'profile',
		'*action' : 'landingPage'
    },
  });

  return MainRouter;
});