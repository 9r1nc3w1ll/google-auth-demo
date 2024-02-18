<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Otp;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class OtpController extends Controller
{
    public function generateOtp()
    {
        $user = Auth::user();
        $otp = Otp::factory()->forUser($user->id)->create();

        return [
            'otp' => $otp->code,
            'expires_at' => $otp->expires_at,
        ];
    }

    public function verifyOtp(Request $request)
    {
        $user = Auth::user();
        $otp = Otp::where('user_id', $user->id)->where('code', $request->input('code'))->first();
        if (!$otp) return ['valid' => false];

        $now = Carbon::now();
        $expiresAt = Carbon::parse($otp->expires_at);

        $otp->used_at = $now;
        $otp->save();

        return [
            'valid' => $expiresAt->gt($now) || $otp->used_at != $now,
            'expired' => $expiresAt->lt($now),
        ];
    }
}
