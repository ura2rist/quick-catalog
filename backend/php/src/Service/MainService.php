<?php
namespace App\Service;

use App\Repository\SettingsRepository;
use App\Halpers\Tools;

class MainService
{
  public function index($settingsRepository, $categoryRepository, $postsRepository): array
  {
    $colors = $settingsRepository->findSetting('colors');
    $category = $categoryRepository->findAllEntity();
    $postsTitle = $postsRepository->findAllEntityByCategoryIdOnlyTitle(1);
    $allPostsId = $postsRepository->findAllId();
    $postsRand = Tools::offsetForRandPost($allPostsId, 6);

    $settings = [
      'colors' => $colors->getSettings()
    ];

    return ['settings' => $settings, 'category' => $category, 'postsTitle' => $postsTitle, 'postsRand' => $postsRand];
  }
}