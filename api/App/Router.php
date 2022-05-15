<?php

namespace App;

class Router
{
	private const METHOD_GET = "GET";
	private const METHOD_POST = "POST";

	private $notFoundCallback;

	private string $prefix = "";
	private array $handlers;

	public function setPrefix(string $prefix): void
	{
		$this->prefix = $prefix;
	}

	public function get(string $path, $callback): void
	{
		$this->addHandler(self::METHOD_GET, $path, $callback);
	}

	public function post(string $path, $callback): void
	{
		$this->addHandler(self::METHOD_POST, $path, $callback);
	}

	public function addNotFoundHandler($callback): void
	{
		$this->notFoundCallback = $callback;
	}

	private function addHandler(string $method, string $path, $callback): void
	{
		if ($this->prefix) {
			$path = $this->prefix . $path;
		}

		$this->handlers[$method . $path] = [
			"path" => $path,
			"method" => $method,
			"callback" => $callback
		];
	}

	public function run()
	{
		$requestURI = parse_url($_SERVER["REQUEST_URI"]);
		$requestPath = rtrim($requestURI["path"], '/');
		$requestMethod = $_SERVER["REQUEST_METHOD"];
		$requestBody = file_get_contents("php://input");

		$callback = null;

		foreach ($this->handlers as $handler)
		{
			if ($handler["path"] === $requestPath && $handler["method"] === $requestMethod)
			{
				$callback = $handler["callback"];
			}
		}

		if (is_string($callback))
		{
			$parts = explode("::", $callback);

			if (is_array($parts))
			{
				$className = array_shift($parts);
				$handler = new $className;
				$method = array_shift($parts);

				$callback = [$handler, $method];
			}
		}

		if (!$callback)
		{
			header("HTTP/1.1 404 Not Found");
			
			if (!empty($this->notFoundCallback))
			{
				$callback = $this->notFoundCallback;
			}
		}

		$request = [
			"path" => $requestPath,
			"method" => $requestMethod,
			"params" => array_merge($_GET, $_POST),
			"body" => json_decode($requestBody)
		];

		$response = call_user_func_array($callback, [(object)$request]);
		
		print_r(json_encode($response));
	}
}
