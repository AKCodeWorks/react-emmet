# Change Log

All notable changes to the "react-emmet" extension will be documented in this file.

## [0.0.3 Preview]

### Changes

- Fixed an error where snippet was only created at the top level of a file.
- Fixed an error where snippets were always created no matter what file type was.

## [0.0.2 Preview]

### Changes

- Made usestate case insensitive so that auto capitalization will not affect the extension.
- Added an icon image.

## [0.0.1 Preview]

### Use State Snippet Created

- Type usestate.\<varname> and press enter to automatically create a useState snippet with the variable name.
  - For example: useState.name will create <code>const [name, setName] = useState(); </code>
  - For example: useState.age will create <code>const [age, setAge] = useState(); </code>
    - Use any variable name you want and it will generate it for you.
