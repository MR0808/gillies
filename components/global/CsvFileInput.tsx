import Papa from 'papaparse';

const CsvFileInput = ({ onFileLoad }: { onFileLoad: () => void }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    onFileLoad(result.data!);
                },
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true
            });
        }
    };
    return (
        <>
            <input type="file" onChange={handleFileChange} />
        </>
    );
};
export default CsvFileInput;
