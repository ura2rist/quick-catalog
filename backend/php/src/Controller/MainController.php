<?php
namespace App\Controller;

use App\Repository\PostsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Service\MainService;
use App\Repository\SettingsRepository;
use App\Repository\CategoryRepository;

class MainController extends AbstractController
{
  public function index(MainService $mainService, SettingsRepository $settingsRepository, CategoryRepository $categoryRepository, PostsRepository $postsRepository): Response
  {
    $data = $mainService->index($settingsRepository, $categoryRepository, $postsRepository);

    return $this->render('index.twig', $data);
  }
}