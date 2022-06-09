<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller{



    public function getCategories(Request $request){
        $categories = Category::all();
        return response()->json([
            "success" => true,
            "categories" => $categories
        ], 200);
    }




    public function addCategory(Request $request){
        
        $category = new Category;
        $category->name = $request->name;
        $category->save();

        return response()->json([
            "success" => true,
        ], 200);
    }
}
