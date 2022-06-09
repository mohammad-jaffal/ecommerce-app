<?php

namespace App\Http\Controllers;
use App\Models\Favorite;

use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function setFavorite(Request $request){
        
        $favorite = new Favorite;
        $favorite->user_id = $request->user_id;
        $favorite->item_id = $request->item_id;
        $favorite->save();
        
        return response()->json([
            "success" => true,
        ], 200);
    }
}
