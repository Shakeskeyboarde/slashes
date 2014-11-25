"use strict";

exports.add = function add(str, count)
{
	str = ''+str;
	count = Math.abs(count<<0) || 1;

	while (count > 0) {
		--count;
		str = str.replace(/[\\'"\0]/g, add_replace);
	}

	return str;
};

exports.strip = function strip(str, count)
{
	str = ''+str;
	count = Math.abs(count<<0) || 1;

	while (count > 0) {
		--count;
		str = str.replace(/\\(.)/g, strip_replace);
	}

	return str;
};

function add_replace(match)
{
	if (match === "\0") {
		return "\\0";
	} else {
		return "\\" + match;
	}
}

function strip_replace(match, g1)
{
	if (g1 === "0") {
		return "\0";
	} else {
		return g1;
	}
}