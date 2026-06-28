<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('challenge_rubrics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('challenge_id');
            $table->enum('rubric_key', [
                'code', 'problem', 'arch', 'testing',
                'docs', 'comm', 'delivery', 'team', 'present',
            ]);
            $table->unsignedTinyInteger('weight')->default(1);
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->unique(['challenge_id', 'rubric_key']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('challenge_rubrics');
    }
};
