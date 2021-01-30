
module.exports = (n) => {
    n = n.split(' ').join('').toLowerCase() + 'rc';
    const files = [];
    const fixes = [['.', ''], ['', ''], ['.', '.json'], ['', '.json'], ['.', '.js'], ['', '.js']];
    fixes.forEach((f) => files.push(f[0] + n + f[1]));
    return files;
};
