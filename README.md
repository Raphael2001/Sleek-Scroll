# Sleek-Scroll

[![npm downloads](https://img.shields.io/npm/dt/sleek-scroll?style=flat&logo=npm&color=blue&labelColor=black&label=Downloads)](https://www.npmjs.com/package/sleek-scroll)
[![npm version](https://img.shields.io/npm/v/sleek-scroll?style=flat&logo=npm&color=green&labelColor=black&label=Version)](https://www.npmjs.com/package/sleek-scroll)
[![npm license](https://img.shields.io/npm/l/sleek-scroll?style=flat&color=purple&labelColor=black&label=License)](https://www.npmjs.com/package/sleek-scroll)
[![bundle size](https://img.shields.io/bundlephobia/min/sleek-scroll?style=flat&color=orange&labelColor=black&label=Minified%20Size)](https://bundlephobia.com/package/sleek-scroll)
[![last commit](https://img.shields.io/github/last-commit/Raphael2001/Sleek-Scroll?style=flat&logo=github&color=yellow&labelColor=black&label=Last%20Commit)](https://github.com/Raphael2001/Sleek-Scroll)
[![open issues](https://img.shields.io/github/issues/Raphael2001/Sleek-Scroll?style=flat&logo=github&color=red&labelColor=black&label=Open%20Issues)](https://github.com/Raphael2001/Sleek-Scroll/issues)

Sleek-Scroll is a lightweight, easy-to-style scrollbar component for React applications. It supports RTL (right-to-left) languages and is compatible with all major browsers.

## Features

- **Easy to Style**: Customize the scrollbar to fit your application's design with ease.
- **Cross-Browser Support**: Works seamlessly across all modern browsers.
- **Full Support for Content Size Change**: Automatically adjusts the scrollbar when the content size changes, ensuring a smooth user experience.
- **Lightweight**: Minimal footprint ensures fast loading times.
- **Zero Dependencies**: Sleek-Scroll has no external dependencies, ensuring optimal performance.
- **RTL Support**: Fully compatible with right-to-left languages.

## Installation

You can install sleek-scroll using npm or yarn.

### Using npm

```bash
npm install sleek-scroll
```

### Using yarn

```bash
yarn add sleek-scroll
```

## Usage

Import Sleek-Scroll in your React component and use it as a wrapper around the content you want to apply custom scroll behavior to.

```javascript
import SleekScrollbar from "sleek-scroll";

function MyComponent() {
  return (
    <SleekScrollbar>
      <div>Your content here</div>
    </SleekScrollbar>
  );
}
```

### Styling

Sleek-Scroll allows you to style the scrollbar easily using standard CSS. For example:

```css
:root {
  --react-scrollify-thumb: blue;
  --react-scrollify-thumb-hover: lightblue;
  --react-scrollify-track: rgba(0, 0, 0, 0.1);
  --react-scrollify-width: 7px;
  --react-scrollify-side: 4px;
}
```

## Configuration

You can pass configuration options as props to the Sleek-Scroll component to customize its behavior.

```javascript
import SleekScrollbar, { ScrollbarSide } from "sleek-scroll";

<SleekScrollbar side={ScrollbarSide.left} thumbMinHeight={15}>
  <div>Your content here</div>
</SleekScrollbar>
```

- `side`: Which side to render the scrollbar. Use the exported `ScrollbarSide` const: `ScrollbarSide.left` or `ScrollbarSide.right`. Default: `ScrollbarSide.right`.
- `thumbMinHeight`: Minimum thumb height as a percentage of the track. Prevents the thumb from shrinking too small on very long content. Default: `20`.

## Browser Support

Sleek-Scroll is compatible with all major browsers, including:

- Chrome
- Firefox
- Safari
- Edge

## Contributing

We welcome contributions to Sleek-Scroll! To contribute:

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request **to the `dev` branch**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Acknowledgments

Special thanks to all contributors and the React community for their support and inspiration.
