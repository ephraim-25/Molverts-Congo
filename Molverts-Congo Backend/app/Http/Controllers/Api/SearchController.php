<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Molecule;
use App\Models\Plante;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Contrôleur de Recherche API multi-entités pour le moteur de recherche SEO et public.
 */
class SearchController extends Controller
{
    /**
     * Recherche par mot-clé (query q) dans les plantes et molécules.
     * Renvoie les données publiques filtrées ainsi qu un avis de paywall pour inciter à l abonnement.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $query = trim($request->query('q', ''));

        if (empty($query)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Le paramètre de recherche (q) est obligatoire.',
                'results' => [
                    'plantes' => [],
                    'molecules' => [],
                ],
            ], 400);
        }

        // Recherche dans la table plantes (champs nom_scientifique et nom_vernaculaire)
        $plantes = Plante::query()
            ->where('nom_scientifique', 'LIKE', "%{$query}%")
            ->orWhere('nom_vernaculaire', 'LIKE', "%{$query}%")
            ->select(['id', 'nom_scientifique', 'nom_vernaculaire', 'famille', 'description_publique', 'usages_medicinaux_publics'])
            ->get();

        // Recherche dans la table molecules (champs nom_chimique et formule_brute)
        $molecules = Molecule::query()
            ->where('nom_chimique', 'LIKE', "%{$query}%")
            ->orWhere('formule_brute', 'LIKE', "%{$query}%")
            ->select(['id', 'nom_chimique', 'formule_brute', 'masse_molaire'])
            ->get();

        return response()->json([
            'status' => 'success',
            'query' => $query,
            'results_count' => [
                'plantes' => $plantes->count(),
                'molecules' => $molecules->count(),
            ],
            'data' => [
                'plantes' => $plantes,
                'molecules' => $molecules,
            ],
            'paywall_notice' => [
                'message' => 'Avis Freemium: Les structures 3D SMILES et les données écologiques ArcGIS avancées sont masquées dans les résultats publics.',
                'subscribe_url' => config('app.url') . '/api/v1/subscribe',
            ],
        ]);
    }
}
