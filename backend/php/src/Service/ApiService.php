<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\Request;

class ApiService
{
  public function getTitle(Request $request, $postsRepository)
  {
    $id = $request->query->get('id');

    if(is_numeric($id)) {
      $postsTitle = $postsRepository->findAllEntityByCategoryIdOnlyTitle($id);
      $postsTitle = array_map(function($i){
        return ['id' => $i['id'], 'title' => $i['title']];
      },$postsTitle);
    } else {
      return [];
    }

    return $postsTitle;
  }

  public function getСontent(Request $request, $postsRepository)
  {
    $id = $request->query->get('id');
    $category = $request->query->get('category');

    if(is_numeric($id)) {
      $post = [];
      $findPost = $postsRepository->findOneById($id);

      if(is_numeric($category)) {
        $postsTitle = $postsRepository->findAllEntityByCategoryIdOnlyTitle($category);
        $postsTitle = array_map(function($i){
          return ['id' => $i['id'], 'title' => $i['title']];
        },$postsTitle);
        $post = ['id' => $findPost->getId(), 'content' => $findPost->getContent(), 'data' => $postsTitle];
      } else {
        $post = ['id' => $findPost->getId(), 'content' => $findPost->getContent()];
      }
    } else {
      return [];
    }

    return $post;
  }
}