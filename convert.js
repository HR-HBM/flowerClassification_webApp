const fs = require("fs");

// Read the labels.txt file
const labels = fs.readFileSync("labels.txt", "utf-8").split("\n").map(label => label.trim()).filter(Boolean);

// Convert into a JS object
const labelsObject = labels.reduce((obj, label, index) => {
  obj[index] = label;
  return obj;
}, {});

// Generate labels.js file
const jsContent = `const labels = ${JSON.stringify(labelsObject, null, 2)};\n\nexport default labels;`;

// Write to labels.js
fs.writeFileSync("labels.js", jsContent, "utf-8");

console.log("labels.js has been created successfully!");
