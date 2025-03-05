import { Upload } from 'lucide-react';
import { useCSVReader } from 'react-papaparse';

import { Button } from '@/components/ui/button';

type Props = {
    onUpload: (results: any) => void;
};

const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();
    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button className="text-xs md:text-sm" {...getRootProps()}>
                    <Upload className="mr-2 h-4 w-4" /> Add Bulk
                </Button>
            )}
        </CSVReader>
    );
};

export default UploadButton;
