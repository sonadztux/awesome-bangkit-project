<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\FeedbackFoodStoreRequest;
use App\Repositories\FeedbackRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FoodImageController extends Controller
{
    public function __construct(FeedbackRepository $feedbackRepository)
    {
        $this->feedbackRepository = $feedbackRepository;
    }

    public function store(FeedbackFoodStoreRequest $request)
    {   
        $validated = $request->validated();

        if (!$validated) {
            return response()->json([
                'status' => false,
                'meta' => [
                    'response_code' => 422,
                    'code' => 422,
                    'severity' => "OK",
                    'messages' => "Request not passed validation"
                ]
            ]);
        }
        $file = $request->file('image_food');

        $path = Storage::disk('gcs')->put('/', $file);

        $validated['path'] = sprintf('images/%s', $path);

        $feedback = $this->feedbackRepository->store($validated);

        if (!$feedback) {
            return response()->json([
                'status' => false,
                'meta' => [
                    'response_code' => 422,
                    'code' => 422,
                    'severity' => "OK",
                    'messages' => "Food doesn't stored successfully."
                ]
            ]);
        }
        
        return response()->json([
            'status' => true,
            'meta' => [
                'response_code' => 200,
                'code' => 200,
                'severity' => "OK",
                'messages' => 'Food has been stored successfully.'
            ]
        ]);

    }
}
