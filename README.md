# CodeVis
# CodeVis

A modern, interactive code editor and SQL playground built with React, TypeScript, and Monaco Editor. CodeVis provides a powerful environment for learning, practicing, and executing code across multiple programming languages.

## Features

- 🎨 **Multi-Language Support**: Write and execute code in 25+ programming languages
- 🎯 **Random Practice Questions**: Generate random coding problems across different topics and difficulty levels
- 💾 **SQL/MySQL Support**: Interactive SQL playground with table visualization
- 🖊️ **Monaco Editor**: Professional code editor with syntax highlighting and autocomplete
- 📊 **Table Visualization**: Visual representation of SQL query results
- 🌙 **Dark/Light Mode**: Theme toggle for comfortable coding
- 📱 **Responsive Design**: Works seamlessly on different screen sizes
- 📈 **Daily Practice Counter**: Track your coding practice streak

## Supported Languages

Python, JavaScript, TypeScript, Deno, Java, C++, C, C#, Go, Rust, Swift, Kotlin, PHP, Ruby, Perl, Lua, Bash, R, Octave, Fortran, Erlang, Clojure, D, MySQL, Assembly, MATLAB, and more.

## Technology Stack

This project is built with:

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **shadcn-ui** - High-quality UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - Professional code editor
- **Piston API** - Code execution backend

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd codeVis

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:5173
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn-ui components
│   ├── CodeEditor.tsx  # Monaco editor wrapper
│   ├── OutputPanel.tsx # Code execution output display
│   ├── LanguageSelector.tsx  # Language selection dropdown
│   ├── RandomQuestions.tsx   # Practice questions generator
│   └── MySQLTableViewer.tsx  # SQL result visualization
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## Usage

### Writing Code

1. Select your preferred programming language from the language selector
2. Write your code in the editor
3. Click "Run" to execute the code
4. View results in the output panel

### SQL/MySQL Queries

1. Select "MySQL" as the language
2. Write your SQL queries
3. Query results are displayed in a formatted table visualization
4. Supports CREATE TABLE, INSERT, SELECT, UPDATE, DELETE operations

### Practice Questions

1. Click "Random Questions" to access the practice mode
2. Select a topic and difficulty level
3. Solve the problem in the code editor
4. Run your solution to verify

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone github.com/Barathfiless/CodeVis.git

# Step 2: Navigate to the project directory.
cd CodeVis

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

