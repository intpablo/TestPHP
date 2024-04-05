<?php

namespace App\Http\Controllers;

use App\Models\Professor; 
use App\Models\Turma;
use App\Models\ProfessorTurma;
use Illuminate\Http\Request;

class ProfessorController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['nome' => 'required',]);

        Professor::create($request->all());
        return response()->json(['success' => 'Professor cadastrado com sucesso!']);
    }
    public function getProfessores(Request $request)
    {
        $professores = Professor::with('turmas')->get();
        return response()->json($professores);
    }

    public function getTurmas(Request $request)
    {
        $turmas = Turma::all();
        return response()->json($turmas);
    }

    public function vincular(Request $request)
    {
        $professorTurma = New ProfessorTurma;
        $professorTurma ->professor_id = $request->id;
        $professorTurma -> turma_id = $request->turma_id;
        $professorTurma -> save();

        return response()->json(['success' => true]);
    }

    public function destroy($id)
{
    $professor = Professor::find($id);

    if ($professor) {
        
        $professor->turmas()->detach();//desvincula o 

       
        $professor->delete();

        return response()->json(['success' => true]);
    } else {
        return response()->json(['success' => false]);
    }
}

}
