// resources/js/app.jsx
import './bootstrap';
import '../css/app.css'; // Pastikan path ini benar

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
// PENTING: Import helper untuk me-resolve komponen
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Ganti nama aplikasi sesuai kebutuhan
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    // FUNGSI RESOLVE YANG DIPERBAIKI
    resolve: (name) => {
        // Cari komponen di dalam folder Pages dan subfoldernya (misalnya Pages/Post/Show)
        return resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx'));
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});