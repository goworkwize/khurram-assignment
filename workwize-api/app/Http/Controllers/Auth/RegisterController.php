<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __invoke()
    {
        request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'role' => 'required|in:user,supplier'
        ]);

        if ($this->isUserAlreadyExists(request('email'))) {
            return response()->json([
                'message' => 'User with the provided email already exists'
            ], 409);
        }

        $user = User::query()->create(
            request()->only('name', 'email', 'password', 'role')
        );
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function isUserAlreadyExists($email)
    {
        return User::query()->where('email', $email)->exists();
    }
}
