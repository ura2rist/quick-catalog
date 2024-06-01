<?php

use App\Controller\MainController;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;
use App\Controller\ApiController;

return function (RoutingConfigurator $routes): void
{
  $routes->add('index', '/')
    ->controller([MainController::class, 'index'])
    ->methods(['GET']);

  $routes->add('api-title', '/api/gettitle')
    ->controller([ApiController::class, 'getTitle'])
    ->methods(['GET']);

  $routes->add('api-content', '/api/getcontent')
    ->controller([ApiController::class, 'getСontent'])
    ->methods(['GET']);
};