import * as fs from "fs";
import * as path from "path";
import * as mustache from "mustache";

// Load the networks configuration
const networks = require("./networks.json");

// Load the subgraph template
const templatePath = path.join(__dirname, "subgraph.template.mustache");
const template = fs.readFileSync(templatePath, "utf8");

// Function to generate subgraph.yaml for each network
function generateSubgraphYaml(): void {
  Object.keys(networks).forEach((network: string) => {
    const config = networks[network].CookieJarFactory;
    const view = {
      network: network,
      address: config.address,
      startBlock: config.startBlock.toString(),
    };

    const subgraphYaml = mustache.render(template, view);

    const outputPath = path.join(__dirname, `subgraph.${network}.yaml`);
    fs.writeFileSync(outputPath, subgraphYaml, "utf8");
    console.log(`Generated ${outputPath}`);
  });
}

// Run the function
generateSubgraphYaml();
