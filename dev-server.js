const config = require("./config.json"); // require config
const cli = require("next/dist/cli/next-dev");

cli.nextDev(["-p", config.webserver.port]);
