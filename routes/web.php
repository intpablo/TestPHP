<?php

require __DIR__ . '/edit/editRoutes.php';



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CadastroGeralController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\EscolaController;


use Illuminate\Support\Facades\DB;


Route::get('/', function () {
    return view('welcome');
});

Route::post('/cadastroGeral', [CadastroGeralController::class, 'store']);
Route::post('/cadastroProfessor', [ProfessorController::class, 'store']);
Route::post('/cadastroTurma', [TurmaController::class, 'store']);
Route::post('/cadastroEscola', [EscolaController::class, 'store']);



Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/getEscolas', function () {
    $escolas = DB::table('escola')->get();
    return response()->json($escolas);
});

Route::get('/getTurmas', function () {
    $turmas = DB::table('turma')
        ->join('escola', 'turma.id_escola', '=', 'escola.id')
        ->select('turma.id', 'turma.nome_turma', 'turma.turno', 'turma.status', 'escola.nome_escola')
        ->get();

    return response()->json($turmas);
});

Route::get('/getProfessores', function () {
    $professores = DB::table('professor')
        ->leftJoin('professor_turma', 'professor.id', '=', 'professor_turma.professor_id')
        ->leftJoin('turma', 'professor_turma.turma_id', '=', 'turma.id')
        ->select('professor.id', 'professor.nome', 'turma.nome_turma')
        ->get();
    return response()->json($professores);
});



Route::delete('/deleteEscola/{id}', [EscolaController::class, 'destroy']);

