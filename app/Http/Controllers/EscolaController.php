<?php

namespace App\Http\Controllers;

use App\Models\Escola;
use Illuminate\Http\Request;

class EscolaController extends Controller
{
    public function store(Request $request)
    {
        // Validação dos dados da escola
        // $request->validate([
        //     'nomeEscola' => 'required|string',
        //     'endereco' => 'required|string',
        //     'inep' => 'required|string',
        // ]);

        Escola::create([
            'nome_escola' => $request->nome_escola,
            'endereco' => $request->endereco,
            'inep' => $request->inep,
            'status' => 'ativo', // status por padrão
        ]);

        return redirect()->back()->with('success', 'Escola cadastrada com sucesso!');
    }
    
    public function destroy($id)
{
    $escola = Escola::findOrFail($id);

    
    $escola->delete();

    return response()->json(['success' => 'Escola removida com sucesso!']);
}

}
