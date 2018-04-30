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
    white: "#E5E5E5",

    yellow: "#CCC47A",
    pink: "#E52E71",
    green: "#9CCC3D",
    cyan: "#6CC7D9",
    orange: "#D9882B",
    purple: "#A082D9",

    transparent: "#ffffff00",

    // Background colors
    darkBackground: "black",
    background: "blackGray",
    lightBackground: "darkerGray",
    highlightBackground: "darkGray",

    border: "darkGray",
    matchBorder: "yellow",

    // Foregrounds
    brightForeground: "white",
    foreground: "lightGray",
    inactiveForeground: "gray",

    // These colors are used for indicating something,
    // and will have a bright color.
    untested: "#FF0000",
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
    if (value in colors) {
        return resolveColor(value, colors[value]);
    }
    return value;
}

// Generate a sed replacement command that will replace the colors in the
// template color scheme and save it as a different file.
//
// Example:
// sed -e "s/\": \"black/\": \"#141414/" themes/Rubecula.template.json > themes/Rubecula.json
var command = "sed ";
Object.entries(colors).forEach(([key, value]) => {
    const color = resolveColor(key, value);
    command += `-e "s/\\": \\"${key}/\\": \\"${color}/" `;
});
command += "themes/Rubecula.template.json > themes/Rubecula.json";

exec(command);
