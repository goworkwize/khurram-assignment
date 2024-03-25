<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __invoke()
    {
        request()->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (! auth()->attempt(request()->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $user = auth()->user();
        $authToken = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'Login Successful',
            'role' => $user->role,
            'token' => $authToken
        ]);
    }
}
