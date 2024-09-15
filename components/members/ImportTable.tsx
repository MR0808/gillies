import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import TableHeadSelect from './TableHeadSelect';

type Props = {
    headers: string[];
    body: string[][];
    selectedColumns: Record<string, string | null>;
    onTableHeadSelectChange: (
        columnIndex: number,
        value: string | null
    ) => void;
};
const ImportTable = ({
    headers,
    body,
    selectedColumns,
    onTableHeadSelectChange
}: Props) => {
    return (
        <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
            <Table className="relative">
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index}>
                                <TableHeadSelect
                                    columnIndex={index}
                                    selectedColumns={selectedColumns}
                                    onChange={onTableHeadSelectChange}
                                />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {body.map((row: string[], rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default ImportTable;
