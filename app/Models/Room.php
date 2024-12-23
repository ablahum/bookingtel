<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public $timestamps = false;
    
    public function room()
    {
        return $this->hasOne(Order::class, 'order_id', 'id');
        
    }

    // public function category(): BelongsTo {
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
