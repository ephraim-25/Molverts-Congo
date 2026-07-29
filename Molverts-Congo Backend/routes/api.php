<?php

use App\Http\Controllers\Api\MoleculeController;
use App\Http\Controllers\Api\PlanteController;
use App\Http\Controllers\Api\SearchController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Molverts PMT (RDC)
|--------------------------------------------------------------------------
| Architecture REST API Freemium pour la plateforme nationale de biodiversité
| et chimie moléculaire.
| Préfixe global: /v1
*/

Route::prefix('v1')->group(function () {

    // ==========================================
    // 1. ROUTES PUBLIQUES (Freemium & SEO)
    // ==========================================

    // Moteur de recherche multi-entités (Plantes & Molécules)
    Route::get('/search', [SearchController::class, 'search'])->name('api.v1.search');

    // Consultation publique de la fiche d une plante
    Route::get('/plantes/{id}/public', [PlanteController::class, 'showPublic'])->name('api.v1.plantes.public');


    // ==========================================
    // 2. ROUTES RÉSERVÉES AUX ABONNÉS (Paywall)
    // ==========================================
    // Nécessite authentification via Sanctum ET middleware 'subscribed'

    Route::middleware(['auth:sanctum', 'subscribed'])->group(function () {

        // Fiche complète d une plante avec ArcGIS & Molécules associées
        Route::get('/plantes/{id}/full', [PlanteController::class, 'showFull'])->name('api.v1.plantes.full');

        // Extraction des données SMILES & descripteurs JSON pour rendu 3Dmol.js
        Route::get('/molecules/{id}/3d', [MoleculeController::class, 'get3dData'])->name('api.v1.molecules.3d');
    });
});
