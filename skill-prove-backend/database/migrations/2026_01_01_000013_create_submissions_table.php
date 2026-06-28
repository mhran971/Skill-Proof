<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('challenge_id')->constrained()->cascadeOnDelete();
            $table->foreignId('reviewer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('type', ['regular', 'final'])->default('regular');
            $table->enum('status', ['pending_ai', 'ai_done', 'in_review', 'accepted', 'rejected'])
                ->default('pending_ai');
            $table->text('feedback_ar')->nullable();
            $table->text('feedback_en')->nullable();
            $table->decimal('ai_score', 4, 1)->nullable();
            $table->text('ai_feedback_ar')->nullable();
            $table->text('ai_feedback_en')->nullable();
            $table->timestamp('ai_evaluated_at')->nullable();
            $table->boolean('accepted_to_showcase')->default(false);
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
