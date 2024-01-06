module.exports = {
  name: 'example-module',
  displayName: 'Example Module',
  about: 'Text shown on >about command from @lotus-tree/command-handler',

  config: { guild: { }, global: {} }, // Runtime configuration fields
  // defaultConfig: {}, // Default startup configuration, used to create .json file in /config folder

  // discord.js client configuration. (https://discordjs.guide/popular-topics/intents.html#enabling-intents)
  intents: [],
  partials: [],

  preload: async () => {}, // Async function executed before addding commands and events, if errored module is not loaded
  commands: {},
  events: {}
}
