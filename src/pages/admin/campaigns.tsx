import Link from "next/link";
import Layout from "../../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type Campaign = {
    id: string;
    title: string;
    description: string;
    targetedAmount: number;
    collectedAmount: number;
    imageUrl: string;
};

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchCampaigns() {
        try {
            setLoading(true);
            const res = await axios.get("/api/campaigns")
            setCampaigns(res.data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCampaigns();
    }, [])

    const MySwal = withReactContent(Swal);

    async function DeleteCampaign(campaign: Campaign) {
        MySwal.fire({
            title: 'Are you sure?',
            text: `Do you really want to delete "${campaign.title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'rounded-xl',
                confirmButton: 'rounded-lg px-4 py-2',
                cancelButton: 'rounded-lg px-4 py-2'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/campaigns?id=${campaign.id}`);
                    await fetchCampaigns();
                    MySwal.fire({
                        title: 'Deleted!',
                        text: 'Campaign has been deleted successfully.',
                        icon: 'success',
                        customClass: {
                            popup: 'rounded-xl',
                            confirmButton: 'rounded-lg px-4 py-2'
                        }
                    });
                } catch (error) {
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Failed to delete campaign. Please try again.',
                        icon: 'error',
                        customClass: {
                            popup: 'rounded-xl',
                            confirmButton: 'rounded-lg px-4 py-2'
                        }
                    });
                }
            }
        });
    }

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-6"></div>
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                                            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                            <div className="flex space-x-2">
                                                <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                                                <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-white py-8 rounded-2xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Management</h1>
                        <p className="text-gray-600">Manage your donation campaigns efficiently</p>
                    </div>

                    {/* Main Content Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up">
                        {campaigns.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns found</h3>
                                <p className="text-gray-500 mb-6">Get started by creating your first campaign</p>
                                <Link
                                    href="/campaigns/new"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Create Campaign
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Table Header */}
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Campaigns ({campaigns.length})
                                        </h2>
                                        <Link
                                            href="/admin/campaigns/new"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 hover:shadow-md"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Campaign
                                        </Link>
                                    </div>
                                </div>

                                {/* Campaigns List */}
                                <div className="divide-y divide-gray-100">
                                    {campaigns.map((campaign, index) => (
                                        <div
                                            key={campaign.id || index}
                                            className="p-6 hover:bg-gray-50 transition-all duration-200 group animate-fade-in-up"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                                        {campaign.title}
                                                    </h3>
                                                    {campaign.description && (
                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                            {campaign.description}
                                                        </p>
                                                    )}
                                                    <div className="flex flex-col gap-1 mt-2">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <span className="flex items-center">
                                                                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                                </svg>
                                                                Rp {campaign.collectedAmount?.toLocaleString() || 0}
                                                            </span>
                                                            <span className="mx-2 text-gray-400">/</span>
                                                            <span>Rp {campaign.targetedAmount?.toLocaleString() || 0}</span>
                                                        </div>

                                                        {/* Progress bar */}
                                                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-green-500 transition-all duration-300"
                                                                style={{
                                                                    width: `${campaign.targetedAmount && campaign.collectedAmount
                                                                        ? Math.min((campaign.collectedAmount / campaign.targetedAmount) * 100, 100)
                                                                        : 0
                                                                        }%`
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3 ml-6">
                                                    <Link
                                                        href={`/admin/campaigns/edit/${campaign.id}`}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105"
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => DeleteCampaign(campaign)}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 hover:scale-105 hover:shadow-md"
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>


        </Layout>
    )
}