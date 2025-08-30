import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import TermsDialog from "../about/terms-dialog";

interface FooterProps {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    sections?: Array<{
        title: string;
        links: Array<{ name: string; href: string }>;
    }>;
    description?: string;
    socialLinks?: Array<{
        icon: React.ReactElement;
        href: string;
        label: string;
    }>;
    copyright?: string;
    legalLinks?: Array<{
        name: string;
        href: string;
    }>;
}

const defaultSections = [
    {
        title: "Layanan",
        links: [
            { name: "Jelajahi Layanan", href: "/services" },
            { name: "Kategori", href: "/categories" },
            { name: "Penjual Teratas", href: "/top-sellers" },
            { name: "Cara Kerja", href: "/how-it-works" },
        ],
    },
    {
        title: "Perusahaan",
        links: [
            { name: "Tentang Kami", href: "/about" },
            { name: "Tim", href: "/about#team" },
            { name: "Kontak", href: "/contact" },
            { name: "Karir", href: "/careers" },
        ],
    },
    {
        title: "Sumber Daya",
        links: [
            { name: "Pusat Bantuan", href: "/help" },
            { name: "Panduan Pengguna", href: "/guides" },
            { name: "FAQ", href: "/faq" },
            { name: "Kebijakan Privasi", href: "/privacy" },
        ],
    },
];

const defaultSocialLinks = [
    { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
    { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
    { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
    { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

// const defaultLegalLinks = [
//     { name: "Terms and Conditions", href: "" },
//     { name: "Privacy Policy", href: "#" },
// ];

const Footer = ({
    logo = {
        url: "https://www.shadcnblocks.com",
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
        alt: "logo",
        title: "Shadcnblocks.com",
    },
    sections = defaultSections,
    description = "Platform freelance untuk pelajar mengembangkan keterampilan dan menghasilkan.",
    socialLinks = defaultSocialLinks,
    copyright = "© 2025 Skillswap.com. Hak Cipta Dilindungi.",
}: FooterProps) => {
    return (
        <section className="py-32 bg-muted border-t px-6">
            <div className="container max-w-7xl mx-auto">
                <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
                    <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
                        {/* Logo */}
                        <div className="flex items-center gap-2 lg:justify-start">
                            {/* <a href={logo.url}>
                              <img
                                  src={logo.src}
                                  alt={logo.alt}
                                  title={logo.title}
                                  className="h-8"
                              />
                          </a>
                          <h2 className="text-xl font-semibold">
                              {logo.title}
                          </h2> */}
                            <h1 className="text-3xl font-black text-foreground">
                                SkillSwap
                            </h1>
                        </div>
                        <p className="text-muted-foreground max-w-[70%] text-sm">
                            {description}
                        </p>
                        <ul className="text-muted-foreground flex items-center space-x-6">
                            {socialLinks.map((social, idx) => (
                                <li
                                    key={idx}
                                    className="hover:text-primary font-medium"
                                >
                                    <a
                                        href={social.href}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">
                                    {section.title}
                                </h3>
                                <ul className="text-muted-foreground space-y-3 text-sm">
                                    {section.links.map((link, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className="hover:text-primary font-medium"
                                        >
                                            <a href={link.href}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
                    <p className="order-2 lg:order-1">{copyright}</p>
                    {/* <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
                        {legalLinks.map((link, idx) => (
                            <li key={idx} className="hover:text-primary">
                                <a href={link.href}> {link.name}</a>
                            </li>
                        ))}
                        <li></li>
                    </ul> */}

                    <div className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
                        <TermsDialog />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Footer };
