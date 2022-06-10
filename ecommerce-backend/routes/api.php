<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CategoryController;

Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
    
    Route::post('/setfavorite', [FavoriteController::class, 'setFavorite'])->middleware('auth');
    
});

Route::group(['prefix'=>'user'], function(){
    
    Route::get('/allitems', [ItemController::class, 'getItems']);
    Route::post('/item', [ItemController::class, 'getItemById']);
    Route::post('/categoryitems', [ItemController::class, 'getItemsByCategoryId']);
    Route::post('/setfavorite', [FavoriteController::class, 'setFavorite']);
    Route::post('/getfavorites', [ItemController::class, 'getFavorites']);
    Route::get('/getcategories', [CategoryController::class, 'getCategories']);
    
});

Route::group(['prefix'=>'admin'], function(){
    Route::post('/additem', [ItemController::class, 'addItem']);
    Route::post('/addcategory', [CategoryController::class, 'addCategory']);
    Route::get('/getcategories', [CategoryController::class, 'getCategories']);
});