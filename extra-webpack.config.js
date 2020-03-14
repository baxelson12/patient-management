const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.html',
    './src/**/*.component.ts',
    './src/app/**/**/*.html'
  ],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelistPatterns: [/[^\\:](.bg-[a-z]+)-[0-9]/]
});

module.exports = (config, options) => {
  console.log(`Using '${config.mode}' mode`);
  config.module.rules.push({
    test: /tailwind.scss$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
            ...(config.mode === 'production' ? [purgecss] : [])
          ]
        }
      }
    ]
  });
  return config;
};
