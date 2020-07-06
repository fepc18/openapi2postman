'use strict'

const _ = require('lodash');

module.exports = function() {
  
  return function get(verb,path){
  	if (!_.isObject(global.definition.paths)) {
		require('../utils/error.js')('paths is required');
	}

	const folderName = path.split('/')[1]
	const prefix = _.toLower(folderName+'_'+verb+'_')

	const parameters = global.definition.paths[path][_.toLower(verb)]['parameters'];
	const parametersPath = _.filter(parameters, ['in', 'path']);
	const result = [];
	_.forEach(parametersPath, function(parameterPath) {	
		result.push( { prefix, name : parameterPath.name , type: parameterPath.type} );
	});

	return result;
  };

}()