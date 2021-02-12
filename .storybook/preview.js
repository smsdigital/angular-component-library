
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

import styleguideVariables from 'styleguide-variables/data/styles.json';
setCompodocJson(docJson);


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

// ---------------------

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'white',
    toolbar: {
      icon: 'photo',
      items: ['white', 'gray10', 'gray90', 'gray100'],
    },
  },
};

const withTheme = (storyFn, context) => {
  const { theme } = context.globals;

  const rootElement = document.querySelector('.sb-show-main');
  rootElement.classList.remove('theme-white', 'theme-gray10', 'theme-gray90', 'theme-gray100');
  rootElement.classList.add(`theme-${theme}`);

  // set ui-background
  let colorValue = styleguideVariables.themes[theme]['ui-background'];
  if (colorValue.startsWith('$')) {
    const cleanName = colorValue.substring(1, colorValue.length);
    colorValue = styleguideVariables.global.colors[cleanName];
  }
  rootElement.style.backgroundColor = colorValue;

  return storyFn();
}

export const decorators = [withTheme];