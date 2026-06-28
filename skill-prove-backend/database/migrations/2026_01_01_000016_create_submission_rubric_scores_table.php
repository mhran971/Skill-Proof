<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_rubric_scores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('submission_id');
            $table->enum('rubric_key', [
                'code', 'problem', 'arch', 'testing',
                'docs', 'comm', 'delivery', 'team', 'present',
            ]);
            $table->decimal('score', 4, 1)->default(0);
            $table->foreignId('scored_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_ai')->default(false);
            $table->unique(['submission_id', 'rubric_key']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_rubric_scores');
    }
};
