import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code2, Star, TrendingUp, Filter, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  language: string;
  languageIcon: string;
  description: string;
  example: string;
}

const difficultyLevels = ["All", "Easy", "Medium", "Hard"];
const topics = [
  "All",
  "Array",
  "String",
  "Hash Map",
  "Sorting",
  "Searching",
  "Linked List",
  "Stack",
  "Queue",
  "Tree",
  "Binary Search Tree",
  "Graph",
  "Dynamic Programming",
  "Greedy",
  "Recursion",
  "Backtracking",
  "Bit Manipulation",
  "Math",
  "Design Patterns",
  "MATLAB Matrix Operations",
  "MATLAB Numerical Computing",
  "MATLAB Signal Processing",
  "MATLAB Data Visualization",
];

const topicLogos: Record<string, string> = {
  "All": "",
  "Array": "",
  "String": "",
  "Hash Map": "",
  "Sorting": "",
  "Searching": "",
  "Linked List": "",
  "Stack": "",
  "Queue": "",
  "Tree": "",
  "Binary Search Tree": "",
  "Graph": "",
  "Dynamic Programming": "",
  "Greedy": "",
  "Recursion": "",
  "Backtracking": "",
  "Bit Manipulation": "",
  "Math": "",
  "Design Patterns": "",
  "MATLAB Matrix Operations": "",
  "MATLAB Numerical Computing": "",
  "MATLAB Signal Processing": "",
  "MATLAB Data Visualization": "",
};

const languageNames: Record<string, string> = {
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  java: "Java",
  cpp: "C++",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  swift: "Swift",
  kotlin: "Kotlin",
  php: "PHP",
  ruby: "Ruby",
  perl: "Perl",
  lua: "Lua",
  bash: "Bash",
  r: "R",
  c: "C",
  matlab: "MATLAB",
};

const languageLogos: Record<string, string> = {
  python: "🐍",
  javascript: "⚡",
  typescript: "📘",
  java: "☕",
  cpp: "⚙️",
  c: "🔤",
  csharp: "🎯",
  go: "🐹",
  rust: "🦀",
  swift: "🍎",
  kotlin: "🔷",
  php: "🐘",
  ruby: "💎",
  perl: "🐪",
  lua: "🌙",
  bash: "💻",
  r: "📊",
  matlab: "📐",
};

const defaultQuestions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    language: "Python",
    languageIcon: "🐍",
    description: "Find two numbers in array that add up to target. Return their indices.",
    example: "Input: [2,7,11,15], target=9 → Output: [0,1]"
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    language: "JavaScript",
    languageIcon: "⚡",
    description: "Reverse an array of characters in-place without creating a new string.",
    example: "Input: ['h','e','l','l','o'] → Output: ['o','l','l','e','h']"
  },
  {
    id: 3,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    language: "Java",
    languageIcon: "☕",
    description: "Return level-order traversal (BFS) of a binary tree.",
    example: "Tree: [3,9,20,null,null,15,7] → Output: [[3],[9,20],[15,7]]"
  },
  {
    id: 4,
    title: "Graph DFS - Number of Islands",
    difficulty: "Medium",
    language: "Python",
    languageIcon: "🐍",
    description: "Count distinct islands in a 2D grid using Depth-First Search.",
    example: "Grid: [1,1,0], [1,0,0], [0,0,1] → Output: 2 islands"
  },
  {
    id: 5,
    title: "Longest Increasing Subsequence (Dynamic Programming)",
    difficulty: "Hard",
    language: "C++",
    languageIcon: "⚙️",
    description: "Find length of longest increasing subsequence in array.",
    example: "Input: [10,9,2,5,3,7,101,18] → Output: 4 (sequence: 2,3,7,101)"
  },
  {
    id: 6,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    language: "Java",
    languageIcon: "☕",
    description: "Merge k sorted linked lists into one sorted linked list.",
    example: "Lists: [1→4→5, 1→3→4, 2→6] → Output: 1→1→2→3→4→4→5→6"
  },
  {
    id: 7,
    title: "Stack - Valid Parentheses",
    difficulty: "Easy",
    language: "JavaScript",
    languageIcon: "⚡",
    description: "Check if parentheses/brackets are balanced using stack.",
    example: "Input: '()[]{}' → true, Input: '([)]' → false"
  },
  {
    id: 8,
    title: "Graph - Shortest Path (BFS)",
    difficulty: "Medium",
    language: "Python",
    languageIcon: "🐍",
    description: "Find shortest path between two nodes in unweighted graph.",
    example: "Graph with edges → Shortest path from A to D"
  },
];

interface RandomQuestionsProps {
  onSelectQuestion: (question: Question) => void;
  selectedLanguage?: string;
}

const getRandomQuestions = async (language: string, topic: string, difficulty: string): Promise<Question[]> => {
  try {
    // Using LeetCode-like API or similar service
    // For demonstration, we'll use a mock API approach with fetch
    const apiUrl = `https://www.codewars.com/api/v1/code-challenges?language=${language.toLowerCase()}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("API failed");
      const data = await response.json();
      
      // Map the response to our Question format
      return data.map((item: any, index: number) => ({
        id: index + 1,
        title: item.name || "Untitled",
        difficulty: item.rank?.name || "Medium",
        language: language,
        languageIcon: languageLogos[language.toLowerCase()] || "📝",
        description: item.description || "No description available",
        example: `Solve this ${topic === "All" ? "problem" : topic} problem on Codewars`,
      })).slice(0, 8);
    } catch (e) {
      // Fallback: Generate questions based on local data
      return generateLocalQuestions(language, topic, difficulty);
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    return generateLocalQuestions(language, topic, difficulty);
  }
};

const generateLocalQuestions = (language: string, topic: string, difficulty: string): Question[] => {
  const problemDescriptions: Record<string, string[]> = {
    "Array": [
      "Find missing number in array",
      "Rotate array by k positions",
      "Remove duplicates from sorted array",
      "Find median of two sorted arrays",
      "Product of array except self",
      "First missing positive"
    ],
    "String": [
      "Longest substring without repeating characters",
      "Palindrome check",
      "String compression",
      "Anagram detection",
      "Regular expression matching",
      "Longest common substring"
    ],
    "Hash Map": [
      "Group anagrams",
      "Top K frequent elements",
      "Subarray sum equals K",
      "Valid sudoku",
      "Intersection of arrays",
      "LRU cache design"
    ],
    "Sorting": [
      "Merge intervals",
      "Sort colors (0, 1, 2)",
      "Largest number",
      "Kth largest element",
      "Sort list",
      "Meeting rooms"
    ],
    "Searching": [
      "Binary search",
      "Search in rotated array",
      "Find first and last position",
      "Median of two sorted arrays",
      "Peak element",
      "Sqrt(x)"
    ],
    "Linked List": [
      "Reverse linked list",
      "Merge two sorted lists",
      "Detect cycle",
      "Remove nth node",
      "Reorder list",
      "Palindrome linked list"
    ],
    "Stack": [
      "Valid parentheses",
      "Evaluate reverse polish notation",
      "Largest rectangle in histogram",
      "Trapping rain water",
      "Next greater element",
      "Min stack"
    ],
    "Queue": [
      "Number of islands (BFS)",
      "Sliding window maximum",
      "First unique character",
      "Rotten oranges",
      "Walls and gates",
      "Open the lock"
    ],
    "Tree": [
      "Binary tree level order traversal",
      "Lowest common ancestor",
      "Path sum",
      "Validate binary search tree",
      "Serialize/deserialize tree",
      "Construct tree from traversals"
    ],
    "Binary Search Tree": [
      "Insert into BST",
      "Delete from BST",
      "BST to sorted doubly-linked list",
      "Inorder successor",
      "BST iterator",
      "Balance BST"
    ],
    "Graph": [
      "Number of islands",
      "Clone graph",
      "Course schedule",
      "Alien dictionary",
      "Word ladder",
      "Pacific Atlantic water flow"
    ],
    "Dynamic Programming": [
      "Longest increasing subsequence",
      "Coin change",
      "House robber",
      "Edit distance",
      "Unique paths",
      "Knapsack problem"
    ],
    "Greedy": [
      "Jump game",
      "Gas station",
      "Interval scheduling",
      "Activity selection",
      "Huffman coding",
      "Fractional knapsack"
    ],
    "Recursion": [
      "Fibonacci sequence",
      "Tower of Hanoi",
      "Generate parentheses",
      "Permutations",
      "Combinations",
      "Word search"
    ],
    "Backtracking": [
      "N-Queens problem",
      "Sudoku solver",
      "Permutation II",
      "Combination sum",
      "Word break",
      "Subsets"
    ],
    "Bit Manipulation": [
      "Single number",
      "Majority element",
      "Count bits",
      "Power of two",
      "Reverse bits",
      "Gray code"
    ],
    "Math": [
      "Prime number",
      "GCD and LCM",
      "Power function",
      "Factorial",
      "Fibonacci",
      "Modular arithmetic"
    ],
    "Design Patterns": [
      "LRU cache",
      "Min heap / Priority queue",
      "Singleton pattern",
      "Factory pattern",
      "Observer pattern",
      "Iterator pattern"
    ],
    "MATLAB Matrix Operations": [
      "Matrix creation and indexing",
      "Matrix multiplication",
      "Matrix transpose",
      "Eigenvalues and eigenvectors",
      "Matrix inverse and determinant",
      "Solving linear systems"
    ],
    "MATLAB Numerical Computing": [
      "Polynomial roots",
      "Integration and derivatives",
      "Differential equations",
      "Curve fitting",
      "Interpolation",
      "Root finding"
    ],
    "MATLAB Signal Processing": [
      "FFT analysis",
      "Filtering signals",
      "Convolution",
      "Window functions",
      "Spectral analysis",
      "Time-frequency analysis"
    ],
    "MATLAB Data Visualization": [
      "2D plots and line styles",
      "3D surface plots",
      "Heatmaps and contours",
      "Bar and histogram plots",
      "Image processing visualization",
      "Animation and interactive plots"
    ],
  };

  const problemDetails: Record<string, Record<string, { description: string; sampleInput: string; sampleOutput: string; explanation: string }>> = {
    "Array": {
      "Find missing number in array": {
        description: "Given an array containing n distinct numbers in the range [0, n], find the missing number.",
        sampleInput: "[3, 0, 1]",
        sampleOutput: "2",
        explanation: "The array has 3 elements and range is [0, 3]. Missing number is 2."
      },
      "Rotate array by k positions": {
        description: "Rotate an array to the right by k steps.",
        sampleInput: "array = [1,2,3,4,5,6,7], k = 3",
        sampleOutput: "[5,6,7,1,2,3,4]",
        explanation: "Rotate right by 3: last 3 elements move to front."
      },
      "Remove duplicates from sorted array": {
        description: "Remove duplicates from a sorted array in-place, return the new length.",
        sampleInput: "[1,1,2]",
        sampleOutput: "2",
        explanation: "Array becomes [1,2], length is 2. Duplicates removed."
      },
      "Find median of two sorted arrays": {
        description: "Find the median of two sorted arrays of different sizes.",
        sampleInput: "nums1 = [1,3], nums2 = [2]",
        sampleOutput: "2.0",
        explanation: "Sorted combined: [1,2,3], median is 2."
      },
      "Product of array except self": {
        description: "Given array, return new array where each element is product of all elements except itself.",
        sampleInput: "[1,2,3,4]",
        sampleOutput: "[24,12,8,6]",
        explanation: "24=2*3*4, 12=1*3*4, 8=1*2*4, 6=1*2*3"
      },
      "First missing positive": {
        description: "Find the smallest missing positive integer in an unsorted array.",
        sampleInput: "[3,4,-1,1]",
        sampleOutput: "2",
        explanation: "First missing positive integer is 2."
      }
    },
    "String": {
      "Longest substring without repeating characters": {
        description: "Find the length of the longest substring without repeating characters.",
        sampleInput: "s = 'abcabcbb'",
        sampleOutput: "3",
        explanation: "'abc' is the longest substring without repeating chars, length = 3."
      },
      "Palindrome check": {
        description: "Check if a string is a palindrome, ignoring spaces and punctuation.",
        sampleInput: "s = 'A man, a plan, a canal: Panama'",
        sampleOutput: "true",
        explanation: "After removing non-alphanumeric chars and converting to lowercase, it reads same forwards and backwards."
      },
      "String compression": {
        description: "Compress a string by counting consecutive characters.",
        sampleInput: "'abcccccde'",
        sampleOutput: "'a1b1c5d1e1'",
        explanation: "Replace consecutive chars with char and count."
      },
      "Anagram detection": {
        description: "Check if two strings are anagrams of each other.",
        sampleInput: "s = 'listen', t = 'silent'",
        sampleOutput: "true",
        explanation: "Both contain same characters with same frequencies."
      },
      "Regular expression matching": {
        description: "Implement regex matching with '.' and '*' wildcards.",
        sampleInput: "s = 'aab', p = 'c*a*b'",
        sampleOutput: "true",
        explanation: "c* can match zero chars, a* matches 'aa', b matches b."
      },
      "Longest common substring": {
        description: "Find the longest substring common to two strings.",
        sampleInput: "text1 = 'abcde', text2 = 'ace'",
        sampleOutput: "3",
        explanation: "'ace' is the longest common subsequence."
      }
    },
    "Stack": {
      "Valid parentheses": {
        description: "Check if parentheses/brackets are balanced.",
        sampleInput: "s = '()[]{}'",
        sampleOutput: "true",
        explanation: "All parentheses are properly closed."
      },
      "Evaluate reverse polish notation": {
        description: "Evaluate an expression written in Reverse Polish Notation.",
        sampleInput: "['2','1','+','3','*']",
        sampleOutput: "9",
        explanation: "(2 + 1) * 3 = 9"
      },
      "Largest rectangle in histogram": {
        description: "Find the area of the largest rectangle in a histogram.",
        sampleInput: "heights = [2,1,5,6,2,3]",
        sampleOutput: "10",
        explanation: "Rectangle with height 5 and width 2 gives area 10."
      },
      "Trapping rain water": {
        description: "Calculate how much water can be trapped after raining.",
        sampleInput: "height = [0,1,0,2,1,0,1,4,3,2,1,2]",
        sampleOutput: "6",
        explanation: "Water trapped in the valleys between heights."
      },
      "Next greater element": {
        description: "For each element, find the next greater element to its right.",
        sampleInput: "[1,2,1]",
        sampleOutput: "[2,-1,-1]",
        explanation: "For 1: next greater is 2. For 2 and last 1: no greater element."
      },
      "Min stack": {
        description: "Design a stack that supports push, pop, top with O(1) getMin().",
        sampleInput: "push(1), push(0), push(-3), getMin()=-3, pop(), getMin()=0",
        sampleOutput: "Operations work correctly",
        explanation: "Maintain a second stack to track minimum at each level."
      }
    }
  };

  // Get all problems if "All" is selected
  let selectedProblems: string[] = [];
  
  if (topic === "All") {
    Object.values(problemDescriptions).forEach(problems => {
      selectedProblems = selectedProblems.concat(problems);
    });
  } else {
    selectedProblems = problemDescriptions[topic] || ["Practice " + topic];
  }
  
  const descriptions = difficulty === "All" 
    ? selectedProblems
    : selectedProblems.filter((_, index) => {
        if (difficulty === "Easy") return index < Math.ceil(selectedProblems.length / 3);
        if (difficulty === "Medium") return index >= Math.ceil(selectedProblems.length / 3) && index < 2 * Math.ceil(selectedProblems.length / 3);
        if (difficulty === "Hard") return index >= 2 * Math.ceil(selectedProblems.length / 3);
        return true;
      });
  
  return descriptions.map((desc, index) => {
    const currentTopic = topic === "All" ? "General" : topic;
    const problemDetail = problemDetails[currentTopic]?.[desc];
    
    return {
      id: index + 1,
      title: desc,
      difficulty: difficulty === "All" 
        ? (index < 2 ? "Easy" : index < 4 ? "Medium" : "Hard")
        : (difficulty as "Easy" | "Medium" | "Hard"),
      language: languageNames[language.toLowerCase()] || language,
      languageIcon: languageLogos[language.toLowerCase()] || "📝",
      description: problemDetail?.description || `Solve this ${difficulty === "All" ? (index < 2 ? "Easy" : index < 4 ? "Medium" : "Hard") : difficulty} level ${topic} problem: ${desc}`,
      example: `Sample Input: ${problemDetail?.sampleInput || "See problem details"}

Sample Output: ${problemDetail?.sampleOutput || "See problem details"}

Explanation: ${problemDetail?.explanation || "Implement the solution."}`,
    };
  });
};

export const RandomQuestions = ({ onSelectQuestion, selectedLanguage }: RandomQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions);
  const [selectedTopic, setSelectedTopic] = useState<string>(topics[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(difficultyLevels[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const handleFilterChange = async () => {
    setIsLoading(true);
    const language = selectedLanguage || "python";
    const filteredQuestions = await getRandomQuestions(language, selectedTopic, selectedDifficulty);
    setQuestions(filteredQuestions);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedLanguage, selectedTopic, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-success/10 text-success border-success/20";
      case "Medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "Hard":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <Code2 className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Random Questions</h2>
        <Badge variant="secondary" className="ml-auto">
          {questions.length} Problems
        </Badge>
      </div>

      {/* Filter Toggle */}
      <div
        className="px-4 py-3 border-b border-border flex items-center gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold text-foreground">Filter</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground ml-auto transition-transform ${
            showFilters ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="px-4 py-3 border-b border-border space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Topic</label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic} className="text-xs">
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level} value={level} className="text-xs">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <span className="text-sm text-muted-foreground">Loading questions...</span>
            </div>
          ) : (
            questions.map((question) => (
            <Card
              key={question.id}
              className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:shadow-md"
              onClick={() => onSelectQuestion(question)}
            >
              <div className="flex items-start gap-3">
                <div className="text-sm font-semibold text-muted-foreground flex-shrink-0">{question.id}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {question.title}
                    </h3>
                    <Badge className={getDifficultyColor(question.difficulty)} variant="outline">
                      {question.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
