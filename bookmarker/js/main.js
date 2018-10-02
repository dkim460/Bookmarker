// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById("siteName").value;
  var siteURL = document.getElementById("siteURL").value;

  if (!validateForm(siteName, siteURL)) {
    return false;
  }

  // An array with name and url information that we want
  var bookmark = {
    name: siteName,
    url: siteURL
  };

  /*

  // Local Storage Test
  // Will store text Hello World as test (Check by fn+f12, application instead of console, Local Storage, and file://. Can delete by selecting and pressing x as well)
  localStorage.setItem("test", "Hello World");
  // To get the item (without console.log)
  console.log(localStorage.getItem("test"));
  // To delete from storage
  localStorage.removeItem("test");

  */
  // Test if bookmarks is null
  if (localStorage.getItem("bookmarks") == null) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage, it's a JSON array so need to convert to string
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Need to get a hold of the bookmarks array currently in storage, push the new bookmark after it and place it back

    // Get bookmarks from localStorage, will turn it back to JSON
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Clear Forms
  document.getElementById("myForm").reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  //prevent form from submitting, so we can actually work with it
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage, will turn it back to JSON
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  // Build output
  bookmarksResults.innerHTML = "";
  // Need to go through the list of bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    // well is a bookstrap class that gives us a great background,  border and some padding.
    // target="_blank" makes it open in a new window
    // added "         " to separate the word and buttons a bit
    bookmarksResults.innerHTML +=
      '<div class="card bg-light text-dark card-body">' +
      "<h3>" +
      name +
      "         " +
      '<a class = "btn btn-secondary" target="_blank" href="' +
      url +
      '">Visit</a>' +
      "         " +
      " <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete<a>' +
      "</h3>" +
      "</div>";
  }
}

// Validate form function so we don't have to rewrite code for name and other uses.
function validateForm(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert("Please fill in the form");
    return false;
  }

  // Good regular expression for URL, use this to check to see if actual url is being put inside the url insertion box.
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
