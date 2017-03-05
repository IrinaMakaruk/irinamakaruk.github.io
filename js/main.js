
//listen for form Submit
document.getElementById("myForm").onclick=function(){
	addEventListener('submit',saveBookmark);
	addEventListener('submit',block_show);};
function block_show(){
	if(document.getElementById("well")){
	 $("#well").animate({height: 'show'}, 500); 
	}
}
//save Bookmark
function saveBookmark(e){
//Get form values"
var siteName=document.getElementById("siteName").value;
var siteUrl=document.getElementById("siteUrl").value;
if(!validateForm(siteName,siteUrl)){
	return false;
}
var bookmark={
	name: siteName,
	url: siteUrl
}


 //Local Storage Test
// localStorage.setItem('test','Hello, World!');
// console.log(localStorage.getItem('test'));
// console.log(localStorage.removeItem('test'));
// console.log(localStorage.getItem('test'));
// console.log(siteName);
// console.log(bookmark);

//Test if bookmarks is null
if(localStorage.getItem('bookmarks')===null){
//innit array
var bookmarks=[];
//add to array
bookmarks.push(bookmark);
//set to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
//Get bookmarks from LocalStorage
var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
//Add boomark to array
bookmarks.push(bookmark);
// Re-set back to LocalStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

}
//clear form
document.getElementById('myForm').reset();
//re-fetch bookmarks
fetchBookmarks();
//prevent form from submitting
e.preventDefault();
}
//Delete Bookmark
function deleteBookmark(url){
//Get bookmarks from LocalStorage
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
//loop throught from array
for(var i=0; i<bookmarks.length; i++){
	if(bookmarks[i].url==url){
	    //remove from array
		bookmarks.splice(i,1);
	}
}
	// Re-set back to LocalStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//re-fetch bookmarks
fetchBookmarks();
}
//Fetch bookmarks
function fetchBookmarks(){

//Get bookmarks from LocalStorage
	var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));

//Get output Id
var bookmarksResults=document.getElementById("bookmarksResults");

//Build output
bookmarksResults.innerHTML="";
 for(var i=0; i<bookmarks.length; i++){
 	var name=bookmarks[i].name;
 	var url=bookmarks[i].url;
 	bookmarksResults.innerHTML+='<div id="well" class="well" style="display: none;">'+
 	                            '<h3>'+name+
 	                            '<a class="btn btn-default" target="_blank" href="'+url+'">GO</a>'+
 	                            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Del</a>'
 	                            '</h3>'+
 	                            '</div>';
 	
   
 	                           
 }
}

//Validate form
function validateForm(siteName,siteUrl) {
  if (!siteName || !siteUrl) {
	alert("Please fill in the form");
	return false;

  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if (!siteUrl.match(regex)) {
	alert('Please use a valid Url');
	return false;
  }
  return true;
}
