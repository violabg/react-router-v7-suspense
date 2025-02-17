import { Route } from "../+types/root";
import Table from "../components/Table";

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

const Data = ({ loaderData }: Route.ComponentProps) => {
  const { rows } = loaderData;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1>Data Grid Example</h1>
      <Table rows={rows} />
    </div>
  );
};
export default Data;
