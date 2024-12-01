const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const webpack      = require('webpack-stream');
const ts           = require("gulp-typescript");
const tsProject    = ts.createProject("tsconfig.json");
const rename       = require("gulp-rename");

// gulp.task('server', function() {
//     browserSync({
//         server: {
//             baseDir: "dist"
//         }
//     });
//     gulp.watch("src/*.html").on('change', browserSync.reload);
// });

gulp.task('build-styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('copy-html', () => {
    return gulp
        .src("./src/index.html")
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});

gulp.task('copy-fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('copy-assets', function() {
    gulp.src("./src/icons/**/*.*", {encoding: false})
        .pipe(gulp.dest('./dist/icons'));
    
    return gulp
        .src("src/img/**/*.*", {encoding: false})
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('build-js', () => {
    return gulp
        .src("./src/js/index.js")
        .pipe(
            webpack({
                mode: "development",
				entry: './src/js/index.js',
				output: {
					filename: "script.js",
				},
                watch: false,
				devtool: "source-map",
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
							exclude: /(node_modules|bower_components)/,
                            use: 'babel-loader'
                        }
                    ]
                }
            })
        )
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// gulp.task('build-ts', () => {
//     return gulp
//         .src("./src/ts/index.ts")
//         .pipe(
//             webpack({
//                 mode: "development",
// 				entry: './src/ts/index.ts',
// 				output: {
// 					filename: "bundle.ts",
// 				},
//                 watch: false,
// 				devtool: "source-map",
//                 module: {
//                     rules: [
//                         {
//                             test: /\.m?ts$/,
// 							exclude: /(node_modules|bower_components)/,
//                             use: 'ts-loader'
//                         }
//                     ]
//                 }
//             })
//         )
//         .pipe(gulp.dest("./src/ts"))
//         .pipe(browserSync.stream());
// });

// gulp.task('compile-ts', function () {
//     return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("src/js"));
// });

gulp.task('build', () => {
    gulp.parallel('copy-html', 'build-styles', 'copy-fonts', 'copy-assets', 'build-js')
});

gulp.task('watch', () => {
    browserSync.init({
		server: "./dist/",
		port: 4000,
		notify: true,
	});

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
	gulp.watch("./src/icons/**/*.*", gulp.parallel("copy-assets"));
	gulp.watch("./src/img/**/*.*", gulp.parallel("copy-assets"));
	gulp.watch("./src/sass/**/*.(sass|scss)", gulp.parallel("build-styles"));
	gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task('default', gulp.parallel('build', 'watch'))

// gulp.task('styles', function() {
//     return gulp.src("src/sass/**/*.+(scss|sass)")
//         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//         .pipe(rename({suffix: '.min', prefix: ''}))
//         .pipe(autoprefixer())
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(gulp.dest("dist/css"))
//         .pipe(browserSync.stream());
// });

// gulp.task('watch', function() {
//     gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
//     gulp.watch("src/*.html").on('change', gulp.parallel('html'));
//     gulp.watch("src/ts/*.ts").on('change', gulp.parallel('compiler'));
//     gulp.watch("src/js/*.js").on('change', gulp.parallel('scripts'));
// });

// gulp.task('compiler', function () {
//     return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("src/js"));
// });

// gulp.task('html', function () {
//     return gulp.src("src/*.html")
//         .pipe(gulp.dest("dist/"));
// });

// gulp.task('scripts', function () {
//     return gulp.src("src/js/**/*.js")
//         .pipe(gulp.dest("dist/js"));
// });

// gulp.task('fonts', function () {
//     return gulp.src("src/fonts/**/*")
//         .pipe(gulp.dest("dist/fonts"));
// });

// gulp.task('icons', function () {
//     return gulp.src("src/icons/**/*", {encoding: false})
//         .pipe(gulp.dest("dist/icons"));
// });

// gulp.task('images', function () {
//     return gulp.src('./src/img/**/*.*', {encoding: false})
//         .pipe(gulp.dest('./dist/img'));
// });

// gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'compiler', 'scripts', 'fonts', 'icons', 'images'));