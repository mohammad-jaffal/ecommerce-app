<?php

namespace App\Http\Controllers;
use App\Models\Item;
use App\Models\User;
use App\Models\Favorite;

use Illuminate\Http\Request;

class ItemController extends Controller
{
    
    public function getItems(){
        $items = Item::all();
        return response()->json([
            "success" => true,
            "items" => $items
        ], 200);
    }


    public function getItemById(Request $request){
        $id = $request->id;
        $item = Item::find($id);
       
        return response()->json([
            "success" => true,
            "item" => $item
        ], 200);
    }


    public function getItemsByCategoryId(Request $request){
        $id = $request->category_id;
        $items = Item::all()->where('category_id',$id);
       
        return response()->json([
            "success" => true,
            "items" => $items
        ], 200);
    }


    public function addItem(Request $request){
        $item = new Item;
        $item->name = $request->name;
        $item->price = $request->price;
        $item->image = $request->image;
        $item->category_id = $request->category_id;
        $item->save();
           
        return response()->json([
            "success" => true,
        ], 200);
    }



    // public function getFavorites(Request $request){
    //     $user_id = $request->user_id;
    //     // $items = Item::favorites()->user()->where('id',$user_id);
    //     $user = User::all()->favorites();
        
    //     return response()->json([
    //         "success" => true,
    //         "items" => $user
    //     ], 200);
    // }


    public function getFavorites(Request $request){
        $user_id = $request->user_id;
        $favs = User::find($user_id)->favorites;
        // $fav_id = $favs->id;
        // echo $fav_id;
        // $item = Favorite::find(2)->item;
        $items = [];
        foreach ($favs as $fav) {
            $fav_id = $fav->id;
            echo $fav_id;
            echo "-";
            $item = Favorite::find($fav_id)->item;
            array_push($items, $item);
        }
        
        
        return response()->json([
            "success" => true,
            // "items" => $fav_id,
            "favs" => $items,
        ], 200);


    }


}