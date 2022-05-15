<?php

/* Declare constant HTTP headers */
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: https://www.pappbalazs.com");

require_once 'App/Autoloader.php';

/* Init the Autoloader */
App\Autoloader::register();

use App\Router;
use App\Handler;

/* Set up the Router */
$router = new Router();
$router->setPrefix("/api/v1");

$router->post("/message", Handler\Message::class . "::sendMessage");

$router->addNotFoundHandler(function($request) {
	return [
		"body" => "There are no route with the path $request->method \"$request->path\"!"
	];
});

$router->run();
