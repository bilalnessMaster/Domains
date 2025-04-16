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
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // example.com
            $table->string('registrar')->nullable(); // e.g. "GoDaddy"
            
            // Dates
            $table->date('registration_date');
            $table->date('expiry_date');
            $table->boolean('auto_renew')->default(false);
            
            // Financial fields (core of your project)
            $table->decimal('purchase_price', 10, 2); // What you paid
            $table->decimal('current_value', 10, 2)->nullable(); // Estimated worth
            $table->decimal('asking_price', 10, 2)->nullable(); // Your selling price
            $table->boolean('for_sale')->default(false);
            
            // Status and notes
            $table->string('status')->default('active');
            $table->text('notes')->nullable();
            
            // Ownership
            $table->unsignedBigInteger('user_id');
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};
