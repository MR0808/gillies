import { Navbar } from '@/components/mainLayout/NavBar';

interface ContentLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ContentLayoutProps) => {
    return (
        <div className="w-full h-full">
            <div className="pt-10 flex flex-col gap-y-10 items-center justify-center">
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default ProtectedLayout;
