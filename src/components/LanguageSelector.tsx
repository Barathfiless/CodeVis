import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const languageIcons: Record<string, React.ReactNode> = {
  python: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
      alt="Python"
      className="h-5 w-5"
    />
  ),
  javascript: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
      alt="JavaScript"
      className="h-5 w-5"
    />
  ),
  typescript: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
      alt="TypeScript"
      className="h-5 w-5"
    />
  ),
  deno: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/denojs/denojs-original.svg"
      alt="Deno"
      className="h-5 w-5"
    />
  ),
  java: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
      alt="Java"
      className="h-5 w-5"
    />
  ),
  cpp: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
      alt="C++"
      className="h-5 w-5"
    />
  ),
  c: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"
      alt="C"
      className="h-5 w-5"
    />
  ),
  csharp: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"
      alt="C#"
      className="h-5 w-5"
    />
  ),
  go: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"
      alt="Go"
      className="h-5 w-5"
    />
  ),
  rust: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-plain.svg"
      alt="Rust"
      className="h-5 w-5"
    />
  ),
  swift: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg"
      alt="Swift"
      className="h-5 w-5"
    />
  ),
  kotlin: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"
      alt="Kotlin"
      className="h-5 w-5"
    />
  ),
  php: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
      alt="PHP"
      className="h-5 w-5"
    />
  ),
  ruby: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg"
      alt="Ruby"
      className="h-5 w-5"
    />
  ),
  perl: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/perl/perl-original.svg"
      alt="Perl"
      className="h-5 w-5"
    />
  ),
  lua: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg"
      alt="Lua"
      className="h-5 w-5"
    />
  ),
  bash: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg"
      alt="Bash"
      className="h-5 w-5"
    />
  ),
  r: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg"
      alt="R"
      className="h-5 w-5"
    />
  ),
  octave: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg"
      alt="Octave"
      className="h-5 w-5"
    />
  ),
  fortran: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fortran/fortran-original.svg"
      alt="Fortran"
      className="h-5 w-5"
    />
  ),
  erlang: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/erlang/erlang-original.svg"
      alt="Erlang"
      className="h-5 w-5"
    />
  ),
  clojure: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clojure/clojure-original.svg"
      alt="Clojure"
      className="h-5 w-5"
    />
  ),
  d: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d/d-original.svg"
      alt="D"
      className="h-5 w-5"
    />
  ),
  sql: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
      alt="MySQL"
      className="h-5 w-5"
    />
  ),
  assembly: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/assembly/assembly-plain.svg"
      alt="Assembly"
      className="h-5 w-5"
    />
  ),
  matlab: (
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg"
      alt="MATLAB"
      className="h-5 w-5"
    />
  ),
};
export const languages = [
  { id: "python", name: "Python", version: "3.10.0" },
  { id: "javascript", name: "JavaScript (Node.js)", version: "18.15.0" },
  { id: "typescript", name: "TypeScript", version: "5.0.3" },
  { id: "deno", name: "Deno", version: "1.32.3" },
  { id: "java", name: "Java", version: "15.0.2" },
  { id: "cpp", name: "C++", version: "10.2.0" },
  { id: "c", name: "C", version: "10.2.0" },
  { id: "csharp", name: "C#", version: "6.12.0" },
  { id: "go", name: "Go", version: "1.16.2" },
  { id: "rust", name: "Rust", version: "1.68.2" },
  { id: "swift", name: "Swift", version: "5.3.3" },
  { id: "kotlin", name: "Kotlin", version: "1.8.20" },
  { id: "php", name: "PHP", version: "8.2.3" },
  { id: "ruby", name: "Ruby", version: "3.0.1" },
  { id: "perl", name: "Perl", version: "5.36.0" },
  { id: "lua", name: "Lua", version: "5.4.4" },
  { id: "bash", name: "Bash", version: "5.2.0" },
  { id: "r", name: "R", version: "4.1.1" },
  { id: "octave", name: "Octave (MATLAB)", version: "6.2.0" },
  { id: "fortran", name: "Fortran", version: "10.2.0" },
  { id: "erlang", name: "Erlang", version: "23.0.0" },
  { id: "clojure", name: "Clojure", version: "1.10.3" },
  { id: "d", name: "D", version: "2.095.1" },
  { id: "sql", name: "MySQL", version: "8.0.0" },
  { id: "assembly", name: "Assembly (NASM)", version: "2.15.05" },
  { id: "matlab", name: "MATLAB", version: "7.3.0" },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  const selectedLanguage = languages.find((lang) => lang.id === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[240px] bg-background border-border">
        <SelectValue>
          {selectedLanguage ? (
            <span className="flex items-center gap-2">
              {languageIcons[selectedLanguage.id]}
              <span className="font-medium">{selectedLanguage.name}</span>
              <span className="text-xs text-muted-foreground">
                {selectedLanguage.version}
              </span>
            </span>
          ) : (
            "Select Language"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        <ScrollArea className="h-[300px]">
          {languages.map((lang) => (
            <SelectItem key={lang.id} value={lang.id} className="cursor-pointer">
              <span className="flex items-center gap-2">
                {languageIcons[lang.id]}
                <span className="font-medium">{lang.name}</span>
                <span className="text-xs text-muted-foreground">{lang.version}</span>
              </span>
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};
