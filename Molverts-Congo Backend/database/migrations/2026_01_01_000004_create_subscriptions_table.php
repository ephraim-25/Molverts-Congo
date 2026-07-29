<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for subscriptions.
     */
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['active', 'expired', 'canceled'])->default('active');
            $table->string('payment_provider')->comment('Fournisseur de paiement (Mobile Money, Stripe, PayPal, etc.)');
            $table->string('transaction_ref')->unique()->comment('Référence unique de la transaction de paiement');
            $table->timestamp('expires_at')->nullable()->comment('Date et heure d expiration de l abonnement');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
