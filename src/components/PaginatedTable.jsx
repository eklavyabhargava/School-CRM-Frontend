import React, { useState } from "react";
import { Table, Pagination, Button } from "rsuite";

const PaginatedTable = ({ data, columns, actions = null, pageSize = 10 }) => {
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <Table autoHeight data={paginatedData}>
        {columns.map((col, index) => (
          <Table.Column
            key={index}
            width={col.width}
            align={col.align}
            fixed={col.fixed}
          >
            <Table.HeaderCell>{col.label}</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => {
                const value = rowData[col.dataKey];

                if (typeof value === "object" && value !== null) {
                  return value.name || "N/A"; // Extract name from object
                }

                return value || "N/A"; // Handle empty values
              }}
            </Table.Cell>
          </Table.Column>
        ))}

        {actions && (
          <Table.Column width={150} align="center">
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <div className="flex space-x-2">
                  {actions.edit && (
                    <Button
                      size="xs"
                      appearance="primary"
                      onClick={() => actions.edit(rowData)}
                    >
                      Edit
                    </Button>
                  )}
                  {actions.delete && (
                    <Button
                      size="xs"
                      appearance="ghost"
                      color="red"
                      onClick={() => actions.delete(rowData)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              )}
            </Table.Cell>
          </Table.Column>
        )}
      </Table>

      <Pagination
        activePage={page}
        total={data.length}
        onChangePage={setPage}
        limit={pageSize}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
};

export default PaginatedTable;
