import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
}

export const CodeEditor = ({ value, onChange, language }: CodeEditorProps) => {
  const [theme, setTheme] = useState<"light" | "vs-dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "vs-dark" : "light");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const monacoLanguageMap: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    csharp: "csharp",
    go: "go",
    rust: "rust",
    php: "php",
    ruby: "ruby",
    swift: "swift",
    kotlin: "kotlin",
    sql: "sql",
    bash: "shell",
    r: "r",
    lua: "lua",
    perl: "perl",
    deno: "typescript",
    assembly: "asm",
  };

  return (
    <Editor
      height="100%"
      language={monacoLanguageMap[language] || language}
      value={value}
      onChange={onChange}
      theme={theme}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
        fontLigatures: true,
        smoothScrolling: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        padding: { top: 16, bottom: 16 },
      }}
    />
  );
};
