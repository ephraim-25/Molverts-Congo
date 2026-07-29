<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plante;
use Illuminate\Http\JsonResponse;

/**
 * Contrôleur API pour la gestion des plantes botaniques.
 */
class PlanteController extends Controller
{
    /**
     * Fiche publique d une plante (accès gratuit, sans authentification).
     * Expose uniquement les données publiques non confidentielles.
     *
     * @param int|string $id
     * @return JsonResponse
     */
    public function showPublic(string $id): JsonResponse
    {
        $plante = Plante::select([
            'id',
            'nom_scientifique',
            'nom_vernaculaire',
            'famille',
            'description_publique',
            'usages_medicinaux_publics',
            'created_at',
        ])->find($id);

        if (! $plante) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plante non trouvée.',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'access_level' => 'public',
            'data' => $plante,
            'paywall_notice' => [
                'message' => 'Pour consulter la carte ArcGIS des données écologiques et la liste complète des molécules chimiques extraites, veuillez débloquer la fiche complète avec un abonnement.',
                'full_profile_endpoint' => url("/api/v1/plantes/{$id}/full"),
            ],
        ]);
    }

    /**
     * Fiche complète d une plante avec données écologiques ArcGIS et molécules associées.
     * (Nécessite authentification Sanctum + abonnement actif via middleware).
     *
     * @param int|string $id
     * @return JsonResponse
     */
    public function showFull(string $id): JsonResponse
    {
        $plante = Plante::with(['molecules' => function ($query) {
            $query->select(['molecules.id', 'nom_chimique', 'formule_brute', 'smiles', 'masse_molaire']);
        }])->find($id);

        if (! $plante) {
            return response()->json([
                'status' => 'error',
                'message' => 'Plante non trouvée.',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'access_level' => 'full_premium',
            'data' => $plante,
        ]);
    }
}
