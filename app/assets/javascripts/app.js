Tweet = function() {

}

Tweet.recent = function(){
  return $.get("/tweets/recent")
}

Tweet.byHashtag = function(tag) {
  return $.get("/tweets/search/" + tag.name);
}

Tweet.searchTag = function(tag) {
  return $.get("/tweets/search/" + tag)
}

Hashtag = function(attributes) {
  this.name = attributes.name;
}



Hashtag.popular = function(){
  return $.get("/hashtags/popular").then(function(data) {
    // convert the data into an array of hashtags

    return data.map(function(tag_name) {
      return new Hashtag({name: tag_name})
    });
  })
}
Tweet.search = function(){
  return $.get("/tweets/search/:keyword")
}


Tweet.create = function(){
  return $.post("/tweets")
}

HashtagViewTemplate = function(hashtag){
  template = _.template('<li><a href="" id="<%=name%>" class="popular_hashtags"><%= name %></a></li>')

  var html = $(template(hashtag))
  html.on("click", function(event) {
    event.preventDefault();
    App.showHashtagTweets(hashtag);
  });

  $("#trends-container ul").append(html);
}

SidebarHashtagView = function(tag_names){
  $("#trends-container ul").html("");
  tag_names.forEach(HashtagViewTemplate)
}

TimelineView = function(tweets){
  $("#tweets-container ul").html("");
  tweets.forEach(appendTweet);
}

HashtagSearchView = function(tweets){
  $("#tweets-container ul").html("");
  tweets.forEach(appendTweet)
  $("#search").val("");
}

TweetFormView = function(tweet){
  prependTweet(tweet);
  $('#new-tweet').val("");
}

NoSearchResultsView = function(){
  $('#search').css("color", "red")
}

var App = {
  loadTimeline: function(){
    Tweet.recent().done(function(data){
      TimelineView(data)
    })
  },

  loadHashtagList: function(){
    Hashtag.popular().done(function(tags){
      SidebarHashtagView(tags);
    })
  },

  showHashtagTweets: function(hashtag) {
    Tweet.byHashtag(hashtag).done(function (response) {
      HashtagSearchView(response)
    })
  }
}

var appendTweet = function(tweet){
  $("#tweets-container ul").append(TweetViewTemplate()(tweet))
}

var prependTweet = function(tweet){
  $("#tweets-container ul").prepend(TweetViewTemplate()(tweet))
}

TweetViewTemplate = function(){
  return template = _.template('<li class="tweet"><img class="avatar" src=<%= avatar_url %> alt=""><div class="tweet-content"><p><span class="full-name"><%= username %></span><span class="username"><%= handle %></span><span class="timestamp"><%= created_at %></span></p><p><%= content %></p></div></li>');
}

$(document).ready(function(){
  App.loadTimeline();
  App.loadHashtagList();

  // $("#my_list").data("foo", 87878)

  $(document).on("click", "#brand", function(event){
    App.loadTimeline();
  })

  $('#search-form').submit(function(event){
    event.preventDefault();
    var search = $('#search').val()
    Tweet.searchTag(search).done(function(response){
      HashtagSearchView(response);
    })
  })


  $('#tweet-form').submit(function(event){
    event.preventDefault();
    var form = $(this);
    $.ajax({
      url: "/tweets",
      method: "post",
      data: form.serialize(),
      success: function(response){
        TweetFormView(response)
      }
    })
  })
});


