<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for the plant-molecule pivot table (plante_molecule).
     */
    public function up(): void
    {
        Schema::create('plante_molecule', function (Blueprint $table) {
            $table->foreignId('plante_id')->constrained('plantes')->cascadeOnDelete();
            $table->foreignId('molecule_id')->constrained('molecules')->cascadeOnDelete();

            $table->primary(['plante_id', 'molecule_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plante_molecule');
    }
};
