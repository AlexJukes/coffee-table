import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import type { MRT_ColumnDef } from "material-react-table";
import { API_KEY } from "../apiKey";

interface Resource {
  date: string;
  value: number;
}

interface ResourceData {
  name: string;
  data: Resource[];
}

const getTableData = async (): Promise<ResourceData> => {
  if (API_KEY) {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=COFFEE&apikey=${API_KEY}`
    );

    return data;
  }

  return { name: "No API KEY", data: [] };
};

const TableData: React.FC = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["table"],
    queryFn: getTableData,
  });

  const columns = useMemo<MRT_ColumnDef<Resource>[]>(
    () => [
      {
        header: "Date",
        accessorKey: "date", //simple accessorKey pointing to flat data
      },
      {
        header: "Value",
        accessorKey: "value", //simple accessorKey pointing to flat data
      },
    ],
    []
  );

  const resourceData = data?.data || [];

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    if (error instanceof Error) {
      <div>
        <span>Something went wrong...</span>
        <span>{error.message}</span>
      </div>;
    }
    return (
      <div>
        <span>Something went wrong...</span>
      </div>
    );
  }

  return (
    <>
      <div>{data?.name}</div>
      <MaterialReactTable
        columns={columns}
        data={resourceData}
        enableRowSelection //enable some features
        enableColumnOrdering
      />
    </>
  );
};

export { TableData };
