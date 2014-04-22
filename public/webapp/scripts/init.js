require.config({
    /* starting point for application */
    deps: ['backbone.marionette', 'main'],


    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        jcrop : {
            deps: ['jquery'],
            exports: 'jcrop'
        },

        autocomplete : {
            deps: ['jquery'],
            exports: 'autocomplete'
        }
    },

    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        jcrop: '../bower_components/jcrop/js/jquery.Jcrop',

        /* alias all marionette libs */
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        autocomplete: 'vendor/jquery-ui-drag-auto-1.10.4.custom', // includes jquery ui core, widget, position, menu
        //autocomplete: 'vendor/jquery-ui-1.10.4.custom', // includes jquery ui core, widget, position, menu
        //autocomplete: 'vendor/jquery-ui-1.10.4.custom', // includes jquery ui core, widget, position, menu

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',
        tmpl: "../templates",

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs'
    },

    hbs: {
        disableI18n: true
    }
});
