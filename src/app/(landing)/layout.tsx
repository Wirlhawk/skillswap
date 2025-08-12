import { Footer7 } from "@/components/landing-page/footer7";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <Footer7 />
        </div>
    );
};

export default LandingLayout;
