const { series, parallel, src, dest, watch, lastRun } = require("gulp");
const connect = require("gulp-connect");
const connectSSI = require("connect-ssi");
const fs = require("fs-extra");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync");

const scss = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");

const babel = require('gulp-babel');


const ROOT = "/";
const PORT = 8888;

function connectServer(done) {
	browserSync.init({
		server: {
			baseDir: "." + ROOT,
			index: "pages/index.html"
		},
		port: PORT,
		
	});

	/* connect.server({
		middleware: function () {
			return [
				connectSSI({
					baseDir: __dirname + ROOT,
					ext: ".html",
				}),
			];
		},
		livereload: true,
		root: "." + ROOT,
		host: "0.0.0.0",
		port: PORT,
	}); */
	done();
}

function fileInclude(done) {
	src([
		"./src/pages/**", // 불러올 파일의 위치
		"!" + "./src/pages/include/**", // 읽지 않고 패스할 파일의 위치
	])
		.pipe(
			fileinclude({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(dest("./pages")) // 변환한 파일의 저장 위치 지정
		.pipe(browserSync.reload({ stream: true }));
	done();
}

function scssCompile(done) {
	new Promise((resolve) => {
		let options = {
			outputStyle: "compressed", // expanded, compressed
			indentType: "tab", // space, tab
			indentWidth: 4, //
			precision: 8,
			sourceComments: true, // 코멘트 제거 여부
		};

		src("./src/scss/**/*.scss")
			.pipe(scss().on("error", scss.logError))
			.pipe(sourcemaps.init())
			.pipe(scss(options))
			.pipe(sourcemaps.write())
			.pipe(dest("./css"))
			.pipe(browserSync.reload({ stream: true }));
		resolve();
	});
	done();
}

function jsBuild(done){
	new Promise((resolve) => {
		src('./src/js/**.js')
			.pipe(babel({
				presets: ['@babel/preset-env']
			}))
			.pipe(dest('./js'))
			.pipe(browserSync.reload({ stream: true }));
	
		resolve();
	  });
	  done();
}

function watchAuto(done) {
	const _html = watch(["./src/**/*.html"]);
	const _scss = watch(["./src/scss/**/*.scss"]);
	const _js = watch(["./src/js/**/*.js"]);

	_html.on("all", function (path, stats) {
		console.log(path);
		console.log(stats);
		fileInclude(done);
	});
	_scss.on("all", function (path, stats) {
		console.log(path);
		console.log(stats);
		scssCompile(done);
	});
	_js.on('all', function(path, stats){
		console.log(path);
		console.log(stats);
		jsBuild(done);
	});
	done();
}

exports.fileInclude = fileInclude;
exports.server = connectServer;
exports.scssCompile = scssCompile;
exports.jsBuild = jsBuild;
exports.watch = watchAuto;
exports.default = series(
	parallel(fileInclude, scssCompile),
	jsBuild,
	connectServer,
	watchAuto
);

/*
exports.default = series(parallel(jsBuild),localExport,txtExport);*/

/**
 * note: GULP 명령어
 * html파일 인클루드 : gulp fileInclude
 * 서버띄우기 : gulp server
 * watch : gulp watch
 */

/**
1. 서버 띄우기
2. html include , 공통 요소 분리
3. css -> scss 전환
4. watch
*/
