<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Domain extends Model
{
    use HasFactory, SoftDeletes;
   
    protected $fillable = [
        'name',
        'registrar',
        'registration_date',
        'expiry_date',
        'auto_renew',
        'purchase_price',
        'current_value',
        'asking_price',
        'for_sale',
        'status',
        'notes',
        'user_id'
    ];
    protected $casts = [
        'registration_date' => 'date',
        'expiry_date' => 'date',
        'auto_renew' => 'boolean',
        'purchase_price' => 'decimal:2',
        'current_value' => 'decimal:2',
        'asking_price' => 'decimal:2',
        'for_sale' => 'boolean',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
