<?php

use App\Http\Controllers\POSTController; // Menggunakan POSTController (sesuai file kamu)
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

/* Rute Utama (Home) */
// Menggunakan 'index' di POSTController
Route::get('/', [POSTController::class, 'index'])->name('home');

/* Rute Resource untuk Posts */
// Ini mendaftarkan: create, store, show, edit, update, destroy
Route::resource('posts', POSTController::class)->except('index');