import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Suspense } from "react";
import { Await } from "react-router";

interface DataRow {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

interface TableProps {
  rows: DataRow[];
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
];

export default function Table({ rows }: TableProps) {
  return (
    <Suspense fallback={<div>Loading............</div>}>
      <Await resolve={rows}>
        {(value) => (
          <DataGrid
            rows={value}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        )}
      </Await>
    </Suspense>
  );
}
