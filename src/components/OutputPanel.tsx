import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Terminal, CheckCircle2, XCircle, Plus, Trash2, GripVertical, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  status?: "passed" | "failed" | "pending";
}

interface OutputPanelProps {
  output: string;
  isRunning: boolean;
  error: string | null;
  userInput?: string;
  onInputChange?: (value: string) => void;
  language?: string;
}

export const OutputPanel = ({ output, isRunning, error, userInput, onInputChange, language }: OutputPanelProps) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [newTestcaseInput, setNewTestcaseInput] = useState("");
  const [newTestcaseOutput, setNewTestcaseOutput] = useState("");
  const [showTestcaseForm, setShowTestcaseForm] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [showTestcaseDropdown, setShowTestcaseDropdown] = useState(false);

  const addTestCase = () => {
    if (newTestcaseInput.trim()) {
      const newTestCase: TestCase = {
        id: Date.now().toString(),
        input: newTestcaseInput,
        expectedOutput: newTestcaseInput,
        status: "pending",
      };
      setTestCases([...testCases, newTestCase]);
      setNewTestcaseInput("");
      setShowTestcaseForm(false);
    }
  };

  const deleteTestCase = (id: string) => {
    setTestCases(testCases.filter((tc) => tc.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const draggedIndex = testCases.findIndex((tc) => tc.id === draggedId);
    const targetIndex = testCases.findIndex((tc) => tc.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTestCases = [...testCases];
    const [draggedItem] = newTestCases.splice(draggedIndex, 1);
    newTestCases.splice(targetIndex, 0, draggedItem);

    setTestCases(newTestCases);
    setDraggedId(null);
    setDragOverId(null);
  };

  const checkTestCases = () => {
    if (!output) return;
    
    const updatedTestCases = testCases.map((tc) => ({
      ...tc,
      status: output.trim() === tc.expectedOutput.trim() ? ("passed" as const) : ("failed" as const),
    }));
    setTestCases(updatedTestCases);
  };

  // Auto-check testcases when output changes
  useEffect(() => {
    if (output && testCases.length > 0) {
      checkTestCases();
    }
  }, [output]);

  return (
    <div className="flex flex-col h-full border-l border-border">
      <div className="px-4 py-3 bg-card border-b border-border flex items-center gap-2">
        <Terminal className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Console</h2>
      </div>

      {/* Top Section - Testcase and Input (50%) - Hidden for MySQL */}
      {language !== "sql" && (
        <div className="flex-1 grid grid-rows-2 overflow-visible border-b border-border">
          {/* Testcase Section */}
          <div className="flex flex-col overflow-hidden px-4 py-3 bg-card border-b border-border">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h3 className="text-xs font-semibold text-foreground">Testcases</h3>
            <Button
              onClick={() => setShowTestcaseForm(!showTestcaseForm)}
              size="sm"
              variant="outline"
              className="h-5 text-xs gap-1 px-2"
            >
              <Plus className="h-3 w-3" />
              Add
            </Button>
          </div>

          {/* Testcase Dropdown Button and Content */}
          <div className="relative flex-1 flex flex-col overflow-visible">
            <Button
              onClick={() => setShowTestcaseDropdown(!showTestcaseDropdown)}
              variant="outline"
              className="w-full h-7 text-xs justify-between flex-shrink-0"
            >
              <span className="text-xs">Testcases ({testCases.length})</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${
                showTestcaseDropdown ? "transform rotate-180" : ""
              }`} />
            </Button>

            {/* Dropdown Menu - Display inline when open */}
            {showTestcaseDropdown && (
              <div className="mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                {testCases.length === 0 ? (
                  <div className="p-3 text-xs text-muted-foreground text-center">No testcases</div>
                ) : (
                  testCases.map((tc, index) => (
                    <div
                      key={tc.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, tc.id)}
                      onDragOver={(e) => handleDragOver(e, tc.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, tc.id)}
                      className={`p-2.5 border-b border-border last:border-b-0 text-xs cursor-move hover:bg-muted transition-colors ${
                        draggedId === tc.id
                          ? "opacity-50 bg-primary/5"
                          : dragOverId === tc.id
                          ? "bg-primary/5"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-0">
                        <div className="text-xs text-muted-foreground flex-1 truncate">
                          {tc.input.substring(0, 30)}{tc.input.length > 30 ? "..." : ""}
                        </div>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          {tc.status === "passed" && (
                            <Badge className="bg-success/20 text-success border-success/30 h-4 text-xs gap-0.5 py-0 px-1">
                              <CheckCircle2 className="h-2 w-2" />
                              <span>Passed</span>
                            </Badge>
                          )}
                          {tc.status === "failed" && (
                            <Badge className="bg-destructive/20 text-destructive border-destructive/30 h-4 text-xs gap-0.5 py-0 px-1">
                              <XCircle className="h-2 w-2" />
                              <span>Failed</span>
                            </Badge>
                          )}
                          {tc.status === "pending" && (
                            <Badge variant="secondary" className="h-4 text-xs py-0 px-1">Pending</Badge>
                          )}
                        </div>
                        <Button
                          onClick={() => deleteTestCase(tc.id)}
                          size="sm"
                          variant="ghost"
                          className="h-4 w-4 p-0 flex-shrink-0"
                        >
                          <Trash2 className="h-2 w-2" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Add Testcase Form - Scrollable within container */}
          {showTestcaseForm && (
            <div className="space-y-1 mt-2 p-2 bg-muted rounded-lg border border-border text-xs overflow-hidden flex flex-col">
              <label className="text-xs text-muted-foreground block">Input</label>
              <Textarea
                placeholder="Enter input..."
                value={newTestcaseInput}
                onChange={(e) => setNewTestcaseInput(e.target.value)}
                className="flex-1 text-xs resize-none h-12"
              />
              <div className="flex gap-1">
                <Button
                  onClick={addTestCase}
                  size="sm"
                  className="h-5 text-xs bg-success hover:bg-success/90 px-2"
                >
                  Post
                </Button>
                <Button
                  onClick={() => setShowTestcaseForm(false)}
                  size="sm"
                  variant="outline"
                  className="h-5 text-xs px-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          </div>
        
        {/* Input Section - Close dropdown when clicking outside */}
        {showTestcaseDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowTestcaseDropdown(false)}
          />
        )}
        <div className="flex flex-col overflow-hidden px-4 py-2 bg-card">
          <label className="text-xs font-semibold text-foreground mb-2 flex-shrink-0">Input</label>
          <Textarea
            placeholder="Enter input data (one line per input)..."
            value={userInput || ""}
            onChange={(e) => onInputChange?.(e.target.value)}
            disabled={isRunning}
            className="flex-1 text-xs resize-none"
          />
        </div>
        </div>
      )}

      {/* Bottom Section - Output (50%) */}
      <ScrollArea className="flex-1 bg-console-bg">
        <div className="p-4 font-mono text-sm">
          {isRunning ? (
            <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Executing code...</span>
            </div>
          ) : error ? (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-error">
                <XCircle className="h-4 w-4" />
                <span className="font-semibold">Error</span>
              </div>
              <pre className="text-error whitespace-pre-wrap">{error}</pre>
            </div>
          ) : output ? (
            <div className="space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-semibold">Success</span>
              </div>
              <pre className="text-foreground whitespace-pre-wrap">{output}</pre>
            </div>
          ) : (
            <div className="text-muted-foreground flex flex-col items-center justify-center py-12 text-center">
              <Terminal className="h-12 w-12 mb-4 opacity-50" />
              <p>Click "Run" to execute your code</p>
              <p className="text-xs mt-2">Output will appear here</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
