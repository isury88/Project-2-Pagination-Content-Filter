//Problem: There is no interactivity into the webpage, Button not working and too many info into the Main Page
//Solution: add interactivity, search field, pagination

var $studentList = $('.student-list li');
var $page = $('.page');
var $pagination = $('<div class="pagination"></div>');
var perPage = 10;


//Create the search bar to find students
var $searchBar = $('<div class="student-search"></div>');
$searchBar.append('<input placeholder="Search for students..."></input>');
$searchBar.append('<button>Search</button>');

//Appending the search bar
$('.page-header').append($searchBar);
$searchInput = $searchBar.find("input");

//Creating a message when no results are found
var $noResultsMessage = $('<h2>No Results Found</h2>');
$page.append($noResultsMessage);
$noResultsMessage.hide();

//Loading list items on a page
//Setting the results
//When displaying more than 10 results then activate pagination
function updatePage(searchString="", page=1){
  $studentList.each(function(){
    $(this).removeClass("result");
  });
  $results = $("ul.student-list li:contains('"+searchString.toLowerCase()+"')");
  $results.addClass("result");
  $noResultsMessage.hide();
  $studentList.each(function(){
    if($(this).hasClass('result')){
      $(this).show(1000);
    } else {
      $(this).hide();
    }
  });
  if($results.length > 10){
    paginateResults($results, page);
  } else if($results.length === 0){
    $pagination.hide();
    $noResultsMessage.show();
  } else {
    $pagination.hide();
  }
}


//Creating the menu for pagination
//hiding pagination menu while not needed
$pagination.append('<ul></ul>');
$page.append($pagination);
$pagination.hide();


//Creating the Pagination function, given a set of results, will calculate number of pages, will show results for current page
	
function paginateResults($results, currentPage=1){
	//Showing pagination menu
	$pagination.show();
	$paginationList = $pagination.find("ul")
	$paginationList.empty();

	//calculates the number of pages 
	var totalPages = Math.ceil($results.length / perPage);
	var firstItem = currentPage*perPage-perPage;
 	var lastItem = firstItem + perPage-1;

 	//hiding results 
	$results.each(function(i){
		if (i < firstItem || i > lastItem) {
			$(this).hide();
		} else {
			$(this).show();
		}
	})

	//build pagination menu item and append to list
	for (var i=0; i<totalPages; i++) {
		var page = i+1;
		$paginationItem = $('<li></li>');
		$paginationLink = $('<a>'+page+'</a>'+currentPage);
		if (page == currentPage) {
			$paginationLink.addClass("active");
		}
		$paginationItem.append($paginationLink);
		$paginationList.append($paginationItem);
	}
}


//Updating page on click
$('.pagination').on("click", "li", function(){
	updatePage($searchInput.val(),$(this).text());
});

//will run the search on keyup
$searchInput.on("keyup", function(){
	updatePage($searchInput.val());
});

$searchBar.on('click','button', function(){
	updatePage($searchInput.val());
});

//calling updatePage function
updatePage();

























