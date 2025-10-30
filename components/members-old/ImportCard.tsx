import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import ImportTable from './ImportTable';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

const requiredOptions = ['firstName', 'lastName', 'email'];

interface SelectedColumnsState {
    [key: string]: string | null;
}
type Props = {
    onCancel: () => void;
    onSubmit: (data: any) => void;
    data: string[][];
    isPending: boolean;
};

const ImportCard = ({ onCancel, onSubmit, data, isPending }: Props) => {
    const headers = data[0];
    const body = data.slice(1);
    const [selectedColumns, setSelectedColumns] =
        useState<SelectedColumnsState>({});

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev };
            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }

            if (value === 'skip') {
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;
            return newSelectedColumns;
        });
    };

    const onContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split('_')[1];
        };

        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);
                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            body: body
                .map((row) => {
                    const transformedRow = row.map((cell, index) => {
                        const columnIndex = getColumnIndex(`column_${index}`);
                        return selectedColumns[`column_${columnIndex}`]
                            ? cell
                            : null;
                    });
                    return transformedRow.every((cell) => cell === null)
                        ? []
                        : transformedRow;
                })
                .filter((row) => row.length > 0)
        };

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, curr, index) => {
                const header = mappedData.headers[index];
                if (header !== null) {
                    acc[header] = curr;
                }
                return acc;
            }, {});
        });

        onSubmit(arrayOfData);
    };
    return (
        <>
            <div className="flex sm:flex-row flex-col items-start justify-between">
                <Heading
                    title={`Import Members -  ${data.length - 1} imports`}
                    description="Manage members below"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="text-xs md:text-sm" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            Object.keys(selectedColumns).length <
                                requiredOptions.length || isPending
                        }
                        className="text-xs md:text-sm"
                        onClick={onContinue}
                    >
                        {isPending ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            <>
                                Continue (
                                {
                                    Object.keys(selectedColumns).filter(Boolean)
                                        .length
                                }
                                /{requiredOptions.length})
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <Separator />
            <ImportTable
                headers={headers}
                body={body}
                selectedColumns={selectedColumns}
                onTableHeadSelectChange={onTableHeadSelectChange}
            />
        </>
    );
};

export default ImportCard;
