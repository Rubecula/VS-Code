const { exec } = require("child_process");

/**
 * All of the colors that are available to use in the template.
 *
 * Color values can refer to another color's name to point to that color.
 * This works recursively, see `resolveColor`.
 */
const colors = {
    black: "#141414",
    blackGray: "#1C1C1C",
    darkerGray: "#242424",
    darkGray: "#404040",
    gray: "#6E6E6E",
    lightGray: "#CECECE",
    lighterGray: "#D6D6D6",
    whiteGray: "#DEDEDE",
    white: "#E5E5E5",
    realwhite: "#FFFFFF",

    yellow: "#CCC47A",
    pink: "#E52E71",
    green: "#9CCC3D",
    cyan: "#6CC7D9",
    orange: "#D9882B",
    purple: "#A082D9",

    transparent: "#ffffff00",
};

const dawn = {
    type: "light",

    // Background colors
    darkBackground: "white",
    background: "realwhite",
    lightBackground: "whiteGray",
    highlightBackground: "black15",
    activeBackground: "black25",
    selectionBackground: "yellow40",
    inactiveSelectionBackground: "yellow20",

    border: "lightGray",

    // Foregrounds
    brightForeground: "black",
    foreground: "darkGray",
    inactiveForeground: "gray",

    ...colors,

    yellow: "#7e7630",
    // pink: "",
    green: "#618122",
    cyan: "#24798a",
    // orange: "",
    purple: "#673abb",
};

const dusk = {
    type: "dark",

    // Background colors
    darkBackground: "black",
    background: "blackGray",
    lightBackground: "darkerGray",
    highlightBackground: "white29",
    activeBackground: "white40",
    selectionBackground: "yellow40",
    inactiveSelectionBackground: "yellow20",

    border: "darkGray",

    // Foregrounds
    brightForeground: "white",
    foreground: "lightGray",
    inactiveForeground: "gray",

    ...colors,
};

/**
 * Resolve the name of a color into a hex value.
 *
 * Example: background -> blackGray -> #1C1C1C.
 *
 * @param {string} key Name of the color.
 * @param {string} value Value of the color's name.
 */
function resolveColor(key, value) {
    let valueFormat = /^([a-zA-Z]+)(\d{2})?$/;
    let matches = value.match(valueFormat);
    if (matches === null) {
        // Hex color.
        return value;
    }

    let [_fullMatch, colorName, opacity, ..._] = matches;
    if (!(colorName in colors)) {
        return value;
    }

    let resolvedColor = resolveColor(value, colors[colorName]);
    if(opacity === undefined) {
        return resolvedColor;
    }
    if (colorName in colors) {
        return resolveColor(value, colors[colorName]) + opacity;
    }
    return value;
}

const themeTemplates = {
    "Rubecula": dusk,
    "Rubecula Dawn": dawn
};

// Generate a sed replacement command that will replace the colors in the
// template color scheme and save it as a different file.
//
// Example:
// sed -e "s/\": \"black/\": \"#141414/" themes/Rubecula.template.json > themes/Rubecula.json

Object.entries(themeTemplates).forEach(([templateName, templateColors]) => {
    var command = "sed ";
    Object.entries(templateColors).forEach(([key, value]) => {
        const color = resolveColor(key, value);
        command += `-e "s/\\": \\"${key}/\\": \\"${color}/" `;
    });
    command += `"themes/Rubecula.template.json" > "themes/${templateName}.json"`;

    exec(command);
});
