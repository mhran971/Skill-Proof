<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // rubric_key matches frontend RubricKey:
    // code | problem | arch | testing | docs | comm | delivery | team | present

    public function up(): void
    {
        Schema::create('challenge_rubrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenge_id')->constrained()->cascadeOnDelete();
            $table->enum('rubric_key', [
                'code', 'problem', 'arch', 'testing',
                'docs', 'comm', 'delivery', 'team', 'present',
            ]);
            $table->unsignedTinyInteger('weight')->default(1); // 1–5
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
