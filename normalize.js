var fs = require("fs"),
	recast = require('recast'),
	builder = recast.types.builders;;

function getOrThrow(object, argument) {
	if (object.hasOwnProperty(argument)) {
		return object[argument];
	}
	throw new Error('No property ' + argument + ' in ' + object);
}

function getOrDefault(object, argument, def) {
	return object.hasOwnProperty(argument)
		? object[argument]
		: def;
}

function normalizer(params) {
	return function () {
		var sourcePath = getOrThrow(params, 'source'),
			targetPath = getOrThrow(params, 'target'),
			encoding = getOrDefault(params, 'encoding', 'utf8'),
			ns = getOrThrow(params, 'namespace'); // TODO handle multiple namespaces
			
		var file = fs.readFileSync(sourcePath, encoding);
		var jsAst = recast.parse(file);
		var program = jsAst.program;

		program.body = program.body.filter(function (e) {
			return e.type !== 'VariableDeclaration'
		});

		var output = recast.print(jsAst).code;
		fs.writeFile(targetPath, output);
	}
}

module.exports = normalizer;