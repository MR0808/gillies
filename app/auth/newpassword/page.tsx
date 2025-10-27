import NewPasswordFormLayout from '@/components/auth/NewPasswordFormLayout';
import CardWrapper from '@/components/auth/CardWrapper';
import FormError from '@/components/form/FormError';
import { verifyPasswordToken } from '@/actions/resetPassword';

const NewPasswordPage = async ({
    searchParams
}: {
    searchParams: Promise<{ token: string | undefined }>;
}) => {
    const params = await searchParams;

    const token = params.token;

    if (!token) {
        return (
            <CardWrapper
                headerLabel="Welcome to the Gillies Voting System"
                backButtonLabel="Already registered? Login"
                backButtonHref="/auth/login"
                backButton={true}
            >
                <div className="flex flex-col items-center w-full justify-center">
                    <FormError message="Missing token" />
                </div>
            </CardWrapper>
        );
    }

    return <NewPasswordFormLayout token={token} />;
};

export default NewPasswordPage;
