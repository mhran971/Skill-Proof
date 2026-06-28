<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidate_job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('job_id');
            $table->enum('status', ['applied', 'reviewed', 'shortlisted', 'rejected', 'hired'])->default('applied');
            $table->text('cover_note')->nullable();
            $table->timestamp('applied_at')->useCurrent();
            $table->unique(['user_id', 'job_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidate_job_applications');
    }
};
