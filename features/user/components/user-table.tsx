import { Table, TableHeader } from "@/components/ui/table";
import { useReactTable } from "@tanstack/react-table";

const fallBackData = [];
export const UserTable = () => {
  const table = useReactTable({});
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader></TableHeader>
      </Table>
    </div>
  );
};
