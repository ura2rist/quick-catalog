<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PostsRepository;
use App\Entity\Category;

#[ORM\Entity(repositoryClass: PostsRepository::class)]
#[ORM\Table(name: 'posts')]
class Posts
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  private int $id;

  #[ORM\Column(type: 'string', length: 100)]
  private string $title;

  #[ORM\Column(type: 'string', length: 10000)]
  private string $content;

  #[ORM\ManyToOne(targetEntity: Category::class)]
  #[ORM\JoinColumn(name: 'category_id', referencedColumnName: 'id')]
  private $categoryId;

  /**
   * @return int
   */
  public function getId(): int
  {
    return $this->id;
  }

  /**
   * @param int $id
   */
  public function setId(int $id): void
  {
    $this->id = $id;
  }

  /**
   * @return string
   */
  public function getTitle(): string
  {
    return $this->title;
  }

  /**
   * @param string $title
   */
  public function setTitle(string $title): void
  {
    $this->title = $title;
  }

  /**
   * @return string
   */
  public function getContent(): string
  {
    return $this->content;
  }

  /**
   * @param string $content
   */
  public function setContent(string $content): void
  {
    $this->content = $content;
  }

  /**
   * @return mixed
   */
  public function getCategoryId()
  {
    return $this->categoryId;
  }

  /**
   * @param mixed $categoryId
   */
  public function setCategoryId($categoryId): void
  {
    $this->categoryId = $categoryId;
  }
}