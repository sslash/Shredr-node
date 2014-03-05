define([
	'backbone.marionette',
	],function (Marionette) {

  var MainRouter = Marionette.AppRouter.extend({
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