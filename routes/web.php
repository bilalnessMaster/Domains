<?php

use App\Http\Controllers\DomainController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/create-domain', [DomainController::class, 'display'])->name('domains.create');
    Route::post('/store-domain', [DomainController::class, 'store'])->name('domains.store');
    // Route::get('/store-domain' , [DomainController::class , 'store'])->name('domains.show');
    Route::get('/edit-domain/{id}', [DomainController::class, 'affichage'])->name('domains.edit');
    Route::put('/update-domain/{domain}', [DomainController::class, 'update'])->name('domains.update');
    Route::get('/delete-domain/{domain}', [DomainController::class, 'destroy'])->name('domains.delete');
    // Route::post('/store-domain' , [DomainController::class , 'store'])->name('domains.renew');
    Route::get('dashboard', [DomainController::class, 'show'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
