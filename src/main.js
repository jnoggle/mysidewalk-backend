const fs = require("node:fs");
const util = require("./util.js");

function main() {
  const example_list_file_name = process.argv[2];
  const sorted_example_list_file_name = process.argv[3];

  const unsorted = fs.readFileSync(example_list_file_name, "utf-8").split("\n");

  const sorted = unsorted.sort(util.comparisonFunction);

  fs.writeFile(sorted_example_list_file_name, sorted.join("\n"), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

main();
