function writeFormCookie(source, search)
{
	document.cookie = source + " = " + search;
	console.log(source + " = " + search);
}

function removeCookie(name)
{
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}