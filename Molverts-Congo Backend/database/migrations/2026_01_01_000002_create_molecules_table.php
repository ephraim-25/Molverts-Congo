<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for molecules (molecules).
     */
    public function up(): void
    {
        Schema::create('molecules', function (Blueprint $table) {
            $table->id();
            $table->string('nom_chimique')->comment('Nom chimique IUPAC ou usuel de la molécule');
            $table->string('formule_brute')->nullable()->comment('Formule chimique (ex: C20H28O4)');
            $table->text('smiles')->comment('Représentation SMILES pour la structure 3D');
            $table->decimal('masse_molaire', 8, 2)->nullable()->comment('Masse molaire en g/mol');
            $table->json('descripteurs_moleculaires')->nullable()->comment('Descripteurs physico-chimiques et structurales au format JSON (3Dmol.js)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('molecules');
    }
};
