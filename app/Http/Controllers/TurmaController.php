<?php

namespace App\Http\Controllers;

use App\Models\Escola;
use App\Models\Turma;
use Illuminate\Http\Request;

class TurmaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nome_turma' => 'required',
            'turno' => 'required',
            'status' => 'required',
        ]);

        Turma::create($request->all());

        return back();
    }
    public function edit($id)
    {
        $turma = Turma::findOrFail($id);
        $escolas = Escola::all();
        return response()->json(['turma' => $turma, 'escolas' => $escolas]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nome_turma' => 'required',
            'turno' => 'required',
            'status' => 'required',
            'nome_escola' => 'required',
        ]);

        $turma = Turma::findOrFail($id);
        $turma->update($request->all());

        return back();
    }

    public function destroy($id)
    {
        $turma = Turma::findOrFail($id);
        $turma->delete();

        return response()->json(['success' => 'Turma removida com sucesso!']);
    }

    public function vincularEscola(Request $request)
    {
        $turma = Turma::find($request->id);
        $turma->id_escola = $request->escola_id;
        $turma->save();

        return response()->json(['success' => 'Turma vinculada com sucesso!']);
    }
}
