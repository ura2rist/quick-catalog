<?php
namespace App\Entity;

use App\Repository\SettingsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SettingsRepository::class)]
#[ORM\Table(name: 'settings')]
class Settings
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column(type: 'integer')]
  private int $id;

  #[ORM\Column(type: 'string', length: 100)]
  private string $title;

  #[ORM\Column(type: 'json')]
  private array $settings;

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
  public function getTitile(): string
  {
    return $this->titile;
  }

  /**
   * @param string $titile
   */
  public function setTitile(string $titile): void
  {
    $this->titile = $titile;
  }

  /**
   * @return array
   */
  public function getSettings(): array
  {
    return $this->settings;
  }

  /**
   * @param array $settings
   */
  public function setSettings(array $settings): void
  {
    $this->settings = $settings;
  }
}