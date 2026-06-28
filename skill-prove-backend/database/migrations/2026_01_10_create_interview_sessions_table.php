<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interview_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->json('questions');                  // [{ar, en}]
            $table->json('answers')->default('[]');     // [{index, text, recorded_at}]
            $table->json('ai_feedback')->default('[]'); // [{index, feedback_ar, feedback_en, score}]
            $table->decimal('overall_score', 4, 1)->nullable();
            $table->enum('status', ['in_progress', 'completed'])->default('in_progress');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interview_sessions');
    }
};
