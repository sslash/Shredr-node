define([
	'backbone',
	'hbs!tmpl/stage/stage_tmpl',

	// Views
	'views/stage/stageKicker',
	'views/stage/welcomeBackView',
	'views/stage/thumbsColl',

	'views/stage/preview',

	// Collections
	'collections/shredsCollection'
],
function( Backbone, StageTmpl, StageKickerView, WelcomeBackView, 
			ThumbsCollView, PreviewView, ShredsCollection ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		className : 'container',

		initialize: function() {
			Shredr.vent.on('stage:thumbclicked:fadeout', this.renderPreviewView.bind(this));
			Shredr.vent.on('stage:thumbclicked:afterReorder', this.slideInPreview.bind(this));
			Shredr.vent.on('stage:kickerback:clicked', this.slideOutPreview.bind(this));

			// Register a requst respond function
			Shredr.reqres.setHandler('stage:thumbclicked:shouldfade', this.getIfShouldFade.bind(this));
		},
		
		template: StageTmpl,

		/* Layout sub regions */
		regions: {
			kicker : '#sr-stage-kicker',
			preview : '#sr-stage-preview'
		},

		/* ui selector cache */
		ui: {
			firstRow : '.sr-stage-firstrow .row',
			secondRow : '.sr-stage-secrow .row',
			thirdRow : '.sr-stage-thirdrow .row',
			fourthRow : '.sr-stage-fourthrow .row',
			fifthRow : '.sr-stage-fiftrow .row',
			sixtRow : '.sr-stage-sixtrow .row',
			seventhRow : '.sr-stage-seventhrow .row',
		},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {
			var coll = new ShredsCollection(Shredr.shreds.models.slice(0,4));
			var coll2 = new ShredsCollection(Shredr.shreds.models.slice(4,8));
			var coll3 = new ShredsCollection(Shredr.shreds.models.slice(8,12));
			var coll4 = new ShredsCollection(Shredr.shreds.models.slice(12,16));
			var coll5 = new ShredsCollection(Shredr.shreds.models.slice(16,20));
			var coll6 = new ShredsCollection(Shredr.shreds.models.slice(20,24));
			var coll7 = new ShredsCollection(Shredr.shreds.models.slice(24,28));
			var coll8 = new ShredsCollection(Shredr.shreds.models.slice(28,32));

			this.kicker.show( new StageKickerView() );

			// With large focus
			this.ui.firstRow.append( new WelcomeBackView().render().el );

			this.ui.firstRow.append( new ThumbsCollView({collection : coll}).render().el );

			// normal rows
			this.ui.secondRow.append( new ThumbsCollView({
				className : 'col-sm-12 stage-clear',
				itemClassname : 'col-sm-3 stage-block',
				collection : coll2
			}).render().el );

			this.ui.thirdRow.append( new ThumbsCollView({
				className : 'col-sm-12 stage-clear',
				itemClassname : 'col-sm-3 stage-block',
				collection : coll3
			}).render().el );

			// With large focus
			this.ui.fourthRow.append( new ThumbsCollView({
				collection : coll8
			}).render().el );
			this.ui.fourthRow.append( new WelcomeBackView({
				className : 'col-sm-6 stage-block stage-welcome right-large-focus',
			}).render().el );
			
			// normal rows
			this.ui.fifthRow.append( new ThumbsCollView({
				className : 'col-sm-12 stage-clear',
				itemClassname : 'col-sm-3 stage-block',
				collection : coll5
			}).render().el );

			this.ui.sixtRow.append( new ThumbsCollView({
				className : 'col-sm-12 stage-clear',
				itemClassname : 'col-sm-3 stage-block',
				collection : coll6
			}).render().el );

			this.ui.seventhRow.append( new ThumbsCollView({
				className : 'col-sm-12 stage-clear',
				itemClassname : 'col-sm-3 stage-block',
				collection : coll7
			}).render().el );
		},

		renderPreviewView : function(model) {
			var previewView = new PreviewView({model : model, fetch : true, includeUserInfo : true});
			this.preview.show(previewView);

			// In case its not garbage collected
			delete(this.previewView);
			this.previewView = previewView;

			// Try and set the height
			// var stageHeight = this.$el.height();
			// var navHeight = $('nav').height();
			// var kickerHeight = $('#sr-stage-kicker').height();
			// debugger

			// this.previewView.$el.height(stageHeight - navHeight - kickerHeight);
		},

		// This is triggered after each thumbview has possibly faded out.
		// Because its waiting on logo rotate, which is asynch
		slideInPreview : function() {
			if ( this.getIfShouldFade() ) {
				this.preview.$el.animate({'right' : '0'}, 'slow');
				this.hasSlid = true;
			}
		},

		slideOutPreview : function() {
			this.preview.$el.animate({'right' : '-2000px'}, 'slow');
			this.hasSlid = false;
		},

		getIfShouldFade : function() {
			return !this.hasSlid;
		}
	});

});
