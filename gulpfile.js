const { src, dest } = require("gulp");
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

exports.default = function () {
    return src('src/*.js')
        .pipe(dest('dist/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('dist/'))
}