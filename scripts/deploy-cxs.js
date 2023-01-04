const other = require('./other')
async function main() {
	return other('CXS')
}

main().then(() => {
}).catch((error) => {
	console.error(error);
	process.exit(1);
});
