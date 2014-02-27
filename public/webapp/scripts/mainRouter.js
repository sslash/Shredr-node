define([
	'backbone',
	],function (Backbone) {

  var MainRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
		'theStage' : 'stagePage',
		'shreds' : 'stagePage',
		'shredroom': 'shredroom',
		'profiles' : 'profiles',
		'shred/:id' : 'shredPreview',
		'shredders/:id' : 'profile',
		'*action' : 'landingPage'
    },
  });

  return MainRouter;
});