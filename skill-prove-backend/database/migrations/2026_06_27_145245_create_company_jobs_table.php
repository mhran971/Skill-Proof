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
        Schema::create('company_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('location');
            $table->unsignedInteger('salary_min')->nullable();
            $table->unsignedInteger('salary_max')->nullable();
            $table->text('description')->nullable()->after('title');
            $table->enum('type', ['full-time', 'part-time', 'remote', 'hybrid'])
                ->default('full-time')->after('description');
            $table->json('skills_required')->default('[]')->after('salary_max');
            $table->date('deadline')->nullable()->after('skills_required');
            $table->enum('status', ['open', 'reviewing', 'closed'])->default('open');
            $table->unsignedInteger('applicants_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
