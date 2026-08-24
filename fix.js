const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, 'now/src/app/project');
let logs = [];

try {
    const dirs = fs.readdirSync(projectPath);
    logs.push("Directories in project: " + dirs.join(', '));

    dirs.forEach(dir => {
        if (dir !== '[id]' && dir.includes('id')) {
            const oldPath = path.join(projectPath, dir);
            const newPath = path.join(projectPath, '[id]');
            fs.renameSync(oldPath, newPath);
            logs.push(`Renamed ${oldPath} to ${newPath}`);
        } else {
            logs.push(`Did not rename: ${dir}`);
        }
    });
} catch (e) {
    logs.push("Error: " + e.message);
}

fs.writeFileSync(path.join(__dirname, 'output.txt'), logs.join('\n'));
