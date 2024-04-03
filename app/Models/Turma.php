<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Turma extends Model
{    
    protected $table = 'turma'; 
    protected $fillable = ['id_escola', 'nome_turma', 'turno', 'status']; 
    public $timestamps = false;
    public function escola()
    {
        return $this->belongsTo(Escola::class, 'id_escola'); 
    }

    public function professores()
{
    return $this->belongsToMany(Professor::class, 'professor_turma');
}

}
