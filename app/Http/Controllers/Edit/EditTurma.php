<?php

namespace App\Http\Controllers\Edit;

use App\Http\Controllers\Controller;
use App\Models\Turma;
use Illuminate\Http\Request;

class EditTurma extends Controller
{
    public function edit($id)
    {
        $turma = Turma::findOrFail($id);
        return response()->json($turma);
    }

    public function update(Request $request, $id)
    {
        $turma = Turma::findOrFail($id);

        $data = $request->validate([
            'nome_turma' => 'required|string',
            'turno' => 'required|string',
            'status' => 'required|string',
        ]);

        $turma->update($data);

        
        return response()->json(['message' => 'Turma atualizada com sucesso']);
    }
}
