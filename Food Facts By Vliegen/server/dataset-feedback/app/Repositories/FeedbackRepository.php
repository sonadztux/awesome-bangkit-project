<?php

namespace App\Repositories;

use App\FeedbackFood;

class FeedbackRepository
{
    public function store(array $data)
    {
        $newData = new FeedbackFood();
        $newData->name_food = $data['name_food'];
        $newData->flag = false;
        $newData->path = $data['path'];

        $newData->save();

        return $newData;
    }
}