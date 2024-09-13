const renderError = (error: unknown): { error: string } => {
    console.log(error);
    return {
        error: error instanceof Error ? error.message : 'An error occurred'
    };
};

export default renderError;
