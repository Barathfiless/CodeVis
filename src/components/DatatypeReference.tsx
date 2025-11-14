import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DatatypeInfo {
  language: string;
  stringInfo: {
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
  };
}

const datatypeReference: DatatypeInfo[] = [
  {
    language: "Python",
    stringInfo: {
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
      notes: "Strings are immutable. Use f-strings for interpolation."
    }
  },
  {
    language: "JavaScript",
    stringInfo: {
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
      notes: "Strings are immutable. Use template literals with backticks for interpolation."
    }
  },
  {
    language: "Java",
    stringInfo: {
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
      notes: "Strings are immutable. Use StringBuffer/StringBuilder for mutable strings."
    }
  },
  {
    language: "C++",
    stringInfo: {
      declaration: 'std::string s = "Hello";',
      concatenation: 's1 + s2',
      interpolation: 'std::string name = "John"; std::cout << "Hello " << name;',
      length: 's.length()  or  s.size()',
      substring: 's.substr(0, 5)',
      uppercase: 'std::transform(s.begin(), s.end(), s.begin(), ::toupper);',
      lowercase: 'std::transform(s.begin(), s.end(), s.begin(), ::tolower);',
      trim: 'Manual implementation or use library',
      split: 'Manual implementation or use stringstream',
      replace: 's.replace(pos, len, new_str)',
      notes: "Use std::string for C++. C-style strings (char*) are different."
    }
  },
  {
    language: "C",
    stringInfo: {
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
      notes: "C strings are char arrays. No built-in string type. Use string.h library."
    }
  },
  {
    language: "C#",
    stringInfo: {
      declaration: 'string s = "Hello";',
      concatenation: 's1 + s2  or  string.Concat(s1, s2)',
      interpolation: 'string name = "John"; Console.WriteLine($"Hello {name}");',
      length: 's.Length',
      substring: 's.Substring(0, 5)',
      uppercase: 's.ToUpper()',
      lowercase: 's.ToLower()',
      trim: 's.Trim()',
      split: 's.Split(\' \')',
      replace: 's.Replace("old", "new")',
      notes: "Strings are immutable. Use StringBuilder for concatenation in loops."
    }
  },
  {
    language: "Go",
    stringInfo: {
      declaration: 'var s string = "Hello"  or  s := "Hello"',
      concatenation: 's1 + s2',
      interpolation: 'name := "John"; fmt.Printf("Hello %s", name)',
      length: 'len(s)',
      substring: 's[0:5]',
      uppercase: 'strings.ToUpper(s)',
      lowercase: 'strings.ToLower(s)',
      trim: 'strings.TrimSpace(s)',
      split: 'strings.Split(s, " ")',
      replace: 'strings.ReplaceAll(s, "old", "new")',
      notes: "Strings are immutable. Import 'strings' package for functions."
    }
  },
  {
    language: "Rust",
    stringInfo: {
      declaration: 'let s: &str = "Hello";  or  let s = String::from("Hello");',
      concatenation: 'format!("{}{}", s1, s2)  or  s1.to_string() + s2',
      interpolation: 'let name = "John"; println!("Hello {}", name);',
      length: 's.len()',
      substring: '&s[0..5]',
      uppercase: 's.to_uppercase()',
      lowercase: 's.to_lowercase()',
      trim: 's.trim()',
      split: 's.split(\' \').collect::<Vec<_>>()',
      replace: 's.replace("old", "new")',
      notes: "&str is immutable reference. String is owned. Learn ownership!"
    }
  },
  {
    language: "Swift",
    stringInfo: {
      declaration: 'let s: String = "Hello"  or  var s = "Hello"',
      concatenation: 's1 + s2',
      interpolation: 'let name = "John"; print("Hello \\(name)")',
      length: 's.count',
      substring: 's[s.index(s.startIndex, offsetBy: 0)..<s.index(s.startIndex, offsetBy: 5)]',
      uppercase: 's.uppercased()',
      lowercase: 's.lowercased()',
      trim: 's.trimmingCharacters(in: .whitespaces)',
      split: 's.split(separator: " ")',
      replace: 's.replacingOccurrences(of: "old", with: "new")',
      notes: "Swift strings are complex with Unicode support. Use String extension methods."
    }
  },
  {
    language: "Kotlin",
    stringInfo: {
      declaration: 'val s: String = "Hello"',
      concatenation: 's1 + s2  or  "$s1$s2"',
      interpolation: 'val name = "John"; println("Hello $name")',
      length: 's.length',
      substring: 's.substring(0, 5)',
      uppercase: 's.uppercase()',
      lowercase: 's.lowercase()',
      trim: 's.trim()',
      split: 's.split(" ")',
      replace: 's.replace("old", "new")',
      notes: "String templates with $ are very convenient. Strings are immutable."
    }
  },
  {
    language: "PHP",
    stringInfo: {
      declaration: '$s = "Hello";  // or $s = \'Hello\';',
      concatenation: '$s1 . $s2',
      interpolation: '$name = "John"; echo "Hello $name";',
      length: 'strlen($s)',
      substring: 'substr($s, 0, 5)',
      uppercase: 'strtoupper($s)',
      lowercase: 'strtolower($s)',
      trim: 'trim($s)',
      split: 'explode(" ", $s)',
      replace: 'str_replace("old", "new", $s)',
      notes: "Use . for concatenation. String interpolation with double quotes."
    }
  },
  {
    language: "Ruby",
    stringInfo: {
      declaration: 's = "Hello"  # or s = \'Hello\'',
      concatenation: 's1 + s2  or  "#{s1}#{s2}"',
      interpolation: 'name = "John"; puts "Hello #{name}"',
      length: 's.length  or  s.size',
      substring: 's[0, 5]  or  s[0..4]',
      uppercase: 's.upcase',
      lowercase: 's.downcase',
      trim: 's.strip',
      split: 's.split(" ")',
      replace: 's.gsub("old", "new")',
      notes: "String interpolation with #{}. Flexible and powerful string methods."
    }
  },
  {
    language: "Perl",
    stringInfo: {
      declaration: '$s = "Hello";  # or $s = \'Hello\';',
      concatenation: '$s1 . $s2  or  "$s1$s2"',
      interpolation: '$name = "John"; print "Hello $name\\n";',
      length: 'length($s)',
      substring: 'substr($s, 0, 5)',
      uppercase: 'uc($s)  or  uc(substr($s, 0, 1)) . lc(substr($s, 1))',
      lowercase: 'lc($s)',
      trim: '$s =~ s/^\\s+|\\s+$//g;',
      split: '@words = split(" ", $s)',
      replace: '$s =~ s/old/new/g;',
      notes: "Perl is powerful with regex. Use . for concatenation or interpolation."
    }
  },
  {
    language: "Lua",
    stringInfo: {
      declaration: 'local s = "Hello"',
      concatenation: 's1 .. s2',
      interpolation: 'No direct interpolation, use string.format()',
      length: '#s',
      substring: 's:sub(1, 5)',
      uppercase: 's:upper()',
      lowercase: 's:lower()',
      trim: 'Requires custom function',
      split: 'Manual or custom function',
      replace: 's:gsub("old", "new")',
      notes: "Use .. for concatenation. String library needed for advanced functions."
    }
  },
  {
    language: "Bash",
    stringInfo: {
      declaration: 's="Hello"  # No spaces around =',
      concatenation: '"$s1$s2"  or  $s1$s2',
      interpolation: 'name="John"; echo "Hello $name"',
      length: '${#s}',
      substring: '${s:0:5}  # from position 0, length 5',
      uppercase: 'echo $s | tr \'a-z\' \'A-Z\'',
      lowercase: 'echo $s | tr \'A-Z\' \'a-z\'',
      trim: '${s%% }  or use xargs',
      split: 'IFS=\' \' read -ra arr <<< "$s"',
      replace: '${s/old/new}',
      notes: "Bash has limited string support. Quoting is crucial. Use sed/awk for complex ops."
    }
  },
  {
    language: "R",
    stringInfo: {
      declaration: 's <- "Hello"  # or s = "Hello"',
      concatenation: 'paste(s1, s2)  or  paste0(s1, s2)',
      interpolation: 'sprintf("Hello %s", name)',
      length: 'nchar(s)',
      substring: 'substr(s, 1, 5)',
      uppercase: 'toupper(s)',
      lowercase: 'tolower(s)',
      trim: 'trimws(s)',
      split: 'strsplit(s, " ")',
      replace: 'gsub("old", "new", s)',
      notes: "R is vector-based. Many functions are vectorized. Use paste for concatenation."
    }
  },
];

interface DatatypeReferenceProps {
  language?: string;
}

export const DatatypeReference = ({ language }: DatatypeReferenceProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const selectedLangData = datatypeReference.find(
    (d) => d.language.toLowerCase() === language?.toLowerCase()
  );

  if (!selectedLangData) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Select a language to view datatypes
      </div>
    );
  }

  const stringInfo = selectedLangData.stringInfo;

  const stringOperations = [
    { label: "Declaration", code: stringInfo.declaration },
    { label: "Concatenation", code: stringInfo.concatenation },
    { label: "Interpolation", code: stringInfo.interpolation },
    { label: "Length", code: stringInfo.length },
    { label: "Substring", code: stringInfo.substring },
    { label: "Uppercase", code: stringInfo.uppercase },
    { label: "Lowercase", code: stringInfo.lowercase },
    { label: "Trim", code: stringInfo.trim },
    { label: "Split", code: stringInfo.split },
    { label: "Replace", code: stringInfo.replace },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-foreground mb-4">
          {selectedLangData.language} String Reference
        </h3>
        {stringOperations.map((op, idx) => (
          <Card key={idx} className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="font-mono text-xs">
                {op.label}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => copyToClipboard(op.code)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <code className="text-xs bg-muted p-2 rounded block font-mono">
              {op.code}
            </code>
          </Card>
        ))}
        <Card className="p-3 bg-muted/50 border-muted">
          <Badge variant="outline" className="font-mono text-xs mb-2">
            Notes
          </Badge>
          <p className="text-xs text-muted-foreground">{stringInfo.notes}</p>
        </Card>
      </div>
    </ScrollArea>
  );
};
