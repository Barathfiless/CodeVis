import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StringInfo {
  language: string;
  declaration: string;
  concatenation: string;
  interpolation: string;
  length: string;
  substring: string;
  uppercase: string;
  lowercase: string;
  trim: string;
  split: string;
  replace: string;
  notes: string;
}

const stringOperations: StringInfo[] = [
  {
    language: "Python",
    declaration: 's = "Hello"  # or s = \'Hello\'',
    concatenation: 's1 + s2  or  f"{s1}{s2}"',
    interpolation: 'name = "John"\nprint(f"Hello {name}")',
    length: 'len(s)',
    substring: 's[0:5]  # chars 0-4',
    uppercase: 's.upper()',
    lowercase: 's.lower()',
    trim: 's.strip()',
    split: 's.split(" ")',
    replace: 's.replace("old", "new")',
    notes: "Strings are immutable. Use f-strings for interpolation.",
  },
  {
    language: "JavaScript",
    declaration: 'let s = "Hello";  // or let s = \'Hello\';',
    concatenation: 's1 + s2  or  `${s1}${s2}`',
    interpolation: 'let name = "John"; console.log(`Hello ${name}`)',
    length: 's.length',
    substring: 's.substring(0, 5)  or  s.slice(0, 5)',
    uppercase: 's.toUpperCase()',
    lowercase: 's.toLowerCase()',
    trim: 's.trim()',
    split: 's.split(" ")',
    replace: 's.replace("old", "new")',
    notes: "Use template literals with backticks for interpolation.",
  },
  {
    language: "Java",
    declaration: 'String s = "Hello";',
    concatenation: 's1 + s2  or  s1.concat(s2)',
    interpolation: 'String name = "John"; System.out.println("Hello " + name);',
    length: 's.length()',
    substring: 's.substring(0, 5)',
    uppercase: 's.toUpperCase()',
    lowercase: 's.toLowerCase()',
    trim: 's.trim()',
    split: 's.split(" ")',
    replace: 's.replace("old", "new")',
    notes: "Strings are immutable. Use StringBuffer/StringBuilder for mutable strings.",
  },
  {
    language: "C++",
    declaration: 'std::string s = "Hello";',
    concatenation: 's1 + s2',
    interpolation: 'std::cout << "Hello " << name;',
    length: 's.length()  or  s.size()',
    substring: 's.substr(0, 5)',
    uppercase: 'std::transform(s.begin(), s.end(), s.begin(), ::toupper);',
    lowercase: 'std::transform(s.begin(), s.end(), s.begin(), ::tolower);',
    trim: 'Manual implementation',
    split: 'Manual implementation or stringstream',
    replace: 's.replace(pos, len, new_str)',
    notes: "Use std::string for C++. C-style strings (char*) are different.",
  },
  {
    language: "C",
    declaration: 'char s[] = "Hello";  // or char *s = "Hello";',
    concatenation: 'strcat(s1, s2)',
    interpolation: 'printf("Hello %s", name);',
    length: 'strlen(s)',
    substring: 'Manual with strncpy()',
    uppercase: 'Manual with toupper() in loop',
    lowercase: 'Manual with tolower() in loop',
    trim: 'Manual implementation needed',
    split: 'strtok(s, " ")',
    replace: 'Manual or use library',
    notes: "C strings are char arrays. No built-in string type. Use string.h.",
  },
  {
    language: "C#",
    declaration: 'string s = "Hello";',
    concatenation: 's1 + s2  or  string.Concat(s1, s2)',
    interpolation: 'Console.WriteLine($"Hello {name}");',
    length: 's.Length',
    substring: 's.Substring(0, 5)',
    uppercase: 's.ToUpper()',
    lowercase: 's.ToLower()',
    trim: 's.Trim()',
    split: 's.Split(\' \')',
    replace: 's.Replace("old", "new")',
    notes: "Strings are immutable. Use StringBuilder for concatenation in loops.",
  },
  {
    language: "Go",
    declaration: 'var s string = "Hello"  or  s := "Hello"',
    concatenation: 's1 + s2',
    interpolation: 'fmt.Printf("Hello %s", name)',
    length: 'len(s)',
    substring: 's[0:5]',
    uppercase: 'strings.ToUpper(s)',
    lowercase: 'strings.ToLower(s)',
    trim: 'strings.TrimSpace(s)',
    split: 'strings.Split(s, " ")',
    replace: 'strings.ReplaceAll(s, "old", "new")',
    notes: "Strings are immutable. Import 'strings' package for functions.",
  },
  {
    language: "Rust",
    declaration: 'let s: &str = "Hello";  or  let s = String::from("Hello");',
    concatenation: 'format!("{}{}", s1, s2)  or  s1.to_string() + s2',
    interpolation: 'println!("Hello {}", name);',
    length: 's.len()',
    substring: '&s[0..5]',
    uppercase: 's.to_uppercase()',
    lowercase: 's.to_lowercase()',
    trim: 's.trim()',
    split: 's.split(\' \').collect::<Vec<_>>()',
    replace: 's.replace("old", "new")',
    notes: "&str is immutable reference. String is owned. Learn ownership!",
  },
  {
    language: "Ruby",
    declaration: 's = "Hello"  # or s = \'Hello\'',
    concatenation: 's1 + s2  or  "#{s1}#{s2}"',
    interpolation: 'puts "Hello #{name}"',
    length: 's.length  or  s.size',
    substring: 's[0, 5]  or  s[0..4]',
    uppercase: 's.upcase',
    lowercase: 's.downcase',
    trim: 's.strip',
    split: 's.split(" ")',
    replace: 's.gsub("old", "new")',
    notes: "String interpolation with #{}. Flexible string methods.",
  },
  {
    language: "PHP",
    declaration: '$s = "Hello";  // or $s = \'Hello\';',
    concatenation: '$s1 . $s2',
    interpolation: 'echo "Hello $name";',
    length: 'strlen($s)',
    substring: 'substr($s, 0, 5)',
    uppercase: 'strtoupper($s)',
    lowercase: 'strtolower($s)',
    trim: 'trim($s)',
    split: 'explode(" ", $s)',
    replace: 'str_replace("old", "new", $s)',
    notes: "Use . for concatenation. String interpolation with double quotes.",
  },
];

interface StringReferenceProps {
  language?: string;
}

export const StringReference = ({ language }: StringReferenceProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const selectedLang = stringOperations.find(
    (s) => s.language.toLowerCase() === language?.toLowerCase()
  );

  if (!selectedLang) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Select a language to view String operations
      </div>
    );
  }

  const operations = [
    { label: "Declaration", value: selectedLang.declaration },
    { label: "Concatenation", value: selectedLang.concatenation },
    { label: "Interpolation", value: selectedLang.interpolation },
    { label: "Length", value: selectedLang.length },
    { label: "Substring", value: selectedLang.substring },
    { label: "Uppercase", value: selectedLang.uppercase },
    { label: "Lowercase", value: selectedLang.lowercase },
    { label: "Trim", value: selectedLang.trim },
    { label: "Split", value: selectedLang.split },
    { label: "Replace", value: selectedLang.replace },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-foreground mb-4">
          {selectedLang.language} - String Operations
        </h3>
        {operations.map((op, idx) => (
          <Card key={idx} className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="font-mono text-xs">
                {op.label}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => copyToClipboard(op.value)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <code className="text-xs bg-muted p-2 rounded block font-mono whitespace-pre-wrap break-words">
              {op.value}
            </code>
          </Card>
        ))}
        <Card className="p-3 bg-info/10 border-info/30">
          <p className="text-xs text-foreground">{selectedLang.notes}</p>
        </Card>
      </div>
    </ScrollArea>
  );
};
