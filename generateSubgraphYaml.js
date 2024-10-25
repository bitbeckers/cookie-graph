"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var mustache = require("mustache");
// Load the networks configuration
var networks = require("./networks.json");
// Load the subgraph template
var templatePath = path.join(__dirname, "subgraph.template.mustache");
var template = fs.readFileSync(templatePath, "utf8");
// Function to generate subgraph.yaml for each network
function generateSubgraphYaml() {
    Object.keys(networks).forEach(function (network) {
        var config = networks[network].CookieJarFactory;
        var view = {
            network: network,
            address: config.address,
            startBlock: config.startBlock.toString(),
        };
        var subgraphYaml = mustache.render(template, view);
        var outputPath = path.join(__dirname, "subgraph.".concat(network, ".yaml"));
        fs.writeFileSync(outputPath, subgraphYaml, "utf8");
        console.log("Generated ".concat(outputPath));
    });
}
// Run the function
generateSubgraphYaml();
