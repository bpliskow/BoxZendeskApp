$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '200px', height: '100px' });
  client.on('editor_button.click', function() {
    handleOpenPopUp();
  });
  
  var options = {
    clientId: 349738,
    linkType: 'shared',
    multiselect: 'true'
  };
  var boxSelect = new BoxSelect(options);

  // Register a success callback handler
  boxSelect.success(function(response) {
  var fileNames = [];
  var sharedLinks = [];

  //Parse file names and shared links from response. Store data into arrays.
  for(var i = 0; i < Object.keys(response).length; i++) {
      var obj = response[i];
      fileNames.push(obj.name);
      sharedLinks.push(obj.url);
  }

  //Get current value for file-list div
  var currentStr = document.getElementById("file-list").innerHTML;
  var sharedLink = "";

  //Add sharedLinks to file-list div with file names as anchor text
  for (var i=0; i<sharedLinks.length; i++) {
	  sharedLink += "* [" + fileNames[i] + "](" + sharedLinks[i] + ")\n";
	  console.log(sharedLink);
  }
  client.invoke('comment.appendMarkdown', sharedLink);
  client.invoke('app.close');

  });
  // Register a cancel callback handler
  boxSelect.cancel(function() {
    console.log("The user clicked cancel or closed the popup");
    client.invoke('app.close');
  });
   
});