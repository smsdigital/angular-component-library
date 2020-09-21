export const hideProperties = (component, ...properties) => {
    component.argTypes = {};
    for (const property of properties) {
        component.argTypes[property] = { table: { disable: true } };
    }
}
