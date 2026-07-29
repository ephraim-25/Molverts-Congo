<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for plants (plantes).
     */
    public function up(): void
    {
        Schema::create('plantes', function (Blueprint $table) {
            $table->id();
            $table->string('nom_scientifique')->unique()->comment('Nom botanique taxonomique unique (ex: Harungana madagascariensis)');
            $table->string('nom_vernaculaire')->nullable()->comment('Nom commun ou vernaculaire en RDC');
            $table->string('famille')->nullable()->comment('Famille botanique (ex: Hypericaceae, Rubiaceae)');
            $table->text('description_publique')->comment('Description botanique générale publique');
            $table->text('usages_medicinaux_publics')->nullable()->comment('Aperçu des usages ethnomédicaux traditionnels');
            $table->text('donnees_ecologiques_avancees')->nullable()->comment('Données écologiques et géospatiales ArcGIS avancées (Abonnés)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plantes');
    }
};
