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
        ]);
    
        $professor = Professor::findOrFail($id);
        $professor->update($data);
    
        return response()->json(['message' => 'Professor atualizado com sucesso']);
    }
    
}
