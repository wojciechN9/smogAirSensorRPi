<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__ . '\..\vendor\autoload.php';
require_once __DIR__ . '\..\db.php';
$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);

$app->get('/', function(Request $request, Response $response, array $args) use ($conn) {
	// 124 = 24 in chart + 100 in history
    $query = "SELECT * FROM smog_history ORDER BY period_to DESC LIMIT 124";
    $result = $conn->query($query);
    $return = [];
    while ($data = $result->fetchObject())
    {
        $return[] = $data;
    }
	// $return = ["aaa, bbbb"];
    return $response->withJson($return);
});
$app->run();