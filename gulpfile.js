const gulp = require('gulp');
const esbuild = require('gulp-esbuild');
const { exec } = require('child_process');

function bundle() {
	return gulp
		.src('./src/main.ts')
		.pipe(
			esbuild({
				outfile: 'game.js',
				sourcemap: 'both',
				bundle: true,
				target: ['es2016'],
				loader: {
					'.ts': 'ts',
					'.json': 'json',
				},
			})
		)
		.pipe(gulp.dest('./dist/'));
}

function copyPublic() {
	return gulp.src(['./public/**']).pipe(gulp.dest('./dist'));
}

function copyTextures() {
	return gulp.src('./src/assets/sprites/**').pipe(gulp.dest('./dist/assets/sprites'));
}

function watch() {
	exec('reload --browser --dir=dist --port=5000', (err) => {
		if (err) throw err;
	});

	return gulp.watch(['src/**/*.*', 'public/**.*'], copyAndBundle());
}

function copyAndBundle() {
	return gulp.series(copyPublic, copyTextures, bundle);
}

exports.bundle = copyAndBundle();
exports.watch = watch;
