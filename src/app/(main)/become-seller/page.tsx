import { SellerVerificationForm } from "@/components/seller-verification-form";
import { getMajors } from "@/lib/actions/major";
import { submitSellerVerification } from "@/lib/actions/seller-verification";

export default async function BecomeSellerPage() {
    const majors = await getMajors();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Become a Seller
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ready to share your skills and earn money? Complete the
                        verification process below to start selling your
                        services on SkillSwap.
                    </p>
                </div>

                <SellerVerificationForm
                    majors={majors}
                    onSubmit={async (data) => {
                        await submitSellerVerification(data);
                    }}
                />

                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        What happens next?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-blue-600 font-bold">
                                    1
                                </span>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                Submit Application
                            </h4>
                            <p className="text-sm text-gray-600">
                                Fill out the form above with your student ID and
                                details
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-blue-600 font-bold">
                                    2
                                </span>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                Review Process
                            </h4>
                            <p className="text-sm text-gray-600">
                                Our team will review your application within 2-3
                                business days
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-blue-600 font-bold">
                                    3
                                </span>
                            </div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                Start Selling
                            </h4>
                            <p className="text-sm text-gray-600">
                                Once approved, you can create services and start
                                earning
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
