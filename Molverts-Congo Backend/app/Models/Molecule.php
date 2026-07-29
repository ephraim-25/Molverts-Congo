<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Modèle Eloquent pour l entité Molécule Chimique.
 *
 * @property int $id
 * @property string $nom_chimique
 * @property string|null $formule_brute
 * @property string $smiles
 * @property float|null $masse_molaire
 * @property array|null $descripteurs_moleculaires
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class Molecule extends Model
{
    use HasFactory;

    /**
     * Nom de la table associée au modèle.
     *
     * @var string
     */
    protected $table = 'molecules';

    /**
     * Attributs mass-assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom_chimique',
        'formule_brute',
        'smiles',
        'masse_molaire',
        'descripteurs_moleculaires',
    ];

    /**
     * Transtypage des attributs.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'masse_molaire' => 'float',
        'descripteurs_moleculaires' => 'array',
    ];

    /**
     * Relation Many-to-Many avec le modèle Plante.
     *
     * @return BelongsToMany<Plante, $this>
     */
    public function plantes(): BelongsToMany
    {
        return $this->belongsToMany(Plante::class, 'plante_molecule', 'molecule_id', 'plante_id');
    }
}
