install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest
