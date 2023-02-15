import { useState, useMemo } from 'react'
import './App.css'
import { useTable } from 'react-table'
import { PRINTERS } from './data'

export default function App() {
	const data = useMemo(() => [
		  {
			col1: 'Hello',
			col2: 'World',
			action: (
				<div>
					<button>Edit</button>
					<button>Delete</button>
				</div>
			)
		  },
		  {
			col1: 'react-table',
			col2: 'rocks',
		  },
		  {
			col1: 'whatever',
			col2: 'you want',
		  },
	], [])

	const columns = useMemo(() => [
		{
			Header: 'Name',
			accessor: 'col1', // accessor is the "key" in the data
		},
		{
			Header: 'IP',
			accessor: 'col2',
		},
		{
			Header: "Action",
			accessor: "action"
		}
	], [])

	const tableInstance = useTable({ columns, data })

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = tableInstance

  	return (
    	<div className="App">
			{/* apply the table props */}
			<table {...getTableBodyProps()}>
				<thead>
					{/* loop over the header rows */}
					{headerGroups.map(headerGroup => (
						// apply the header row props
						<tr {...headerGroup.getHeaderGroupProps()}>
							{/* loop over the headers in each row */}
							{headerGroup.headers.map(column => (
								// apply the header cell props
								<th {...column.getHeaderProps()}>
									{/* render the header */}
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				{/* apply the table body props */}
				<tbody {...getTableBodyProps()}>
					{/* loop over the table rows */}
					{rows.map(row => {
						// prepare the row for display
						prepareRow(row)
						return (
							// apply the row props
							<tr {...row.getRowProps()}>
								{/* loop over the row cells */}
								{row.cells.map(cell => {
									// apply the cell props
									return (
										<td {...cell.getCellProps()}>
											{/* render the cell contents */}
											{cell.render("Cell")}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
    	</div>
  	)
}
