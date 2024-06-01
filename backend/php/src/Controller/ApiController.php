<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\ApiService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\PostsRepository;

class ApiController extends AbstractController
{
  public function getTitle(ApiService $apiService, Request $request, PostsRepository $postsRepository): Response
  {
    $data = $apiService->getTitle($request, $postsRepository);

    return $this->json(['data' => $data]);
  }

  public function getСontent(ApiService $apiService, Request $request, PostsRepository $postsRepository): Response
  {
    $data = $apiService->getСontent($request, $postsRepository);

    return $this->json($data);
  }
}