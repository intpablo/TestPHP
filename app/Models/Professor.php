<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    protected $table = "professor";
    protected $fillable = ['nome']; 
    public $timestamps = false; 

    public function turmas()
{
    return $this->belongsToMany(Turma::class, 
    'professor_turma',  'professor_id', 'turma_id');
}


}
