const args = process.argv.slice(2);

if (args.length == 0)
{
  console.error("version required");
  process.exit(1);
}
const version = args[0];
console.log("setting version to: " + version);

const needle = "::version::";

var fs = require('fs');

function writeUpdatedContent(target, updatedContent) {
  console.log("writing "+ target);
  fs.writeFile(target, updatedContent, (err) => {
    if (err) {
      return console.error(err);
    }
  });
}

function updateFile(template, target) {

  const data = fs.readFileSync(template, 'utf8');
  const updatedContent = data.replace(needle, version);
  writeUpdatedContent(target, updatedContent);
}

writeUpdatedContent("www/version.info", version);
updateFile("templates/about.html", "www/pages/about.html");
updateFile("templates/globals.js", "www/js/globals.js");

console.log("done");