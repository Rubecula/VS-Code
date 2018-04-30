# Rubecula

_Hyperminimal theme based on [AmCoder Bright](https://github.com/auiWorks/amCoder)._

This theme is being worked on while using VS Code so not everything might be added just yet. Please make an issue if you see anything out of the ordinary.

## Support

### Summary

| Part                | Status          |
| ------------------- | --------------- |
| [VS Code](#vs-code) | Mostly complete |
| [GitLens](#gitlens) | Incomplete      |

### VS Code

_Mostly complete_

Still has some unspecified settings for which VS Code sets a fallback value.

### GitLens

_Incomplete_

The following settings are untested and will therefore show a red color:


```javascript
// Specifies the foreground color of an uncommitted line in the gutter blame annotations
"gitlens.gutterUncommittedForegroundColor": "untested",
// Specifies the background color of the trailing blame annotation
"gitlens.trailingLineBackgroundColor": "untested",
// Specifies the foreground color of the trailing blame annotation
"gitlens.trailingLineForegroundColor": "untested",
// Specifies the overview ruler color of the associated line highlights in blame annotations
"gitlens.lineHighlightOverviewRulerColor": "untested"
```

## Contributing

### Issues

For reporting bugs, see [`.github/ISSUE_TEMPLATE.md`](.github/ISSUE_TEMPLATE.md). For other requests, feel free to make an issue.

### Building

`template.js` contains the colors and logic to convert the template to a valid color scheme file with colors. The file requires that `sed` is available on your `PATH`. However this file is only required for testing as the formatted color scheme is not added to the repository.

The master branch will automatically publish the extension if `package.json` was changed. This is because the version has to be changed before publishing.

## FAQ

### Some text or background is red!

VS Code's [theme color reference](https://code.visualstudio.com/docs/getstarted/theme-color-reference) does not include enough screenshots to clarify what is meant sometimes. Therefore I cannot test some color settings myself and I mark them as `untested` in the template. These will then show up as red to bring some attention to them. If you see one of these in the wild, then please make an issue with a screenshot and I will be fixing it asap.
