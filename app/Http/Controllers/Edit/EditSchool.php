<?php

namespace App\Http\Controllers\Edit;

use App\Http\Controllers\Controller;
use App\Models\Escola;
use App\Models\Turma;
use Illuminate\Http\Request;

class EditSchool extends Controller
{
    public function edit($id)
    {
        $escola = Escola::find($id);
        return response()->json($escola);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nome_escola' => 'required|string',
            'endereco' => 'required|string',
            'inep' => 'required|string',
            'status' => 'required|string',
        ]);

        $escola = Escola::find($id);
        $escola->update($data);

        return redirect()->route('dashboard')->with('success', 'Escola atualizada com sucesso!');   
    }

   
}
