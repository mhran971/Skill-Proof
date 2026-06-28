<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('challenge_rubrics', function (Blueprint $table) {
            $table->foreign('challenge_id')->references('id')->on('challenges')->onDelete('cascade');
        });

        Schema::table('submission_links', function (Blueprint $table) {
            $table->foreign('submission_id')->references('id')->on('submissions')->onDelete('cascade');
        });

        Schema::table('submission_scores', function (Blueprint $table) {
            $table->foreign('submission_id')->references('id')->on('submissions')->onDelete('cascade');
        });

        Schema::table('submission_rubric_scores', function (Blueprint $table) {
            $table->foreign('submission_id')->references('id')->on('submissions')->onDelete('cascade');
        });

        Schema::table('candidate_job_applications', function (Blueprint $table) {
            $table->foreign('job_id')->references('id')->on('company_jobs')->onDelete('cascade');
        });

        Schema::table('user_internships', function (Blueprint $table) {
            $table->foreign('internship_id')->references('id')->on('internships')->onDelete('cascade');
        });

        Schema::table('task_assignments', function (Blueprint $table) {
            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('challenge_rubrics', function (Blueprint $table) {
            $table->dropForeign(['challenge_id']);
        });
        Schema::table('submission_links', function (Blueprint $table) {
            $table->dropForeign(['submission_id']);
        });
        Schema::table('submission_scores', function (Blueprint $table) {
            $table->dropForeign(['submission_id']);
        });
        Schema::table('submission_rubric_scores', function (Blueprint $table) {
            $table->dropForeign(['submission_id']);
        });
        Schema::table('candidate_job_applications', function (Blueprint $table) {
            $table->dropForeign(['job_id']);
        });
        Schema::table('user_internships', function (Blueprint $table) {
            $table->dropForeign(['internship_id']);
        });
        Schema::table('task_assignments', function (Blueprint $table) {
            $table->dropForeign(['task_id']);
        });
    }
};
