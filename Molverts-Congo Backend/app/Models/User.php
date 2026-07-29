<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Modèle Utilisateur principal intégrant l authentification Sanctum et le Freemium Paywall.
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property bool $is_subscribed
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Attributs mass-assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_subscribed',
    ];

    /**
     * Attributs masqués pour la sérialisation JSON.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Transtypage des attributs.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_subscribed' => 'boolean',
        ];
    }

    /**
     * Relation One-to-Many avec le modèle Subscription.
     *
     * @return HasMany<Subscription, $this>
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Vérifie si l utilisateur possède un abonnement actuellement valide et actif.
     *
     * @return bool
     */
    public function hasActiveSubscription(): bool
    {
        // 1. Vérification directe du flag rapide is_subscribed
        if ($this->is_subscribed) {
            return true;
        }

        // 2. Vérification dynamique dans la table subscriptions (actif & non expiré)
        return $this->subscriptions()
            ->where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('expires_at')
                      ->orWhere('expires_at', '>', now());
            })
            ->exists();
    }
}
