<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Mobiles', 'slug' => 'mobiles', 'icon' => 'smartphone'],
            ['name' => 'Laptops', 'slug' => 'laptops', 'icon' => 'laptop'],
            ['name' => 'Fashion', 'slug' => 'fashion', 'icon' => 'shirt'],
            ['name' => 'Electronics', 'slug' => 'electronics', 'icon' => 'cpu'],
            ['name' => 'Home', 'slug' => 'home', 'icon' => 'sofa'],
            ['name' => 'Appliances', 'slug' => 'appliances', 'icon' => 'refrigerator'],
        ];

        foreach ($categories as $category) {
            Category::query()->updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
