'use client';

import { DataTable } from '@/components/ui/data-table';
import { ResultsColumns } from './ResultsColumns';
import { Results } from '@/types';

const ResultsClient = ({ results }: { results: Results }) => {
    return (
        <DataTable
            searchKey="name"
            columns={ResultsColumns}
            data={results.whiskies}
        />
    );
};

export default ResultsClient;
