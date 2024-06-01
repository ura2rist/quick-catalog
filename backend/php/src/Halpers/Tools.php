<?php
namespace App\Halpers;

class Tools
{
  static function offsetForRandPost($array, $amount)
  {
    if($amount > count($array)) $amount = count($array);

    $randomKeys = array_rand($array, $amount);
    $randomElements = [];

    foreach ($randomKeys as $key) {
      $randomElements[] = $array[$key];
    }

    return $randomElements;
  }
}