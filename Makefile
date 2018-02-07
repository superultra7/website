all:
	yarn install
	touch build
	rm -rf build
	node_modules/.bin/webpack --config webpack.config.js
	cp index.html build/
	cp style.css build/assets/
