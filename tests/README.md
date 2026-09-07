# Browser fixture tests

These dependency-free fixtures run the userscript in a real browser. From the repository root:

```powershell
node tests/server.mjs
```

Open <http://localhost:4173/tests/harness.html>. The product fixture checks selector removal, toggle restoration, dock stability, and registry collision handling; the search fixture checks Amazon page-type detection and sponsored-result removal.
