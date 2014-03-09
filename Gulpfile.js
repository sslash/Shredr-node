var gulp = require('gulp'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	path = require('path'),
	refresh = require('gulp-livereload'),
	eslint = require('gulp-eslint'),
	lr = require('tiny-lr');
var server = lr();

var dir = 'public/webapp/';

var scriptsDir = ['public/webapp/**/*.js'];


gulp.task('less', function () {
  gulp.src([dir + 'css/application.less'])
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
    }))
    .pipe(gulp.dest(dir + 'css/dist'));
});

gulp.task('lint', function() {
	return gulp.src('app/models/user.js')
		.pipe(eslint({
			config: 'eslint.json'
		}))
		.pipe(eslint.format());
});

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', function() {  
    gulp.run('lr-server', 'less');

    gulp.watch(dir + 'css/**', function(event) {
        gulp.run('less');
    })
})