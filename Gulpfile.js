var gulp = require('gulp'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	path = require('path'),
	refresh = require('gulp-livereload'),
	lr = require('tiny-lr');
var server = lr();

gulp.task('less', function () {
  gulp.src(['public/webapp/css/application.less'])
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
    }))
    .pipe(gulp.dest('public/webapp/css/dist'));
});

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', function() {  
    gulp.run('lr-server', 'less');

    // gulp.watch('src/**', function(event) {
    //     gulp.run('scripts');
    // })

    gulp.watch('public/webapp/css/**', function(event) {
        gulp.run('less');
    })
})