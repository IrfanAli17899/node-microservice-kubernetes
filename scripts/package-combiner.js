const fs = require('fs');

const readJson = (path) => {
    return JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
}

const builderPackage = readJson('./builder-package.json');
const libPackage = readJson('./lib-package.json');
const package = readJson('./package.json');

const newPackage = {
    dependencies: {
        ...package.dependencies,
        ...libPackage.dependencies,
    },
    _moduleAliases: {
        ...builderPackage._moduleAliases
    }
}

fs.writeFileSync('./package.json', JSON.stringify(newPackage, null, 2), 'utf8')