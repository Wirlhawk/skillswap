import { Footer } from "@/components/landing-page/footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
};

export default LandingLayout;
