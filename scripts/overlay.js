function hideMiscOverlay()
{
	document.getElementById('miscOverlay').style.display = 'none';
}

function showMiscOverlay()
{
	document.getElementById('miscOverlay').style.display = 'block';
}

function toggleMiscOverlay()
{
	var e = document.getElementById('miscOverlay');
	if(e.style.display == 'none')
		e.style.display = 'block';
	else
		e.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementById('miscBtn').addEventListener('click', showMiscOverlay);
	document.getElementById('miscExitBtn').addEventListener('click', hideMiscOverlay);
});