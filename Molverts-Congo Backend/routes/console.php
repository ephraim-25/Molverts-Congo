<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('molverts:status', function () {
    $this->info('Molverts PMT API Service Engine is active.');
})->purpose('Affiche le statut des services Molverts PMT');
