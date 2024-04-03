<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use Illuminate\Http\Request;

class ProfessorController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['nome' => 'required',]);

        Professor::create($request->all());
        return back();
    }
}
