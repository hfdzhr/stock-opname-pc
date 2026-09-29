# Client-side import parsing

Import files (PDF via pdf.js, Excel/CSV via SheetJS) are parsed entirely in the browser. No file bytes are uploaded to any server.

Vercel serverless functions have payload and timeout limits that large PDFs would hit; client parsing sidesteps them completely, and the app already needs the file content on-device for the preview screen anyway.
