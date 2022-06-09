<?php

namespace App\Http\Controllers;
use App\Models\Item;

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
}