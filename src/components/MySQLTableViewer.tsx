import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface TableColumn {
  name: string;
  type: string;
  nullable: boolean;
  key: string;
  default: string;
  extra: string;
}

interface MySQLTableViewerProps {
  output: string;
  language: string;
}

export const MySQLTableViewer = ({ output, language }: MySQLTableViewerProps) => {
  // Only show table visualization for MySQL
  if (language !== "sql" || !output) {
    return null;
  }

  // Parse output to extract table data
  const lines = output.trim().split("\n");
  
  // Check if this is formatted SQLite3 output with column headers
  const isFormattedOutput = lines.length > 1 && lines[0].includes("-");
  
  if (!isFormattedOutput) {
    return null;
  }

  // Parse table structure from formatted SQLite3 output
  const columns: TableColumn[] = [];
  const rows: any[] = [];
  let headerLine = "";
  let separatorLine = "";
  let dataStartIndex = 0;

  // Find header line (first line with | separators)
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("|")) {
      headerLine = lines[i];
      separatorLine = lines[i + 1] || "";
      dataStartIndex = i + 2;
      break;
    }
  }

  if (!headerLine) {
    return null;
  }

  // Parse column headers
  const headerParts = headerLine.split("|").map(p => p.trim()).filter(p => p);
  headerParts.forEach(header => {
    columns.push({
      name: header,
      type: "text",
      nullable: true,
      key: "",
      default: "",
      extra: "",
    });
  });

  // Parse data rows
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.includes("-")) continue;

    const parts = line.split("|").map(p => p.trim()).filter(p => p);
    if (parts.length === columns.length) {
      const row: any = {};
      columns.forEach((col, idx) => {
        row[col.name] = parts[idx] || "";
      });
      rows.push(row);
    }
  }

  if (columns.length === 0 || rows.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4 p-4 bg-card border-2 border-primary/30 shadow-lg">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-primary">📊 Query Result - Table Visualization</h3>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-semibold">{rows.length} rows</span>
        </div>
        <div className="overflow-x-auto border-2 border-primary/20 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/10 hover:bg-primary/15">
                {columns.map((col) => (
                  <TableHead key={col.name} className="text-xs font-bold text-primary">
                    {col.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                  {columns.map((col) => (
                    <TableCell key={`${idx}-${col.name}`} className="text-xs font-mono text-foreground py-3 px-4">
                      <span className="bg-muted/50 px-2 py-1 rounded">{row[col.name] || "NULL"}</span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Total Records: <span className="font-bold text-primary">{rows.length}</span></p>
          <p className="text-xs text-muted-foreground">Columns: <span className="font-bold text-primary">{columns.length}</span></p>
        </div>
      </div>
    </Card>
  );
};
