<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Modèle Eloquent pour la entité Plante Botanique.
 *
 * @property int $id
 * @property string $nom_scientifique
 * @property string|null $nom_vernaculaire
 * @property string|null $famille
 * @property string $description_publique
 * @property string|null $usages_medicinaux_publics
 * @property string|null $donnees_ecologiques_avancees
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Plante extends Model
{
    use HasFactory;

    /**
     * Nom de la table associée au modèle.
     *
     * @var string
     */
    protected $table = 'plantes';

    /**
     * Attributs mass-assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom_scientifique',
        'nom_vernaculaire',
        'famille',
        'description_publique',
        'usages_medicinaux_publics',
        'donnees_ecologiques_avancees',
    ];

    /**
     * Relation Many-to-Many avec le modèle Molecule.
     *
     * @return BelongsToMany<Molecule, $this>
     */
    public function molecules(): BelongsToMany
    {
        return $this->belongsToMany(Molecule::class, 'plante_molecule', 'plante_id', 'molecule_id');
    }
}
