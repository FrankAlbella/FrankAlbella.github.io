function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function searchWeb(e)
{
	e.preventDefault();
	var sf = document.searchform;
	var submitto = sf.sengines.options[sf.sengines.selectedIndex].value + escape(sf.searchterms.value);
	window.location.href = submitto;
	return false;
}

function searchSite(e)
{
	e.preventDefault();
	var source = event.target.id || event.srcElement.id;
	var search = document.getElementById(source.replace("Bar", "") + "Text").value;
	
	if(isEmptyOrSpaces(search))
		return false
	
	switch(source)
	{
		case "tBar":
			document.location = 'https://thepiratebay.org/search/' + search;
			break;
		case "rBar":
			document.location = 'http://www.reddit.com/r/' + search;
			break;
		case "ecBar":
			document.location = 'https://www.8ch.net/' + search;
			break;
		case "cBar":
			document.location = 'https://www.reddit.com/user/frankstar10/m/bluepill_all/search/?q=' + search + '&restrict_sr=1&is_multi=1';
			break;
		case "dBar":
				document.location = 'https://dict.naver.com/linedict/zhendict/#/cnen/search?query=' + search;
				break;
		default:
			window.alert("Search box unimplemented! Add to search.js")
	}
	
	writeFormCookie(source, search);
	
	return false;
}

document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementById('cBar').addEventListener('submit', searchSite);
	
	document.getElementById('rBar').addEventListener('submit', searchSite);
	
	document.getElementById('dBar').addEventListener('submit', searchSite);
});