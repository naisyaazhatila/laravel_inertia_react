import { Head, Link } from '@inertiajs/react';

// Batasan karakter untuk pratinjau
const SNIPPET_LENGTH = 150; 

// Fungsi helper untuk format waktu
function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Fungsi helper untuk memotong teks dan mendeteksi apakah perlu "Read more..."
function truncateText(text, limit) {
  if (text.length <= limit) {
    return {
      snippet: text,
      isTruncated: false
    };
  }
  return {
    snippet: text.substring(0, limit) + '...',
    isTruncated: true
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Head title="Home" />

      {/* Konten Utama */}
      <main className="bg-white">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold text-gray-900 mb-8">
            Hello
          </h1>

          <div className="space-y-8">
            {/* PASTIKAN DATA POSTS TIDAK KOSONG SEBELUM DI-LOOP */}
            {posts && posts.data && posts.data.length > 0 ? (
              posts.data.map((post) => {
                const { snippet, isTruncated } = truncateText(post.body, SNIPPET_LENGTH);

                return (
                  <article key={post.id} className="border-b border-gray-200 pb-8">
                    <p className="text-sm text-gray-600 mb-2">
                      Posted on: {formatTime(post.created_at)}
                    </p>
                    
                    {/* Tampilkan Pratinjau Teks */}
                    <p className="text-base text-gray-800 leading-relaxed mb-2">
                      {snippet}
                    </p>

                    {/* GUNAKAN INERTIA LINK UNTUK NAVIGASI DETAIL */}
                    {isTruncated && (
                      <Link
                        href={`/posts/${post.id}`} // Ini mengarah ke rute show
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm cursor-pointer"
                      >
                        Read more...
                      </Link>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="text-center text-gray-500">
                Belum ada postingan untuk ditampilkan.
              </div>
            )}
          </div>

          {/* Pagination (Tinggal ditaruh jika ada) */}
          {posts && posts.links && posts.links.length > 3 && (
            <div className="flex justify-center mt-10 space-x-2">
              {posts.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    link.active
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } ${!link.url && 'pointer-events-none opacity-50'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}