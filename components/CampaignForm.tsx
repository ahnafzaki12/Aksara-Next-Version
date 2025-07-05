import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"
import Spinner from "./Spinner"


export default function CampaignForm({
    id,
    title: existingTitle,
    images: existingImages,
    description: existingDescription,
    targetedAmount: existingTargetedAmount,
}: {
    id?: string;
    title?: string;
    images?: ({ url: string } | string)[];
    description?: string;
    targetedAmount?: string;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(existingTitle || "");
    const [images, setImages] = useState<({ url: string } | string)[]>(existingImages || []);
    const [description, setDescription] = useState(existingDescription || "");
    const [targetAmount, setTargetAmount] = useState(existingTargetedAmount || "");
    const [isUploading, setIsUploading] = useState(false);
    const h2 = id ? "Edit Campaign" : "Buat Campaign Baru";

    async function saveCampaign(ev: React.FormEvent) {
        ev.preventDefault();
        setLoading(true);

        const data = {
            title,
            description,
            targetedAmount: parseInt(targetAmount), // Convert string to number
            images, // ✅ kirim array link gambar ke backend
        };

        try {
            if (id) {
                await axios.put(`/api/campaigns`, { ...data, id });
            } else {
                await axios.post("/api/campaigns", data);
            }
            router.push("/admin/campaigns");
        } catch (error) {
            console.error("Error saving campaign:", error);
        } finally {
            setLoading(false);
        }
    }

    async function uploadImages(ev: React.ChangeEvent<HTMLInputElement>) {
        const files = ev.target.files;
        if (files && files.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }

            try {
                const res = await axios.post('/api/upload', data);
                setImages(oldImages => [...oldImages, ...res.data.links]);
                setIsUploading(false);
            } catch (error) {
                setIsUploading(false);
                console.error('Upload failed:', error);
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{h2}</h1>
                <p className="text-gray-600">Mulai galang dana untuk kebaikan dan buat dampak positif</p>
            </div>

            {/* Form */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-sm">
                <form onSubmit={saveCampaign} className="space-y-6">
                    {/* Campaign Title */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                            Judul Campaign
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Masukkan judul campaign yang menarik"
                                value={title}
                                onChange={(ev) => setTitle(ev.target.value)}
                                required
                                className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:bg-white/80"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Photos</label>
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                            {!!images?.length && images.map((img, idx) => (
                                <div key={idx} className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                                    <img src={typeof img === "string" ? img : img.url} alt={`Product image ${idx + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {isUploading && (
                                <div className="w-full aspect-square flex items-center justify-center rounded-xl bg-white border border-gray-200 shadow-sm">
                                    <Spinner />
                                </div>
                            )}
                            {/* Upload Box */}
                            <label className="w-full aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                                <svg className="w-6 h-6 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25..." />
                                </svg>
                                <span className="text-sm font-medium">Upload</span>
                                <input type="file" className="hidden" onChange={uploadImages} name="file" />
                            </label>
                        </div>
                        {!images?.length && !isUploading && (
                            <div className="mt-2 text-sm text-gray-500 italic">No photos in this product</div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                            Deskripsi Campaign
                        </label>
                        <div className="relative">
                            <textarea
                                placeholder="Ceritakan tujuan dan latar belakang campaign Anda..."
                                value={description}
                                onChange={(ev) => setDescription(ev.target.value)}
                                required
                                rows={5}
                                className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:bg-white/80 resize-none"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Target Amount */}
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
                            Target Donasi
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-4 text-gray-500 font-medium">Rp</div>
                            <input
                                type="number"
                                placeholder="5000000"
                                value={targetAmount}
                                onChange={(ev) => setTargetAmount(ev.target.value)}
                                required
                                min="1000"
                                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:bg-white/80"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Minimum target donasi Rp 1.000</p>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan Campaign...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Simpan Campaign
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                    </div>
                </form>
            </div>

            {/* Info Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-100/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Terverifikasi</p>
                            <p className="text-xs text-gray-600">Campaign akan direview</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50/50 backdrop-blur-sm rounded-2xl p-4 border border-green-100/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.467-.22-2.121-.659-1.172-.879-1.172-2.303 0-3.182C10.464 7.68 11.232 7.5 12 7.5c.768 0 1.536.22 2.121.659l.879.659" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Transparan</p>
                            <p className="text-xs text-gray-600">Dana terpantau real-time</p>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-100/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Terpercaya</p>
                            <p className="text-xs text-gray-600">Platform aman & legal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}