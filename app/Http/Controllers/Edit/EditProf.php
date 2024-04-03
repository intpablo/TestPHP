<?php

namespace App\Http\Controllers\Edit;

use App\Http\Controllers\Controller;
use App\Models\Professor;
use App\Models\Turma;
use Illuminate\Http\Request;

class EditProf extends Controller
{
    public function edit($id)
    {
        $professor = Professor::findOrFail($id);
        return response()->json($professor);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nome' => 'required|string',
            'turma_id' => 'required|integer',
        ]);

        $professor = Professor::findOrFail($id);
        $professor->update($data);

        // Adicionar o professor à turma
        $turma = Turma::findOrFail($request->turma_id);
        $turma->professores()->sync([$professor->id]);

        return response()->json(['message' => 'Professor atualizado com sucesso']);
    }
}
