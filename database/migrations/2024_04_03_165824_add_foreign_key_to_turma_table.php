<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('turma', function (Blueprint $table) {
        $table->foreign('id_escola', 'turma_id_escola_unique')
            ->references('id')->on('escola')
            ->onDelete('cascade');
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('turma', function (Blueprint $table) {
        $table->dropForeign('turma_id_escola_unique');
    });
}
};
