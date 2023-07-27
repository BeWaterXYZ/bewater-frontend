const fs = require("fs");
const path = require("path");

function readFileAndParseJson(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return null;
  }
}

function run(dependencies) {
  Object.keys(dependencies).forEach((key) => {
    if (depsToAlign.has(key)) {
      let set = depsToAlign.get(key);
      set.add(dependencies[key]);
    } else {
      depsToAlign.set(key, new Set([dependencies[key]]));
    }
  });
}

function findPackageJsonFiles(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      if (filePath.includes("node_modules")) continue;
      if (filePath.includes("Pods")) continue;
      findPackageJsonFiles(filePath);
    } else if (file === "package.json") {
      packageJsons.push(filePath);
    }
  }
}

function alignDeps() {
  for (const file of packageJsons) {
    const jsonData = readFileAndParseJson(file);

    run(jsonData.dependencies ?? {});
    run(jsonData.devDependencies ?? {});
    run(jsonData.peerDependencies ?? {});
  }
}

let packageJsons = [];
let depsToAlign = new Map();

findPackageJsonFiles(__dirname);

alignDeps();
for (const [key, value] of depsToAlign) {
  if (value.size > 1) {
    console.log(key, value);
  }
}