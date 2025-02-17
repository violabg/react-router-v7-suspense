import { type GridColDef, DataGrid } from "@mui/x-data-grid";
import { Suspense } from "react";
import { Await } from "react-router";
import type { Route } from "./+types/Data";

interface DataRow {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

interface LoaderData {
  rows: DataRow[];
}

export async function delay() {
  const result = new Promise<LoaderData>((resolve) => {
    setTimeout(() => {
      resolve({
        rows: [
          { id: 1, firstName: "John", lastName: "Doe", age: 25 },
          { id: 2, firstName: "Jane", lastName: "Smith", age: 30 },
          { id: 3, firstName: "Alice", lastName: "Johnson", age: 35 },
          { id: 4, firstName: "Bob", lastName: "Brown", age: 40 },
          { id: 5, firstName: "Charlie", lastName: "White", age: 45 },
        ],
      });
    }, 2500);
  });
  return result;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const result = delay();
  return result;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
];

const Data = ({ loaderData }: Route.ComponentProps) => {
  const { rows } = loaderData;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>Data Grid Example</h1>
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
    </div>
  );
};
export default Data;
