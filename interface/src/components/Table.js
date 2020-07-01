import React from 'react';
import { useTable } from 'react-table';

// Create a default prop getter
const defaultPropGetter = () => ({})

// Expose some prop getters for headers, rows and cells, or more if you want!
function Table({
  heading,
  subHeadings = [],
  action,
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <div className="table">
      <div className="table-header">
        {heading &&
          <h2>{heading}</h2>
        }

        <div className="sub-headings-wrapper">
          {subHeadings.map((subHeading) => (
            <h3>{subHeading}</h3>
          ))}
        </div>

        {action &&
          <div className="action-wrapper">
            {action}
          </div>
        }
      </div>

      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...column.getHeaderProps([
                      {
                        className: column.className,
                        style: column.style,
                      },
                      getColumnProps(column),
                      getHeaderProps(column),
                    ])}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                // Merge user row props in
                <tr {...row.getRowProps(getRowProps(row))}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        // Return an array of prop objects and react-table will merge them appropriately
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                        ])}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table {
          width: 100%;
          font-family: var(--font-family-sans-serif);
        }

        .table-header {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
        }

        .sub-headings-wrapper {
          display: flex;
          flex-flow: row;
          flex: 1 0 auto;
          align-items: flex-end;
          margin-left: 40px;

          & h3 {
            margin-left: 20px;
            margin-right: 20px;
            font-size: 12px;
          }
        }

        .container {
          width: 100%;
        }

        table {
          border-collapse: separate;
          border-spacing: 0 2px;
          margin-top: -2px; /* correct offset on first border spacing if desired */
          width: 100%;
          min-width: 1000px;
        }

        thead {
          & tr {
          }

          & th {
            text-align: left;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
          }
        }

        td {
          border: solid 1px var(--light-gray);
          border-style: solid none;
          background-color: var(--light-gray);
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;

          &:first-child {
            border-left-style: solid;
            border-top-left-radius: var(--border-radius);
            border-bottom-left-radius: var(--border-radius);
          }

          &:last-child {
            border-right-style: solid;
            border-bottom-right-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
          }
        }
      `}</style>
    </div>

  )
}

export default Table;
