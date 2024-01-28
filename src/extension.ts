import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // is the extension active or not??
  console.log("Extension 'ActualReactEmmet' is now active");

  // register the command
  let disposable = vscode.commands.registerCommand(
    "extension.generateUseStateSnippet",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line).text;

        // extract variable name from the pattern no matter case sensitivity
        const useStateRegex = /usestate\.(\w+)$/i;
        const match = line.match(useStateRegex);

        if (match) {
          const variableName = match[1];
          const snippet = `const [${variableName}, set${capitalizeFirstLetter(
            variableName
          )}] = useState();`;

          // replace the line with the generated snippet...probably an easier way to do this but I cant figure it out...
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

  // function to capitalize the first letter
  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
