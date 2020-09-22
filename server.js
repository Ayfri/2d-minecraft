const { exec } = require('child_process');
exec('npm run server', (error, stdout, stderr) => {
	if (error) console.error(error);
	if (stdout) console.log(stdout);
	if (stderr) console.warn(stderr);
});
