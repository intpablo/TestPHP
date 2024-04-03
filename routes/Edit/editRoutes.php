<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Edit\EditSchool;
use App\Http\Controllers\Edit\EditTurma;
use App\Http\Controllers\Edit\EditProf;

Route::get('/escola/edit/{id}', [EditSchool::class, 'edit'])->name('escola.edit');
Route::post('/escola/update/{id}', [EditSchool::class, 'update'])->name('escola.update');

Route::get('/turma/edit/{id}', [EditTurma::class, 'edit'])->name('turma.edit');
Route::post('/turma/update/{id}', [EditTurma::class, 'update'])->name('turma.update');

Route::get('/professor/edit/{id}', [EditProf::class, 'edit']);
Route::post('/professor/update/{id}', [EditProf::class, 'update']);
