export function buildPreviewDoc(code: string): string {
  const cleaned = code
    .replace(/^\s*import\s+.*?['"].*?['"]\s*;?\s*$/gm, "")
    .replace(/export\s+default\s+/g, "")
    .replace(/<\/script>/g, "<\\/script>");

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script src="/vendor/react.js"></script>
    <script src="/vendor/react-dom.js"></script>
    <script src="/vendor/tailwind.js"></script>
    <script src="/vendor/babel.js"></script>
    <style>html,body{margin:0;padding:0;}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" data-presets="react,typescript">
${cleaned}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
    </script>
  </body>
</html>`;
}
