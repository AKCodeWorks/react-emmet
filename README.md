# Actual React Emmet

Actual React Emmet is a Visual Studio Code extension designed to enhance the productivity of React developers. This extension introduces an Emmet-like syntax for quickly generating React hook code snippets in your editor. Simplifying your workflow, it allows you to type shorthand code which expands into commonly used React hook structures.

## Features

### useState Hook Generation

![Demo](/demo.gif)

Currently, the extension supports the `useState` hook. You can easily generate a `useState` hook snippet by typing `usestate.variableName` OR `useState.variableName` and pressing Enter. The extension automatically expands this into a properly formatted `useState` hook.

For example, typing `usestate.count` and pressing Enter will generate:

\```javascript
const [count, setCount] = useState();
\```

This functionality is available in various file types commonly used in React development, including `.js`, `.jsx`, `.ts`, and `.tsx`.

### Planned Features

In future updates, we plan to extend support to other React hooks, such as `useEffect`, `useContext`, and more, following the same intuitive Emmet-like pattern for quick and efficient coding.

## How to Use

To use the extension, simply open a React file and type the shorthand notation for a hook, followed by a variable name. Press Enter, and the extension will expand it into the corresponding hook code snippet.

Example:

- Type `usestate.age` and press Enter.
- The extension will generate `const [age, setAge] = useState();` in your code.

## Installation

You can install Actual React Emmet from the Visual Studio Code Marketplace. Search for "Actual React Emmet" in the Extensions view in Visual Studio Code and click Install.

## Contributions

Feedback and contributions to the extension are welcome. If you have suggestions or encounter issues, please feel free to open an issue or submit a pull request on the repository.

## License

Actual React Emmet is released under the [MIT License](LICENSE.txt).

## About the Author

Actual React Emmet is developed and maintained by [AK CodeWorks](https://github.com/AKCodeWorks)


I am not sure if an extension like this already exists, but I have never found one that quite worked like true HTML emmet, but for react. This is a preview build so use it at your own risk, useState is supported for now, but I will be adding more as time goes on.