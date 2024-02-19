<?php

use App\Http\Controllers\OtpController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/auth/redirect', function () {
    return Socialite::driver('google')->stateless()->redirect();
});

Route::get('/auth/callback', function () {
    $authUser = Socialite::driver('google')->stateless()->user();

    $user = User::updateOrCreate(
        ['google_auth_id' => $authUser->id],
        ['name' => $authUser->name, 'email' => $authUser->email, 'avatar' => $authUser->avatar],
    );

    $dataJson = json_encode(
        [
            "user" => $user,
            "token" => $authUser->token,
        ]
    );

   return redirect("http://localhost:3000?data=".  base64_encode($dataJson));
});

Route::middleware(['auth.google'])->group(function() {
    Route::post('/generate-otp', [OtpController::class, 'generateOtp']);
    Route::post('/verify-otp', [OtpController::class, 'verifyOtp']);
});
