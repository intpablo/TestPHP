<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Escola;
use App\Models\Turma;

class CadastroGeralController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'nomeEscola' => 'required|string',
            'inep' => 'required|string',
            'endereco' => 'required|string',
            'turmas.nome.*' => 'required|string',
            'turmas.turno.*' => 'required|string',
        ]);

        $escola = Escola::create([
            'nome_escola' => $request->nomeEscola,
            'endereco' => $request->endereco,
            'inep' => $request->inep,
            'status' => 'ativo', // status por padrão
        ]);

        if ($request->filled('turmas')) {
            foreach ($request->turmas['nome'] as $key => $nomeTurma) {
                Turma::create([
                    'id_escola' => $escola->id,
                    'nome_turma' => $nomeTurma,
                    'turno' => $request->turmas['turno'][$key],
                    'status' => 'ativo', // status padrão
                ]);
            }
        }

        return response()->json(['success' => 'Escola e turmas cadastrads com sucesso']);
    }
}
