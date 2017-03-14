# cordlr-reddit

> Cordlr Plugin that lists posts from subreddits on [reddit.com](https://www.reddit.com).

## Installation

You can install **cordlr-reddit** as a npm package via:

``npm install cordlr-plugin-name --save``

Now append your ``corldr.json`` file, and add ``cordlr-reddit`` as a new plugin that Cordlr can load it.

```javascript
// cordlr.json:

{
  "token":"YourTokenHere",
  "prefix":"!",
  "loader":"cordlr-loader",
  "plugins":[
    // ...
    "cordlr-help2",
    "cordlr-reddit" // add this
  ]
}
```

## Usage

Lists hot posts from a subreddit:

``!r <subreddit>``

**Example Usage:** ``!r funny``

Lists top posts from a subreddit (Past 24 hours):

``!r top <subreddit>``

**Example Usage:** ``!r top videos``

Lists latest posts from a subreddit:

``!r new <subreddit>``

**Example Usage:** ``!r new pics``


## Configuration (Optional)

By default this plugins fetches **5** posts from a subreddit. You can overwrite the number of posts to any number between ``1`` and ``100`` in the ``cordlr.json`` file.

Example configuration with 3 posts:

```javascript
// cordlr.json

{
  "token":"YourTokenHere",
  "prefix":"!",
  "loader":"cordlr-loader",
  "plugins":[
    // ...
    "cordlr-help2",
    "cordlr-reddit"
  ],
  "cordlr-reddit": { // add this
    "numPosts": 3 // any number between 1 an 100
  }
}
```

## License

MIT © [ciruz](https://github.com/ciruz)