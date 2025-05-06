import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    CalendarClock,
    Globe,
    Search,
    BarChart3,
    CheckCircle,
    Filter,
    Plus,
    RefreshCw,
    MoreHorizontal,
    Trash
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Domain = {
    id: number;
    name: string;
    registrar: string;
    registration_date: string;
    expiry_date: string;
    auto_renew: boolean;
    purchase_price: number;
    current_value?: number;
    asking_price?: number;
    for_sale: boolean;
    status: string;
    notes: string;
    renewal_cost?: number

};

type DashboardProps = {
    domains: {
        data: Domain[];
        links: any[];
    };
    stats: {
        total: number;
        active: number;
        expiring_soon: number;
        for_sale: number;
    };
    totalValue: number;
};
const calculateDaysUntil = (dateString: string) => {
    const today: any = new Date();
    const expiryDate: any = new Date(dateString);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};


export default function Dashboard({ domains, stats, totalValue }: DashboardProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('all');
    const [filteredDomains, setFilterDomain] = useState(domains.data.filter(domain => {
        if (selectedTab === 'expiring' && calculateDaysUntil(domain.expiry_date) > 30) return false;
        if (selectedTab === 'for_sale' && !domain.for_sale) return false;
        if (selectedTab === 'expired' && domain.status !== 'expired') return false;
        return domain;
    }))
    const totalProfit = domains.data.reduce((acc, domain) => acc += domain?.current_value ?? 0 - domain?.purchase_price, 0)

    useEffect(() => {
        const filteredDomainss = domains.data.filter(domain => {
            if (selectedTab === 'expiring' && calculateDaysUntil(domain.expiry_date) > 30) return false;
            if (selectedTab === 'for_sale' && !domain.for_sale) return false;
            if (selectedTab === 'expired' && domain.status !== 'expired') return false;
            return domain;
        });
        setFilterDomain(filteredDomainss);
    }, [selectedTab])

    const getStatusBadge = (status: string, expiryDate: string) => {
        const daysUntil = calculateDaysUntil(expiryDate);
        if (status === 'expired') {
            return { text: 'Expired', class: 'bg-red-100 text-red-800 dark:bg-orange-900/30 dark:text-orange-400' };
        }
        if (status === 'sold') {
            return { text: 'Sold', class: 'bg-orange-100 text-orange-800 dark:bg-red-900/30 dark:text-red-400' };
        }
        if (daysUntil <= 30) {
            return { text: 'Expiring', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' };
        }
        return { text: 'Active', class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' };
    };

    // Prepare upcoming renewals (domains expiring in next 60 days)
    const upcomingRenewals = domains.data
        .filter(domain => calculateDaysUntil(domain.expiry_date) <= 60 && domain.status !== 'expired')
        .sort((a, b) => calculateDaysUntil(a.expiry_date) - calculateDaysUntil(b.expiry_date))
        .slice(0, 4)
        .map(domain => ({
            name: domain.name,
            days: calculateDaysUntil(domain.expiry_date),
            price: domain?.renewal_cost || domain.purchase_price
        }));
console.log(domains);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Domain Manager Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Domains</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <Globe size={24} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active</p>
                            <p className="text-2xl font-bold">{stats.active}</p>
                        </div>
                        <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle size={24} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Expiring Soon</p>
                            <p className="text-2xl font-bold">{stats.expiring_soon}</p>
                        </div>
                        <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                            <CalendarClock size={24} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
                            <p className="text-2xl font-bold">${totalProfit.toLocaleString()}</p>
                        </div>
                        <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            <BarChart3 size={24} />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Main Domain List Panel */}
                    <div className="col-span-2 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium">Your Domains</h2>
                                <a
                                    href={route('domains.create')}
                                    className="flex items-center gap-1 rounded-md bg-neutral-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                                >
                                    <Plus size={16} />
                                    Add Domain
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search domains..."
                                        className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                                        value={searchQuery}

                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                window.location = `dashboard?search=${searchQuery}`;
                                                console.log(searchQuery);
                                            }
                                        }}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Popover>
                                    <PopoverTrigger className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                                        <Filter size={16} />
                                        Filter
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <form>
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Filters</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Length of the name  site.
                                                    </p>
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="width">Min</Label>
                                                        <Input
                                                            id="width"
                                                            type="number"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="maxWidth">Max</Label>
                                                        <Input
                                                            id="maxWidth"
                                                            type="number"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="maxWidth">TLDs</Label>
                                                        <Input
                                                            id="maxWidth"
                                                            placeholder=".com , .net"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                        </form>

                                    </PopoverContent>

                                </Popover>
                                <button className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                                    <RefreshCw size={16} />
                                    Refresh
                                </button>
                            </div>

                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={() => setSelectedTab('all')}
                                    className={`rounded-md px-3 py-1 text-sm ${selectedTab === 'all'
                                        ? 'bg-gray-200 font-medium dark:bg-gray-700'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setSelectedTab('expiring')}
                                    className={`rounded-md px-3 py-1 text-sm ${selectedTab === 'expiring'
                                        ? 'bg-gray-200 font-medium dark:bg-gray-700'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    Expiring Soon
                                </button>
                                <button
                                    onClick={() => setSelectedTab('for_sale')}
                                    className={`rounded-md px-3 py-1 text-sm ${selectedTab === 'for_sale'
                                        ? 'bg-gray-200 font-medium dark:bg-gray-700'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    For Sale
                                </button>
                                <button
                                    onClick={() => setSelectedTab('expired')}
                                    className={`rounded-md px-3 py-1 text-sm ${selectedTab === 'expired'
                                        ? 'bg-gray-200 font-medium dark:bg-gray-700'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    Expired
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-400">
                                        <th className="whitespace-nowrap px-4 py-3">Domain Name</th>
                                        <th className="whitespace-nowrap px-4 py-3">Status</th>
                                        <th className="whitespace-nowrap px-4 py-3">Expiry</th>
                                        <th className="whitespace-nowrap px-4 py-3">Registrar</th>
                                        <th className="whitespace-nowrap px-4 py-3">Value</th>
                                        <th className="whitespace-nowrap px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredDomains.length > 0 ? (
                                        filteredDomains.map((domain) => {
                                            const status = getStatusBadge(domain.status, domain.expiry_date);
                                            return (
                                                <tr key={domain.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                                    <td className="whitespace-nowrap px-4 py-3">
                                                        {domain.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.class}`}>
                                                            {status.text}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3">
                                                        <div className="flex items-center">
                                                            <span className="mr-1 text-sm">{new Date(domain.expiry_date).toLocaleDateString()}</span>
                                                            {calculateDaysUntil(domain.expiry_date) <= 30 && (
                                                                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                                    {calculateDaysUntil(domain.expiry_date)}d
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3">
                                                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                            {domain.registrar || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3">
                                                        ${domain.current_value?.toLocaleString() || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 flex gap-2 items-center">
                                                        <Link
                                                            href={`/edit-domain/${domain.id}`}
                                                            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700"
                                                        >
                                                            <MoreHorizontal size={18} />
                                                        </Link>
                                                        <Link
                                                            href={`/delete-domain/${domain.id}`}
                                                            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700"
                                                        >
                                                            <Trash size={18} strokeWidth={1.4} color='red' />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                                No domains found matching your filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Showing <span className="font-medium">{filteredDomains.length}</span> of{" "}
                                <span className="font-medium">{domains.data.length}</span> domains
                            </div>
                            <div className="flex gap-1">
                                {domains.links.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url || '#'}
                                        className={`rounded-md border px-3 py-1 text-sm ${link.active
                                            ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                            : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar Panels */}
                    <div className="flex flex-col gap-4 col-span-2 lg:col-span-1 ">
                        {/* Upcoming Renewals Panel */}
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ">
                            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                                <h3 className="font-medium">Upcoming Renewals</h3>
                            </div>
                            <div className="p-4">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {upcomingRenewals.length > 0 ? (
                                        upcomingRenewals.map((domain) => (
                                            <li key={domain.name} className="py-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{domain.name}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {domain.days} days left
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">${domain.price}</p>
                                                        {/* <a
                              href={route('domains.renew', domain.name)}
                              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              Renew Now
                            </a> */}
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No upcoming renewals
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="flex items-center justify-center border-t border-gray-200 p-4 dark:border-gray-700">
                                {/* <a
                  href={route('domains.index', { filter: 'expiring' })}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View All Renewals
                </a> */}
                            </div>
                        </div>

                        {/* Portfolio Summary Panel */}
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium">Portfolio Summary</h3>
                                    <BarChart3 size={18} className="text-gray-400" />
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="space-y-3">
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <p className="text-sm font-medium">Total Value</p>
                                            <p className="text-sm font-medium">${totalValue.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <p className="text-sm font-medium">Domains For Sale</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{stats.for_sale}</p>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                                                style={{ width: `${(stats.for_sale / stats.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <p className="text-sm font-medium">Expiring Soon</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{stats.expiring_soon}</p>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2 rounded-full bg-amber-500 dark:bg-amber-400"
                                                style={{ width: `${(stats.expiring_soon / stats.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
