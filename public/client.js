// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

(function getChats() {
  setTimeout(function(){
    $.ajax({
      url: "/chats",
      success: function(data) {
        var d = Date.now();
        console.log("Got Chats " + d);
        $( "#chats" ).html("");
        for (chat in data.chats){
          var chat = "<li>" + data.chats[chat] + "</li>";
          $( "#chats" ).prepend(chat);
          
        }
        getChats();
      },
      error: function(xhr, status, err) {
        console.log("Error:");
        console.log(err);
      }
    });
  }, 3000);
})();

$( "button#submit-chat" ).click(function() {
  var message = $( "textarea#chat-input").val();
  $( "textarea#chat-input" ).val("");
  var data = { "message": message };
  $( "#chats" ).prepend("<li>" + message + "</li>");
  $.ajax({
    url: "/chat/new",
    data: data,
    success: function(data) { 
    },
    error: function(xhr, status, err) {
      console.log("Error:");
      console.log(err);
    }
  })
});
