<?php

namespace App\Http\Middleware;

use App\Models\User;
use Auth;
use Closure;
use Illuminate\Http\Request;
use Socialite;
use Symfony\Component\HttpFoundation\Response;

class AuthWithGoogle
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (!$token) return $next($request);

        $googleAuthUser = Socialite::driver('google')->userFromToken($token);
        if (!$googleAuthUser) return $next($request);

        $user = User::where('google_auth_id', $googleAuthUser->id)->first();
        if(!$user) return $next($request);
        
        Auth::login($user);
        return $next($request);
    }
}
