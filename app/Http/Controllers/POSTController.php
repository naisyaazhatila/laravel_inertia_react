<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Post; 
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePostRequest; 


class POSTController extends Controller 
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->paginate(5); 
        return Inertia::render('Home', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // MERUJUK ke resources/js/Pages/Post/Create.jsx
        return Inertia::render('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { 
        sleep(2);

        $fields = $request->validate([
           'body' =>['required', 'min:5'] // Tambahkan validasi min:5
        ]);

        // Perbaikan: gunakan Post::create() untuk menyimpan
        Post::create($fields); 

        // Redirect ke rute utama yang sudah dinamai 'home' di web.php
        return redirect()->route('home')->with('success', 'Postingan baru berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post) 
    {
        // MERUJUK ke resources/js/Pages/Post/Show.jsx
        return Inertia::render('Post/Show', [ 
            'post' => $post 
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        // Implementasi edit biasanya merender form:
        // return Inertia::render('Post/Edit', ['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post) 
    {
        // Implementasi update
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete(); 
        // Redirect ke rute utama setelah hapus
        return redirect()->route('home')->with('success', 'Postingan berhasil dihapus.');
    }
}