<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'platform' => 'Molverts PMT (RDC) - Portail National de la Biodiversité et Chimie',
        'status' => 'online',
        'api_version' => 'v1',
        'documentation_url' => url('/api/v1/search'),
    ]);
});
