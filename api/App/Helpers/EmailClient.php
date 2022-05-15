<?php

namespace App\Helpers;

class EmailClient
{
	private const RECEIVER_EMAIL = "hello@pappbalazs.com";

	private string $senderName;
	private string $senderEmail;
	private string $subject;
	private string $message;

	public function setSenderName($name): void
	{
		$this->senderName = $name;
	}

	public function setSenderEmail($email): void
	{
		$this->senderEmail = $email;
	}

	public function setSubject($subject): void
	{
		$this->subject = $subject;
	}

	public function setMessage($message): void
	{
		$this->message = $message;
	}

	public function send(): bool {
		$headers = [
			"From" => "$this->senderName <$this->senderEmail>",
			"Content-Type" => "text/plain; charset=utf-8",
			"X-Mailer" => "PHP/" . phpversion()
		];

		return mail(
			self::RECEIVER_EMAIL,
			$this->subject,
			$this->message,
			$headers
		);
	}
}
