<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Molecule;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur API pour les données moléculaires et modélisation 3D (3Dmol.js).
 */
class MoleculeController extends Controller
{
    /**
     * Récupère la structure SMILES et les descripteurs moleculaires au format JSON pour le rendu 3Dmol.js.
     * (Nécessite authentification Sanctum + abonnement actif via middleware).
     *
     * @param int|string $id
     * @return JsonResponse
     */
    public function get3dData(string $id): JsonResponse
    {
        $molecule = Molecule::select([
            'id',
            'nom_chimique',
            'formule_brute',
            'smiles',
            'masse_molaire',
            'descripteurs_moleculaires',
        ])->find($id);

        if (! $molecule) {
            return response()->json([
                'status' => 'error',
                'message' => 'Molécule non trouvée.',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'access_level' => 'full_premium',
            'data' => [
                'id' => $molecule->id,
                'nom_chimique' => $molecule->nom_chimique,
                'formule_brute' => $molecule->formule_brute,
                'smiles' => $molecule->smiles,
                'masse_molaire' => $molecule->masse_molaire,
                'descripteurs_moleculaires' => $molecule->descripteurs_moleculaires,
                '3dmol_config' => [
                    'format' => 'smiles',
                    'input' => $molecule->smiles,
                    'options' => [
                        'backgroundColor' => '0x111827',
                        'style' => ['stick' => [], 'sphere' => ['scale' => 0.25]],
                    ],
                ],
            ],
        ]);
    }
}
