function toggleHeader()
{
    document.getElementsByClassName('corner-caret')[0].classList.toggle('active');
    document.getElementsByClassName('header-container')[0].classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', function () 
{
	document.getElementsByClassName('corner-caret')[0].addEventListener('click', toggleHeader);
});