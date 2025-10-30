'use client';

import type React from 'react';
import { useState } from 'react';
import {
    Upload,
    FileText,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createMembersFromCSV } from '@/actions/members';

const MembersCSVUploadDialog = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState<{
        total: number;
        success: number;
        failed: number;
        errors: string[];
    } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (
                selectedFile.type !== 'text/csv' &&
                !selectedFile.name.endsWith('.csv')
            ) {
                toast.error('Invalid file type', {
                    description: 'Please select a CSV file'
                });
                return;
            }
            setFile(selectedFile);
            setResults(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setResults(null);

        try {
            const content = await file.text();
            const result = await createMembersFromCSV(content);

            if (result.success && result.results) {
                setResults(result.results);
                toast.success('Upload complete', {
                    description: `Successfully created ${result.results.success} users`
                });
            } else {
                toast.error('Upload failed', {
                    description: result.error || 'Failed to process CSV'
                });
            }
        } catch (error) {
            toast.error('Upload failed', {
                description: 'An error occurred while processing the file'
            });
        } finally {
            setUploading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFile(null);
        setResults(null);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload CSV
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload Users from CSV</DialogTitle>
                    <DialogDescription>
                        Upload a CSV file with columns: name, lastname, email
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            CSV must contain headers: <strong>firstname</strong>
                            , <strong>lastname</strong>, and{' '}
                            <strong>email</strong>
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                        <label
                            htmlFor="csv-file"
                            className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50"
                        >
                            <FileText className="h-8 w-8 text-muted-foreground" />
                            <span className="mt-2 text-sm text-muted-foreground">
                                {file ? file.name : 'Click to select CSV file'}
                            </span>
                            <input
                                id="csv-file"
                                type="file"
                                accept=".csv"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                        </label>
                    </div>

                    {results && (
                        <div className="space-y-2 rounded-lg border p-4">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span>
                                    <strong>{results.success}</strong> users
                                    created successfully
                                </span>
                            </div>
                            {results.failed > 0 && (
                                <>
                                    <div className="flex items-center gap-2 text-sm">
                                        <XCircle className="h-4 w-4 text-red-600" />
                                        <span>
                                            <strong>{results.failed}</strong>{' '}
                                            users failed
                                        </span>
                                    </div>
                                    {results.errors.length > 0 && (
                                        <div className="mt-2 max-h-32 overflow-y-auto rounded bg-muted p-2">
                                            {results.errors.map((error, i) => (
                                                <div
                                                    key={i}
                                                    className="text-xs text-muted-foreground"
                                                >
                                                    {error}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            disabled={uploading}
                        >
                            {results ? 'Close' : 'Cancel'}
                        </Button>
                        {!results && (
                            <Button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MembersCSVUploadDialog;
