DEBUG=true

SCSS_BUILD_COMMAND="dart-sass scss/styles.scss ./styles.css"
SCSS_BUILD_MINIFIED_COMMAND="dart-sass scss/styles.scss ./styles.min.css --style=compressed --no-source-map"
JS_UGLIFY_COMMAND="uglifyjs --compress --mangle --output ./scripts.min.js -- ./scripts.js"

if ! $DEBUG || [[ $1 == "--release" ]]; then
	${SCSS_BUILD_MINIFIED_COMMAND}
	${JS_UGLIFY_COMMAND}
fi

if $DEBUG && [[ $# -eq 0 ]]; then
	inotifywait -r -m -e modify scss |
		while read path _ file; do
			if [[ $file == *"swp"* ]]; then
				continue
			fi

			${SCSS_BUILD_COMMAND}
		done
fi
