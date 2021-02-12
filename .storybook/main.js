module.exports = {
  "stories": [
    "../projects/acl/src/lib/**/*.stories.@(js|jsx|ts|tsx)"
    //"../stories/**/*.stories.mdx",
    //"../stories/**/*.stories.@(js|jsx|ts|tsx)"
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