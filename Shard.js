const { ShardingManager } = require("discord.js");

const manager = new ShardingManager('./index.js', {
    respawn: true,
    totalShards: 1
});

manager.spawn().catch(() => { });