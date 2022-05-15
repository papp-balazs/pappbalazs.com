<?php

namespace App\Handler;

use App\Helpers\EmailClient;

class Message
{
	public function sendMessage($request)
	{
		if (!$request->body)
		{
			header("HTTP/1.1 400 Bad Request");

			return [
				"message" => "The given parameters are missing!"
			];
		}

		if (
			!($request->body->name &&
			$request->body->email &&
			$request->body->subject &&
			$request->body->message)
		)
		{
			header("HTTP/1.1 400 Bad Request");

			return [
				"message" => "There are some parameters that are missing!"
			];
		}

		$email = new EmailClient();
		$email->setSenderName($request->body->name);
		$email->setSenderEmail($request->body->email);
		$email->setSubject($request->body->subject);
		$email->setMessage($request->body->message);

		if ($email->send())
		{
			return [
				"message" => "The email has been sent!"
			];
		}

		header("HTTP/1.1 500 Internal Server Error");

		return [
			"message" => "There was some error at sending the email!"
		];
	}
}
