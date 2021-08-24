// next.config.js
const withPreact = require('next-plugin-preact');

module.exports = withPreact({
    /* regular next.js config options here */
	/*future: {
		webpack5: true,
	  },
	  webpack: (config) => {
		config.resolve.fallback = { fs: false };
	
		return config;
	  },*/
});