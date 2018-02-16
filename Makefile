all: client server

client:
	yarn install
	touch build
	rm -rf build
	node_modules/.bin/webpack --config webpack.config.js
	cp index.html build/
	cp style.css build/assets/

server:
	rm battleship-server || true
	make battleship-server

battleship-server:
	(cd server ; yarn install; pkg server -o ../battleship-server)

.PHONY: client server
