function toggleFapVisibility()
{
	var e = document.getElementById('fap');
	if(e.style.display == 'none')
		e.style.display = 'block';
	else
		e.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementById('secretBtn').addEventListener('click', toggleFapVisibility);
	document.getElementById('fap').style.display = 'none';
});