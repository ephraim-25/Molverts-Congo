<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Middleware Freemium Paywall (subscribed).
 *
 * Bloque l accès aux ressources scientifiques restreintes si l utilisateur n est pas authentifié
 * ou ne dispose pas d un abonnement premium actif.
 */
class EnsureUserIsSubscribed
{
    /**
     * Traite une requête entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Vérification de l authentification et du statut d abonnement
        if (! $user || ! ($user->is_subscribed || $user->hasActiveSubscription())) {
            return response()->json([
                'error' => 'Accès restreint - Abonnement Premium requis',
                'message' => 'Veuillez souscrire à un abonnement Molverts PMT pour accéder aux données scientifiques écologiques (ArcGIS), médicales et moléculaires 3D complètes.',
                'paywall' => [
                    'is_subscribed' => false,
                    'subscription_url' => config('app.url') . '/api/v1/subscribe',
                    'plans' => ['chercheur', 'individuel', 'industriel'],
                ],
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
