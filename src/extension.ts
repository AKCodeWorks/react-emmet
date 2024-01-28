import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension 'useStateSnippetGenerator' is now active");

  // Listen to text document changes
  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = editor.selection.active;
      const line = editor.document.lineAt(position.line).text;

      // Set context variable based on pattern match
      vscode.commands.executeCommand(
        "setContext",
        "useStateSnippetActive",
        /usestate\.\w+$/.test(line)
      );
    }
  });

  // Register the command
  let disposable = vscode.commands.registerCommand(
    "extension.generateUseStateSnippet",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line).text;

        // Extract variable name from the pattern
        const useStateRegex = /^usestate\.(\w+)$/;
        const match = line.match(useStateRegex);

        if (match) {
          const variableName = match[1];
          const snippet = `const [${variableName}, set${capitalizeFirstLetter(
            variableName
          )}] = useState();`;

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

  context.subscriptions.push(disposable);

  // Function to capitalize the first letter
  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log("Extension 'useStateSnippetGenerator' is now deactivated");
}
