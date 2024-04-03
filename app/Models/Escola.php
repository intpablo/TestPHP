<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Escola extends Model
{     
    protected $table = 'escola'; // Nome da tabela no banco de dados
    protected $fillable = ['nome_escola', 'endereco', 'inep', 'status'];//  campos conforme a tabela
    public $timestamps = false; 

    public function turmas()
    {
        return $this->hasMany(Turma::class, 'id_escola'); //  campo de chave estrangeira
    }
}
