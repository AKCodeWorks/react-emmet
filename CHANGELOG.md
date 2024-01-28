# Change Log

All notable changes to the "Actual React Emmet" extension will be documented in this file.

## [0.0.5 Preview]

### New Features

- Added support for `useEffect` snippets:

  - Type `useeffect.<functionName>` and press Enter to create a `useEffect` hook.

    - For example: `useeffect.fetchData` will create:

    - ```javascript
      useEffect(() => {
        function fetchData() {
          // Your code here
        }
        fetchData();
      }, []);
      ```

  - You can also create an async `useEffect` by typing `useeffect.<functionName>.async`.

    - For example: `useeffect.loadData.async` will create:

      ```javascript

      useEffect(() => {
        async function loadData() {
          // Your code here
        }
        await loadData();
      }, []);
      ```

  - Dependency array support: Append `[arg1, arg2]` to specify dependencies.

    - For example: `useeffect.updateData[arg1, arg2]` will create:

      ```javascript
      useEffect(() => {
        function updateData() {
          // Your code here
        }
        updateData();
      }, [arg1, arg2]);
      ```

## [0.0.4 Preview]

### BUGFIX

- Fixed an error where users couldn't go to the next line unless it contained the word `useState`.

## [0.0.3 Preview]

### Changes

- Fixed an error where the snippet was only created at the top level of a file.
- Fixed an error where snippets were always created no matter what file type was being edited.

## [0.0.2 Preview]

### Changes

- Made `useState` case insensitive so that auto capitalization will not affect the extension.
- Added an icon image.

## [0.0.1 Preview]

### Use State Snippet Created

- Type `usestate.<varName>` and press Enter to automatically create a `useState` snippet with the variable name.
  - For example: `useState.name` will create `const [name, setName] = useState();`
  - For example: `useState.age` will create `const [age, setAge] = useState();`
    - Use any variable name you want, and it will generate it for you.
