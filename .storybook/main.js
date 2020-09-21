module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/app/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        viewport: false
      }
    },
  ]
}