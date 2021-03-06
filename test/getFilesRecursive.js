"use strict";

// Require Node.js Dependencies
const { join, relative, normalize } = require("path");

// Require Internal Dependencies
const { getFilesRecursive, constants } = require("../src/utils");

test("should return all files contained in the project", async() => {
    const projectRoot = join(__dirname, "..");
    const files = [];

    for await (const [type, filePath] of getFilesRecursive(projectRoot)) {
        if (type !== constants.FILE) {
            continue;
        }
        files.push(relative(projectRoot, filePath));
    }

    const expected = [
        "bin/index.js",
        "src/ast/index.js",
        "src/ast/helpers.js",
        "src/depWalker.js",
        "src/httpServer.js",
        "src/utils.js"
    ].map((path) => normalize(path));
    expect(files).toEqual(expect.arrayContaining(expected));
});
