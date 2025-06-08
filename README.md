# React + TypeScript + Vite

This interface is built using **React** and **TypeScript** for fast, minimal deployment, with **TailwindCSS** providing elegant styling.

Using the provided API, I have successfully fetched bin/skip data and implemented a simple, minimal design that allows users to easily interact with the application.

## Features

- Fetches skip/bin data from an external API.
- Displays available skips in a responsive grid layout.
- Allows users to select/deselect a skip and view their selection in a floating panel.
- Dynamic image loading based on skip size.
- Highlights special conditions like road placement availability.

Rather than reinventing the wheel, I took inspiration from some of the leading online marketplaces to craft an attractive and engaging design. The goal was to create an interface that users would enjoy interacting with one that feels intuitive and even fun to explore. By enhancing the user experience, the design encourages users to spend more time browsing, which in turn increases the likelihood of conversion and repeat engagement.

## Easy Deployment on Your Local Machine

If you want to try it on your machine, you'll need to clone the repository:

```bash
git clone git@github.com:aymantoumi/Business_Skip_Hire.git
```

Then install dependencies and run the development server:

```bash
cd Business_Skip_Hire
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if taken).

## Linting with ESLint

You can also install [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

These plugins help enforce best practices and improve code quality when working with React and TypeScript.
