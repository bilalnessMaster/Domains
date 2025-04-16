import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChartNoAxesGantt, Globe, ShieldCheck, Clock, BarChart3, Tag, RefreshCw } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    
    return (
        <>
            <Head title="DN Manager - Simplify Your Domain Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="description" content="Manage all your domains in one place. Track expiry dates, renewals, DNS settings and more with DN Manager." />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {/* Navigation */}
                <header className="w-full  border-[#19140035] dark:border-[#3E3E3A] py-4 px-6 lg:px-8">
                    <nav className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                        <Link href='/' className='flex items-center gap-1'>
                            <ChartNoAxesGantt strokeWidth={1.3} size={30}/>
                            <span className='font-medium text-lg'>DN MANAGER</span>
                        </Link>
                        <div className='flex items-center gap-4'>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="px-6 py-16 lg:py-24 lg:px-8 max-w-7xl mx-auto w-full text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">All Your Domains in One Place</h1>
                    <p className="text-lg lg:text-xl max-w-3xl mx-auto mb-10 text-[#1b1b18]/80 dark:text-[#EDEDEC]/80">
                        Never lose track of a domain again. DN Manager helps you monitor, manage, and optimize your entire domain portfolio with ease.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={route('register')}
                            className="inline-flex items-center justify-center rounded-md bg-[#1b1b18] px-6 py-3 text-base font-medium text-white hover:bg-[#1b1b18]/90 dark:bg-[#EDEDEC] dark:text-[#0a0a0a] dark:hover:bg-[#EDEDEC]/90"
                        >
                            Get Started — Free
                        </Link>
                        <Link
                            href="#features"
                            className="inline-flex items-center justify-center rounded-md border border-[#19140035] px-6 py-3 text-base font-medium hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                        >
                            Learn More
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="px-6 py-16 lg:px-8 bg-[#19140015] dark:bg-[#1b1b18] max-w-7xl mx-auto w-full rounded-lg my-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose DN Manager?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] p-3 rounded-full mb-4">
                                <Clock size={24} className="text-[#1b1b18] dark:text-[#EDEDEC]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Expiry Alerts</h3>
                            <p className="text-[#1b1b18]/70 dark:text-[#EDEDEC]/70">Never miss a renewal deadline with timely notifications before domains expire.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] p-3 rounded-full mb-4">
                                <Globe size={24} className="text-[#1b1b18] dark:text-[#EDEDEC]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">DNS Management</h3>
                            <p className="text-[#1b1b18]/70 dark:text-[#EDEDEC]/70">Track and manage DNS records across multiple registrars from one dashboard.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] p-3 rounded-full mb-4">
                                <ShieldCheck size={24} className="text-[#1b1b18] dark:text-[#EDEDEC]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Security Monitoring</h3>
                            <p className="text-[#1b1b18]/70 dark:text-[#EDEDEC]/70">Stay protected with SSL certificate tracking and security vulnerability alerts.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] p-3 rounded-full mb-4">
                                <BarChart3 size={24} className="text-[#1b1b18] dark:text-[#EDEDEC]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
                            <p className="text-[#1b1b18]/70 dark:text-[#EDEDEC]/70">Gain insights with detailed analytics on domain performance and traffic.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] p-3 rounded-full mb-4">
                                <Tag size={24} className="text-[#1b1b18] dark:text-[#EDEDEC]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Smart Categorization</h3>
                            <p className="text-[#1b1b18]/70 dark:text-[#EDEDEC]/70">Organize domains by project, client, purpose, or any custom tag for easy management.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] p-3 rounded-full mb-4">
                                <RefreshCw size={24} className="text-[#1b1b18] dark:text-[#EDEDEC]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Auto-Sync</h3>
                            <p className="text-[#1b1b18]/70 dark:text-[#EDEDEC]/70">Automatically sync with popular registrars to keep your domain data current.</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-16 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="bg-[#1b1b18] dark:bg-[#EDEDEC] text-white dark:text-[#0a0a0a] rounded-lg p-8 lg:p-12 text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to streamline your domain management?</h2>
                        <p className="mb-8 text-white/80 dark:text-[#0a0a0a]/80 max-w-2xl mx-auto">
                            Join thousands of professionals who trust DN Manager to keep their domains organized and secure.
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-flex items-center justify-center rounded-md bg-white dark:bg-[#0a0a0a] px-6 py-3 text-base font-medium text-[#1b1b18] dark:text-white hover:bg-white/90 dark:hover:bg-[#0a0a0a]/90"
                        >
                            Start Your Free Trial
                        </Link>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="px-6 py-16 lg:px-8 max-w-7xl mx-auto w-full">
                    <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-[#FDFDFC] dark:bg-[#111111] p-6 rounded-lg border border-[#19140035] dark:border-[#3E3E3A]">
                            <p className="mb-4 text-[#1b1b18]/80 dark:text-[#EDEDEC]/80">
                                "DN Manager has saved me countless hours tracking domain renewals. The dashboard is intuitive and the notification system is reliable."
                            </p>
                            <div className="font-medium">Sarah T., Web Developer</div>
                        </div>
                        <div className="bg-[#FDFDFC] dark:bg-[#111111] p-6 rounded-lg border border-[#19140035] dark:border-[#3E3E3A]">
                            <p className="mb-4 text-[#1b1b18]/80 dark:text-[#EDEDEC]/80">
                                "Managing domains for multiple clients became so much easier with DN Manager. The team collaboration features are a game-changer."
                            </p>
                            <div className="font-medium">Marcus L., Agency Owner</div>
                        </div>
                        <div className="bg-[#FDFDFC] dark:bg-[#111111] p-6 rounded-lg border border-[#19140035] dark:border-[#3E3E3A]">
                            <p className="mb-4 text-[#1b1b18]/80 dark:text-[#EDEDEC]/80">
                                "The analytics have helped us identify our most valuable domains and make better investment decisions."
                            </p>
                            <div className="font-medium">Elena R., Digital Marketing Director</div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-auto tborder- border-[#19140035] dark:border-[#3E3E3A] py-6 px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-1 mb-4 md:mb-0">
                            <ChartNoAxesGantt strokeWidth={1.3} size={24}/>
                            <span className='font-medium'>DN MANAGER</span>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <Link href="#" className="text-[#1b1b18]/70 hover:text-[#1b1b18] dark:text-[#EDEDEC]/70 dark:hover:text-[#EDEDEC]">
                                Features
                            </Link>
                            <Link href="#" className="text-[#1b1b18]/70 hover:text-[#1b1b18] dark:text-[#EDEDEC]/70 dark:hover:text-[#EDEDEC]">
                                Pricing
                            </Link>
                            <Link href="#" className="text-[#1b1b18]/70 hover:text-[#1b1b18] dark:text-[#EDEDEC]/70 dark:hover:text-[#EDEDEC]">
                                Support
                            </Link>
                            <Link href="#" className="text-[#1b1b18]/70 hover:text-[#1b1b18] dark:text-[#EDEDEC]/70 dark:hover:text-[#EDEDEC]">
                                Privacy
                            </Link>
                        </div>
                        <div className="mt-4 md:mt-0 text-sm text-[#1b1b18]/60 dark:text-[#EDEDEC]/60">
                            © 2025 DN Manager. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}