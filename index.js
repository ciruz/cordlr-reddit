const CordlrPlugin = require('cordlr-plugin')

const request = require('request')

class RedditPlugin extends CordlrPlugin {
  constructor(bot, config) {
    super(bot, config)

    this.bot = bot
    this.config = config

    this.name = 'Reddit'
    this.description = 'Lists posts from subreddits on reddit.com'

    this.commands = {
      "r": {
        "usage": "<subreddit>",
        "function": "getPosts",
        "description": "Lists hot posts from a subreddit",
        "permissions": []
      },
      'r top': {
        'usage': '<subreddit>',
        'function': 'getPosts',
        'description': 'Lists top posts from a subreddit',
        'permissions': []
      },
      'r new': {
        'usage': '<subreddit>',
        'function': 'getPosts',
        'description': 'Lists latest posts from a subreddit',
        'permissions': []
      },
    }

    this.resolveConfiguration()
  }

  resolveConfiguration() {
    this.pluginConfig = this.config['cordlr-reddit'] || {}

    if (this.pluginConfig.numPosts === undefined || this.pluginConfig.numPosts < 1 || this.pluginConfig.numPosts > 25)
      this.pluginConfig.numPosts = 5;

    console.log(this.pluginConfig);
  }

  getPosts(message, args, flags) {

    let type = args[0]
    let subreddit = args[1] || args[0]

    let embedTitle = 'Reddit Plugin'
    let embedDescription = null

    if (subreddit.match(/^(\w+)$/g)) {
      let requestUrl = 'https://www.reddit.com/r/' + subreddit

      switch (type) {
        case 'top':
          requestUrl += '/top.json?limit=' + this.pluginConfig.numPosts
          embedDescription = `Top ${this.pluginConfig.numPosts} Posts from **${subreddit}**:`
          break
        case 'new':
          requestUrl += '/new.json?limit=' + this.pluginConfig.numPosts
          embedDescription = `Latest ${this.pluginConfig.numPosts} Posts from **${subreddit}**:`
          break
        default:
          requestUrl += '.json?limit=' + this.pluginConfig.numPosts
          embedDescription = `Hot ${this.pluginConfig.numPosts} Posts from **${subreddit}**:`
          break
      }

      request(requestUrl, (err, response, body) => {
        if (err) {
          this.sendInfo(message, `Can't fetch data for ${subreddit} from reddit.com.`, 'Reddit', null, 'error')
          return false
        }

        const redditBody = JSON.parse(body)

        if (redditBody.data.children.length > 0) {
          let embedMessages = []
          redditBody.data.children.forEach(function (thread) {
            if (thread.data.stickied === false) {
              embedMessages.push({
                name: (thread.data.title.length < 200) ? thread.data.title : thread.data.title.substr(0, 200) + '...',
                value: decodeURIComponent(thread.data.url)
              })
            }
          })

          let embed = {
            title: embedTitle,
            description: embedDescription,
            fields: embedMessages
          }
          this.sendEmbed(message, embed)
        } else {
          this.sendInfo(message, `No posts found in **${subreddit}**.`, 'Reddit')
        }
      })
    } else {
      this.sendInfo(message, `Invalid subreddit **${subreddit}**.`, 'Reddit', null, 'error')
      return false
    }

  }
}

module.exports = RedditPlugin