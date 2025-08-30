import { Lightbulb, Target } from "lucide-react";

export function AboutStory() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Our Story */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-bold text-foreground">
                                Cerita Kami
                            </h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            SkillSwap lahir dari pengamatan sederhana: pelajar memiliki bakat luar biasa yang sering tidak diakui dan kurang dimanfaatkan. Baik itu desain grafis, mengajar, coding, atau menulis kreatif, setiap pelajar membawa keterampilan unik.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Kami menciptakan platform ini untuk menjembatani kesenjangan antara pelajar berbakat dan mereka yang membutuhkan layanan mereka, membangun komunitas di mana belajar dan menghasilkan berjalan beriringan.
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-bold text-foreground">
                                Misi Kami
                            </h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Memberdayakan pelajar dengan menyediakan platform terpercaya di mana mereka dapat menghasilkan dari keterampilan mereka, mendapatkan pengalaman dunia nyata, dan membangun koneksi bermakna dengan sesama pelajar.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Kami bukan sekadar marketplace – kami adalah komunitas yang percaya pada potensi setiap pelajar dan nilai pembelajaran serta kolaborasi antar sesama.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}