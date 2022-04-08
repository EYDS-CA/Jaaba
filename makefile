
build:
	@rm -rf public/build
	@cp package.json server/package.json
	@cp yarn-lock.json server/yarn-lock.json
	@yarn build