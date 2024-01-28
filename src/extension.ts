import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension 'ActualReactEmmet' is now active");

  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = editor.selection.active;
      const line = editor.document.lineAt(position.line).text;
      const isReactHookPatternPresent = /use(state|effect)\.\w+.*$/i.test(line);

      vscode.commands.executeCommand(
        "setContext",
        "isReactHookPattern",
        isReactHookPatternPresent
      );

      const isComponentPatternPresent = /(fc|cc)\.\w+.*$/i.test(line);
      vscode.commands.executeCommand(
        "setContext",
        "isReactComponentPattern",
        isComponentPatternPresent
      );
    }
  });

  let disposable = vscode.commands.registerCommand(
    "extension.generateReactHookSnippet",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line).text;

        // Extract details from the pattern (case-insensitive)
        const reactHookRegex =
          /use(state|effect)\.(\w+)(\.async)?(\[\w*(,\s*\w*)*\])?$/i;
        const match = line.match(reactHookRegex);

        if (match) {
          const hookType = match[1].toLowerCase();
          const functionName = match[2];
          const isAsync = match[3];
          const dependencies = match[4] || "[]";
          let snippet = "";

          if (hookType === "state") {
            snippet = generateUseStateSnippet(functionName);
          } else if (hookType === "effect") {
            snippet = generateUseEffectSnippet(
              functionName,
              isAsync,
              dependencies
            );
          }

          // Replace the line with the generated snippet
          editor.edit((editBuilder) => {
            const range = new vscode.Range(
              new vscode.Position(position.line, 0),
              new vscode.Position(position.line, line.length)
            );
            editBuilder.replace(range, snippet);
          });
        }
      }
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "extension.generateReactComponentSnippet",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const position = editor.selection.active;
      const line = editor.document.lineAt(position.line).text;

      const componentRegex = /(fc|cc)\.(\w+)(\[(.*)\])?$/i;
      const match = line.match(componentRegex);

      if (!match) {
        return;
      }

      const componentType = match[1].toLowerCase();
      const componentName = match[2];
      const componentProps = match[4];

      let snippet = "";

      if (componentType === "fc") {
        snippet = generateFunctionalComponentSnippet(
          componentName,
          componentProps
        );
      } else if (componentType === "cc") {
        snippet = generateClassComponentSnippet(componentName);
      }

      // Replace the line with the generated snippet
      editor.edit((editBuilder) => {
        const range = new vscode.Range(
          new vscode.Position(position.line, 0),
          new vscode.Position(position.line, line.length)
        );
        editBuilder.replace(range, snippet);
      });
    }
  );
  context.subscriptions.push(disposable2);

  // Helper functions
  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function generateUseStateSnippet(variableName: string): string {
    return `const [${variableName}, set${capitalizeFirstLetter(
      variableName
    )}] = useState();`;
  }

  function generateUseEffectSnippet(
    functionName: string,
    isAsync: string | undefined,
    dependencies: string
  ): string {
    const asyncSnippet = isAsync ? `async ` : "";
    const functionCall = isAsync ? `${functionName}();` : `${functionName}();`;
    return `useEffect(() => {\n  ${asyncSnippet}function ${functionName}() {\n    // Your code here\n  }\n  ${functionCall}\n}, ${dependencies});`;
  }

  function generateFunctionalComponentSnippet(
    componentName: string,
    componentProps?: string
  ): string {
    const props = componentProps ? `{${componentProps}}` : "";
    return `const ${componentName} = (${props}) => {\n  return (\n    <div></div>\n  );\n};`;
  }

  function generateClassComponentSnippet(componentName: string): string {
    return `class ${componentName} extends React.Component {\n  render() {\n    return (\n      <div></div>\n    );\n  }\n}`;
  }
}
