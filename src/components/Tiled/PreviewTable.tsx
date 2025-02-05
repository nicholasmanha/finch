import { useState, useEffect } from 'react';
import { TiledSearchItem, TableStructure, TiledTableRow } from "./types";
import { getTableData } from "./apiClient";
import { generateSearchPath } from './utils';

type PreviewTableProps = {
    tableItem: TiledSearchItem<TableStructure>
};

export default function PreviewTable ({
    tableItem,
}: PreviewTableProps) {
    const [ tableData, setTableData ] = useState<TiledTableRow[]>([]);

    const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

    

    useEffect(() => {
        const searchPath = generateSearchPath(tableItem);
        getTableData(searchPath, setTableData);
    }, [tableItem]);
    return (
        <div className="w-full m-auto px-4">
            <p className="text-sky-900 text-center">{tableItem.id}</p>
            <div className="h-96 px-6 overflow-auto">
                <table className=" border border-gray-300 shadow-md h-full bg-white">
                    {/* Table Head */}
                    <thead className="bg-gray-200">
                    <tr>
                        {columns.map((col) => (
                        <th key={col} className="border border-gray-300 px-4 py-2 text-left">
                            {col}
                        </th>
                        ))}
                    </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                        {columns.map((col) => (
                            <td key={col} className="border border-gray-300 px-4 py-2">
                            {row[col].toFixed(4)} {/* Format numbers for better readability */}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}