all: clean client server

clean:
	rm -rf build

client:
	yarn install
	node_modules/.bin/webpack --config webpack.config.js
	cp index.html build/
	cp style.css build/assets/

server:
	(cd server ; yarn install; pkg server -o ../build/battleship-server)

.PHONY: clean client server
