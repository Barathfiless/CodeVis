import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { LanguageSelector } from "@/components/LanguageSelector";
import { OutputPanel } from "@/components/OutputPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RandomQuestions } from "@/components/RandomQuestions";
import { DailyPracticeCounter } from "@/components/DailyPracticeCounter";
import { MySQLTableViewer } from "@/components/MySQLTableViewer";
import { ShareCode } from "@/components/ShareCode";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Play, Code2, RotateCcw, Maximize2, Minimize2, User } from "lucide-react";

import { toast } from "sonner";

const defaultCode: Record<string, string> = {
  python: 'print("Hello, World!")',
  javascript: 'console.log("Hello, World!");',
  typescript: 'console.log("Hello, World!");',
  deno: 'console.log("Hello, World!");',
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  go: `package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  swift: `print("Hello, World!")`,
  kotlin: `fun main() {
    println("Hello, World!")
}`,
  php: '<?php\necho "Hello, World!\\n";',
  ruby: 'puts "Hello, World!"',
  perl: 'print "Hello, World!\\n";',
  lua: 'print("Hello, World!")',
  bash: 'echo "Hello, World!"',
  r: 'print("Hello, World!")',
  octave: 'disp("Hello, World!")',
  fortran: `program hello
    print *, "Hello, World!"
end program hello`,
  erlang: `-module(main).
-export([start/0]).
start() -> io:format("Hello, World!~n").`,
  clojure: '(println "Hello, World!")',
  d: `import std.stdio;

void main() {
    writeln("Hello, World!");
}`,
  sql: 'SELECT "Hello, World!";',
  assembly: `section .data
    msg db "Hello, World!", 0x0a
    len equ $ - msg

section .text
    global _start

_start:
    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, len
    int 0x80
    
    mov eax, 1
    xor ebx, ebx
    int 0x80`,
  matlab: `disp('Hello, World!');`,
  objectivec: `#import <Foundation/Foundation.h>

int main(int argc, char * argv[]) {
    NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
    NSLog(@"Hello, World!");
    [pool drain];
    return 0;
}`,
};

  const Index = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(defaultCode.python);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showRandomQuestions, setShowRandomQuestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [consoleHeight, setConsoleHeight] = useState(250);
  const [isDraggingConsole, setIsDraggingConsole] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleBackFromDescription = () => {
    setSelectedQuestion(null);
  };

  const handleConsoleMouseDown = () => {
    setIsDraggingConsole(true);
  };

  const handleConsoleMouseUp = () => {
    setIsDraggingConsole(false);
  };

  const handleConsoleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingConsole) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const newHeight = rect.bottom - e.clientY;
    
    if (newHeight >= 100 && newHeight <= rect.height - 100) {
      setConsoleHeight(newHeight);
    }
  };

  const getFileExtension = (lang: string): string => {
    const extensions: Record<string, string> = {
      python: "main.py",
      javascript: "main.js",
      typescript: "main.ts",
      deno: "main.ts",
      java: "Main.java",
      cpp: "main.cpp",
      c: "main.c",
      csharp: "Program.cs",
      go: "main.go",
      rust: "main.rs",
      swift: "main.swift",
      kotlin: "Main.kt",
      php: "main.php",
      ruby: "main.rb",
      perl: "main.pl",
      lua: "main.lua",
      bash: "main.sh",
      r: "main.R",
      octave: "main.m",
      fortran: "main.f90",
      erlang: "main.erl",
      clojure: "main.clj",
      d: "main.d",
      sql: "main.sql",
      assembly: "main.asm",
      matlab: "main.m",
      objectivec: "main.m",
    };
    return extensions[lang] || "main.txt";
  };

  const shouldCompile = (lang: string): boolean => {
    const compiledLanguages = ["java", "cpp", "c", "csharp", "go", "rust", "swift", "kotlin", "d", "fortran", "objectivec"];
    return compiledLanguages.includes(lang);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage] || "");
    setOutput("");
    setError(null);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const resetCode = () => {
    setCode(defaultCode[language] || "");
    setOutput("");
    setError(null);
  };

  const handleFullscreen = async () => {
    if (!isFullscreen) {
      // Enter fullscreen
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleSelectQuestion = (question: any) => {
    setSelectedQuestion(question);
    setLanguage(question.language.toLowerCase());
    setCode("");
    setOutput("");
    setError(null);
  };

  const runCode = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first");
      return;
    }

    setIsRunning(true);
    setError(null);
    setOutput("");

    try {
      // Use different APIs based on language
      if (language === "sql") {
        // Use Piston API with SQLite3 for SQL execution
        const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";
        
        // Modify SQL to output in a readable format
        let modifiedCode = code;
        // Add .mode column and .headers on for SQLite3 to display formatted output
        if (!code.includes(".mode")) {
          modifiedCode = ".mode column\n.headers on\n" + code;
        }
        
        const response = await fetch(PISTON_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: "sqlite3",
            version: "3.36.0",
            files: [
              {
                content: modifiedCode,
              },
            ],
            stdin: userInput || "",
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("API Response:", errorData);
          throw new Error(`API Error: ${response.status} - ${errorData}`);
        }

        const result = await response.json();
        console.log("SQL Execution result:", result);
        
        const output = result.run?.stdout || "";
        const errorOutput = result.run?.stderr || "";
        const compilationError = result.compile?.stderr || "";

        if (compilationError) {
          setError(compilationError);
          toast.error("SQL execution failed");
        } else if (errorOutput) {
          setError(errorOutput);
          toast.error("SQL execution failed");
        } else {
          setOutput(output || "Query executed successfully");
          toast.success("SQL executed successfully");
          (window as any).incrementDailyPractice?.();
        }
      } else {
        // Use Piston API for other languages
        const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";
        
        const languageMap: Record<string, { language: string; version?: string }> = {
          python: { language: "python", version: "3.10.0" },
          javascript: { language: "javascript", version: "18.15.0" },
          typescript: { language: "typescript", version: "5.0.3" },
          deno: { language: "deno", version: "1.32.3" },
          java: { language: "java", version: "15.0.2" },
          cpp: { language: "c++", version: "10.2.0" },
          c: { language: "c", version: "10.2.0" },
          csharp: { language: "csharp", version: "6.12.0" },
          go: { language: "go", version: "1.16.2" },
          rust: { language: "rust", version: "1.68.2" },
          swift: { language: "swift", version: "5.3.3" },
          kotlin: { language: "kotlin", version: "1.8.20" },
          php: { language: "php", version: "8.2.3" },
          ruby: { language: "ruby", version: "3.0.1" },
          perl: { language: "perl", version: "5.36.0" },
          lua: { language: "lua", version: "5.4.4" },
          bash: { language: "bash", version: "5.2.0" },
          r: { language: "r", version: "4.1.1" },
          octave: { language: "octave", version: "6.2.0" },
          fortran: { language: "fortran", version: "10.2.0" },
          erlang: { language: "erlang", version: "23.0.0" },
          clojure: { language: "clojure", version: "1.10.3" },
          d: { language: "d", version: "2.095.1" },
          assembly: { language: "nasm", version: "2.15.05" },
          matlab: { language: "octave", version: "7.3.0" },
          objectivec: { language: "objective-c", version: "5.1.0" },
        };

        const pistonLanguage = languageMap[language];
        if (!pistonLanguage) {
          throw new Error(`Unsupported language: ${language}`);
        }

        const response = await fetch(PISTON_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: pistonLanguage.language,
            version: pistonLanguage.version,
            files: [
              {
                content: code,
              },
            ],
            stdin: userInput || "",
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("API Response:", errorData);
          throw new Error(`API Error: ${response.status} - ${errorData}`);
        }

        const result = await response.json();
        console.log("Execution result:", result);
        
        const output = result.run?.stdout || "";
        const errorOutput = result.run?.stderr || "";
        const compilationError = result.compile?.stderr || "";

        if (compilationError) {
          setError(compilationError);
          toast.error("Compilation failed");
        } else if (errorOutput) {
          setError(errorOutput);
          toast.error("Execution failed");
        } else {
          setOutput(output || "Program executed successfully");
          toast.success("Code executed successfully");
          (window as any).incrementDailyPractice?.();
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      toast.error("Failed to execute code");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-background ${isFullscreen ? 'pt-0' : ''}`}>
      {/* Header */}
      {!isFullscreen && (
        <header className="flex items-center justify-center px-6 py-3 bg-card border-b border-border shadow-sm relative">
        <div className="absolute left-6 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold text-foreground">CodeVis</h1>
          </div>
        </div>
        <Button
          onClick={runCode}
          disabled={isRunning || !code.trim()}
          variant="ghost"
          size="sm"
          className="p-0 hover:bg-transparent"
          title={isRunning ? "Stop Running" : "Run Code"}
        >
          <Play className="h-20 w-20 text-green-700 fill-green-700" />
        </Button>
        <div className="absolute right-6 flex items-center gap-2">
          <DailyPracticeCounter />
          <ShareCode code={code} language={language} />
          <Button
            onClick={() => setShowRandomQuestions(!showRandomQuestions)}
            variant="ghost"
            size="sm"
            className="group gap-2 px-3 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 dark:from-green-500/20 dark:to-emerald-500/20 dark:text-green-300 dark:border-green-500/30 dark:hover:bg-green-500 dark:hover:text-black dark:hover:border-green-500 border border-green-500/30 transition-all duration-200 flex items-center justify-center hover:shadow-lg light:bg-green-700 light:text-black light:border-green-800 light:hover:bg-green-700 light:hover:text-white light:hover:border-green-700"
            title="Random Questions"
          >
            <Shuffle className="h-4 w-4 dark:text-green-400 dark:group-hover:text-black light:text-black light:group-hover:text-white" />
            <span className="text-xs font-medium">Random Questions</span>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-foreground hover:bg-muted/50"
            title="Profile"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>
      )}

      {/* Main Content */}
      {showRandomQuestions ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 grid grid-cols-[0.33fr,0.67fr] overflow-hidden gap-0">
            {/* Left Panel - Questions List or Description */}
            <div className="flex flex-col overflow-hidden border-r border-border">
              {selectedQuestion ? (
                <>
                  {/* Description Panel */}
                  <div className="flex flex-col overflow-hidden h-full">
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <Button
                        onClick={handleBackFromDescription}
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        ← Back
                      </Button>
                      <h3 className="text-sm font-semibold text-foreground">{selectedQuestion.title}</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                          {selectedQuestion.difficulty}
                        </span>
                      </div>
                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Description</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {selectedQuestion.description}
                        </p>
                      </div>
                      
                      {/* Example */}
                      <div>
                        <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Example</h4>
                        <div className="bg-muted/30 rounded p-3 text-xs text-muted-foreground font-mono border border-border">
                          <pre className="whitespace-pre-wrap break-words">{selectedQuestion.example}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <RandomQuestions onSelectQuestion={handleSelectQuestion} selectedLanguage={language} />
              )}
            </div>
            
            {/* Right Panel - Code Editor and Console */}
            <div className="flex flex-col overflow-hidden" onMouseMove={handleConsoleMouseMove} onMouseUp={handleConsoleMouseUp} onMouseLeave={handleConsoleMouseUp}>
              {/* Code Editor */}
              <div className="flex flex-col border-l border-border flex-1 overflow-hidden">
                <div className="px-4 py-2 bg-card border-b border-border flex items-center justify-between">
                  <LanguageSelector value={language} onChange={handleLanguageChange} />
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={resetCode}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted/50"
                      title="Reset Code"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleFullscreen}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted/50"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <CodeEditor value={code} onChange={handleCodeChange} language={language} />
                </div>
              </div>
              
              {/* Resizable Divider */}
              <div
                onMouseDown={handleConsoleMouseDown}
                className="h-1 bg-border hover:bg-primary/50 cursor-row-resize transition-colors"
                title="Drag to resize console"
              />
              
              {/* Output Console with Input on Left, Output on Right */}
              <div style={{ height: `${consoleHeight}px` }} className="border-t border-border overflow-hidden flex flex-col">
                <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">Console</span>
                </div>
                <div className="flex-1 grid grid-cols-2 overflow-hidden">
                  {/* Input Box - Hidden for MySQL */}
                  {language !== "sql" && (
                    <div className="flex flex-col overflow-hidden px-4 py-2 bg-card border-r border-border">
                      <label className="text-xs font-semibold text-foreground mb-2 flex-shrink-0">Input</label>
                      <textarea
                        placeholder="Enter input data..."
                        value={userInput || ""}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={isRunning}
                        className="flex-1 text-xs resize-none bg-muted border border-border rounded p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}
                  
                  {/* Output Box */}
                  <div className={language === "sql" ? "flex flex-col overflow-hidden px-4 py-2 bg-card" : "flex flex-col overflow-hidden px-4 py-2 bg-card"}>
                    <label className="text-xs font-semibold text-foreground mb-2 flex-shrink-0">Output</label>
                    <div className="flex-1 overflow-y-auto font-mono text-xs bg-muted border border-border rounded p-2 text-foreground">
                      {isRunning ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span>Executing...</span>
                        </div>
                      ) : error ? (
                        <pre className="text-destructive whitespace-pre-wrap">{error}</pre>
                      ) : output ? (
                        <div className="space-y-4">
                          {/* Hide raw output if table visualization is available */}
                          {!output.includes("|") && (
                            <div>
                              <label className="text-xs font-semibold text-foreground mb-2 block">Raw Output:</label>
                              <pre className="text-foreground whitespace-pre-wrap bg-muted/50 p-2 rounded text-xs">{output}</pre>
                            </div>
                          )}
                          {language === "sql" && <MySQLTableViewer output={output} language={language} />}
                        </div>
                      ) : (
                        <div className="text-muted-foreground">Output will appear here</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex-1 grid overflow-hidden ${isFullscreen ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {/* Code Editor */}
          <div className={`flex flex-col ${isFullscreen ? '' : 'border-r border-border'}`}>
            <div className="px-4 py-2 bg-card border-b border-border flex items-center justify-between">
              <LanguageSelector value={language} onChange={handleLanguageChange} />
              <div className="flex items-center gap-2">
                <Button
                  onClick={resetCode}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-muted/50"
                  title="Reset Code"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleFullscreen}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-muted/50"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <CodeEditor value={code} onChange={handleCodeChange} language={language} />
            </div>
          </div>

          {/* Output Panel */}
          {!isFullscreen && (
            <div className="flex flex-col overflow-hidden">
              <OutputPanel output={output} isRunning={isRunning} error={error} userInput={userInput} onInputChange={setUserInput} language={language} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
