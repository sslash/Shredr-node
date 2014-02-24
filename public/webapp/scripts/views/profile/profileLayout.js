define([
	'backbone',
	'hbs!tmpl/profile/profileLayout_tmpl',
	'hbs!tmpl/stage/stageKicker_tmpl',

	// views
	'views/stage/stageKicker',
	'views/profile/editProfileView'
],
function( Backbone, ProfileTmpl, StageKickerTmpl, StageKickerView, EditProfileView) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({
		className : 'container',

		initialize: function() {
			if ( this.model.get('id') === Shredr.user.get('_id')) {
				this.model.set({isUser : true});
			}
			this.listenTo(this.model, 'change', this.render);
			this.model.fetch();
		},
		
		template: ProfileTmpl,

		ui: {
			kicker : '#sr-stage-kicker',
			preview : '#preview-mode'
		},

		regions : {
			preview : '#preview-mode'
		},

		/* Ui events hash */
		events: {
			'click [data-event="edit-btn"]' : '__editClicked'
		},

		/* on render callback */
		onRender: function() {
			if ( this.model.get('birthdate') ) {
				this.model.setDateString();
			}
			this.ui.kicker.append( StageKickerTmpl({
				kicker : 'Profile Kicker',
				headline : 'Profile Headline'
			}) );
		},

		editProfileClosed : function () {
			Shredr.modal.close();
			this.$el.css({'opacity' : '1'});
		},

		__editClicked : function() {
			this.$el.css({'opacity' : '0.1'});
			var view = new EditProfileView({model : this.model, forceDna : true});
			this.listenTo(view, 'editProfile:canceled', this.editProfileClosed);
			this.listenTo(view, 'editProfile:success', this.editProfileClosed);
			Shredr.modal.show(view);
		}
	});

});
