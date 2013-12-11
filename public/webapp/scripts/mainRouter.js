define([
	'backbone',
	],function (Backbone) {

  var MainRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
		"theStage" : "stagePage",
		"*action" : "landingPage"
    },
  });

  return MainRouter;
});