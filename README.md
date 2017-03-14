# cordlr-reddit

> Lists posts from subreddits on [reddit.com](https://www.reddit.com) for Cordlr.

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

Lists the 10 hot posts from a subreddit:

``!r <subreddit>``

**Example Usage:** ``!r funny``

Lists the 10 top posts from a subreddit (Past 24 hours):

``!r top <subreddit>``

**Example Usage:** ``!r top videos``

Lists the 10 latest posts from a subreddit:

``!r new <subreddit>``

**Example Usage:** ``!r new pics``

## License

MIT © [ciruz](https://github.com/ciruz)