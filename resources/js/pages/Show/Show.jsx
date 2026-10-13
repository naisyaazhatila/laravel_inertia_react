import { Head, Link, router } from '@inertiajs/react'; 

export default function Show({ post }) { 
    // ... formatTime function ...
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const handleDelete = () => {
        // Konfirmasi sebelum menghapus
        if (confirm('Apakah kamu yakin ingin menghapus postingan ini?')) {
            router.delete(`/posts/${post.id}`, {
                onSuccess: () => {
                    console.log('Postingan berhasil dihapus!');
                },
                onError: (errors) => {
                    console.error('Gagal menghapus postingan:', errors);
                }
            });
        }
    };

    return (
        <>
            <Head title={post.title || 'Post Detail'} />

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white">
                <article>
                    <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-600 mb-2">
                            Posted on: {formatTime(post.created_at)}
                        </p>
                        
                        {/* Tombol Delete */}
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded text-sm transition duration-150"
                        >
                            Delete
                        </button>
                        {/* Jika ingin menambahkan update, tambahkan <Link> ke rute edit di sini */}
                    </div>

                    {/* Isi Postingan Lengkap */}
                    <div className="mt-4 text-base text-gray-800 leading-relaxed">
                        {post.body}
                    </div>
                </article>
                
                {/* Tautan kembali ke halaman utama - GUNAKAN LINK INERTIA */}
                <Link href="/" className="mt-8 inline-block text-blue-600 hover:text-blue-800">
                    &larr; Back to Home
                </Link>
            </div>
        </>
    );
}