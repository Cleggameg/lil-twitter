## Lil' Twitter

## Learning Competencies

- Build a client-side-heavy Rails application.
- Consume a JSON API.
- Build Single Page App.
- write organized JavaScript code

## Summary

Your mission: build a one-page app using  Javascript to render a simple dashboard for a twitter application. The HTML, CSS, and back-end are already written for you -- all you need to do is write the JavaScript.

## Development Setup

requires ruby and rubygems.
```sh
$ bundle install
$ rake db:create && rake db:migrate && rake db:seed
$ rails server
```

## Releases

### Release 0: Architect

Your site needs to have the following functionality:

> - On page load, the 50 most recent tweets are displayed in the 'river' running down the middle of the page.
> - On page load, the 10 most popular hashtags are displayed.
>
> - A user can create a tweet, which will get saved into the database with a fake username, fake handle, and fake avatar (which is all handled server-side).
> - Any hashtags the tweet includes (e.g. #yolo), should also be associated with that tweet.
> - The new tweet should appear atop the 'river', preferrably with some sort of animation.
>
> - A user can search for a specific hashtag using the search bar. The results of the search will be displayed in the river, replacing whatever was there before.
> - If the user searches for a hashtag that does not exist, the search bar turns red.
>
> - A user can click on a trending topic in the trends box, which causes the river to display all tweets that are associated with that hashtag, replacing whatever was there before.
>
> - When a user clicks on the Lil Twitter header, the 50 most recent tweets are displayed.

All of this will be accomplished using JavaScript. Spend some time thinking about your architecture – what objects do you need? What are their interfaces? What does your file structure look like? Make sure you aren't micromanaging or over-designing -- Big Design Up Front is never great -- but your team will benefit from some basic architecture desicisions before starting.

Consider the following diagram, which highlights the different views your
solution might include:

![views diagram](doc/views.png)


### Release 1: Build

Start by following the instructions & sample code here:

[emails-backbone-example](../../../emails-backbone-example)

Okay, now build the thing. You should avoid any changes to the server-side code, although if you feel like changes are necessary, implement them and make sure the tests reflect your alterations. You will need to remove the filler elements in `app/views/index.html`. Structural changes to HTML and CSS should not be necessary, and it is generally a bad idea to unilaterally change a resource that your entire team depends on. Any changes to the existing code base, no matter how small, should be done intentionally and in consultation with your entire team.

**Build your solution in the following order:**

1. Tweet model
2. Tweets collection

> Before moving on: Get approval from an instructor once you can fetch tweets from the server.

3. Timeline view
4. Tweet view

> Before moving on: Ask an instructor for a review of your Timeline & Tweet views

5. SearchBox view
6. Compose view
7. HashTag model
8. HashTags view
9. HashTag view


### Release 2: Expand

The benefits of OO architecture is that it is easily extendable. Add an additional feature to your application, like:

 - a system for checking if new tweets have been created since page load, using long-polling.
 - have the river of tweets only display 10 tweets, and dynamically load more when the user scrolls to the bottom of the page.
 - give the user the ability to click hashtags inside tweets, which would display tweets associated with that hashtag.

### Endpoint Documentation

`GET /tweets/recent` returns the 50 most recently created tweets in JSON format. The response body looks like this:

  ```
  [
    { "avatar_url":"http://robohash.org/marco_schumm",
      "content":"Ut fugit ut labore repellendus.",
      "created_at":"2014-07-20T20:27:42Z",
      "handle":"@marco_schumm",
      "id":500,
      "updated_at":"2014-07-20T20:27:42Z",
      "username":"Adaline Bins",
      "hashtag_names": [ "est", "rerum", "distinctio" ] }
  ]
  ```

`GET /tweets/search/:hashtag` returns the 50 most recent tweets associated with the given hashtag, with a format similar to the `/recent` endpoint. Will return an empty body with a status code of 404 if the hastag does not exist.

`POST /tweets` creates a new a tweet and associates it with the specified hashtags, if provided. Hashtags that did not previously exist are also created. a request body should take this format:

  ```
    "tweet":
      { "avatar_url":"http://robohash.org/marco_schumm",
      "content":"Ut fugit ut labore repellendus.",
      "handle":"@marco_schumm",
      "username":"Adaline Bins" }
    hashtags: [ 'foo', 'bar', 'baz' ]
  ```

If no data is provided for avatar_url, content, handle, or username, fake data is used instead.

The endpoint returns the created tweet as JSON.

```
    { "avatar_url":"http://robohash.org/marco_schumm",
      "content":"Ut fugit ut labore repellendus.",
      "created_at":"2014-07-20T20:27:42Z",
      "handle":"@marco_schumm",
      "id":500,
      "updated_at":"2014-07-20T20:27:42Z",
      "username":"Adaline Bins",
      "hashtag_names": [ "est", "rerum", "distinctio" ] }
```

`GET /hashtags/popular` returns the names of the 10 most popular hashtags. The output looks like this:

```
  [ "est",
    "voluptas",
    "consequatur",
    "at",
    "accusamus",
    "doloremque",
    "culpa",
    "quod",
    "iure",
    "sint" ]
```
