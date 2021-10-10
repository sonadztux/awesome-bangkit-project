<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeedbackFood extends Model
{
    use SoftDeletes;
    protected $table = 'feedback_food';
}
