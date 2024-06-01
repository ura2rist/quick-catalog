<?php
namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Posts;

class PostsRepository extends ServiceEntityRepository
{
  public function __construct(ManagerRegistry $registry)
  {
    parent::__construct($registry, Posts::class);
  }

  public function findOneById($id)
  {
    $query = $this->createQueryBuilder('p')
      ->select('p')
      ->where('p.id = :id')
      ->setParameter('id', $id)
      ->getQuery()
      ->getOneOrNullResult();

    return $query;
  }

  public function findAllEntityByCategoryIdOnlyTitle($id)
  {
    $query = $this->createQueryBuilder('p')
      ->select('p', 'p.title', 'p.id')
      ->where('p.categoryId = :id')
      ->setParameter('id', $id)
      ->getQuery()
      ->getResult();

    return $query;
  }

  public function findAllId()
  {
    $query = $this->createQueryBuilder('p')
      ->select('p', 'p.id')
      ->getQuery()
      ->getResult();

    return $query;
  }
}