import re
import random

categories = {
    'mobiles': [
        ('iPhone 15', 74999, 'A16 Bionic chip, Dynamic Island.', 10, 4, 'iphone'),
        ('Samsung S24', 69999, 'Galaxy AI and AMOLED display.', 12, 5, 'samsung'),
        ('Google Pixel 8 Pro', 106999, 'Google AI and best camera.', 15, 5, 'pixel'),
        ('Samsung Z Flip 5', 99999, 'Foldable innovation.', 10, 5, 'flip-phone'),
        ('OnePlus 12', 64999, 'Smooth performance, Hasselblad camera.', 8, 4, 'oneplus'),
        ('Nothing Phone (2)', 44999, 'Unique glyph interface.', 5, 4, 'nothing-phone'),
        ('Google Pixel 7a', 39999, 'Compact and powerful.', 20, 4, 'pixel-7'),
        ('Moto Edge 50 Pro', 31999, 'Curve display, fast charging.', 15, 4, 'motorola'),
        ('Realme GT 5', 38999, 'Performance beast.', 10, 4, 'realme'),
        ('Poco F6', 29999, 'Gaming powerhouse.', 12, 5, 'poco'),
        ('iPhone 14', 59999, 'Classic Apple performance.', 15, 4, 'iphone-14'),
        ('Samsung A55', 39999, 'Premium mid-range.', 10, 4, 'samsung-a'),
        ('Vivo V30 Pro', 41999, 'Aura light portrait camera.', 8, 4, 'vivo'),
        ('Oppo Reno 11', 37999, 'Sleek design, great selfies.', 12, 4, 'oppo'),
        ('Redmi Note 13', 17999, 'Best value smartphone.', 25, 4, 'redmi'),
        ('Samsung S23 FE', 49999, 'Flagship features, fan edition.', 18, 5, 'samsung-fe'),
        ('iPhone 13', 48999, 'Compact and reliable.', 22, 5, 'iphone-13'),
        ('OnePlus Nord CE 4', 24999, 'Core edition performance.', 10, 4, 'oneplus-nord'),
        ('Moto G84', 18999, 'Pantone colors, leather finish.', 15, 4, 'moto-g'),
        ('Samsung M34', 15999, 'Massive battery, great display.', 20, 4, 'samsung-m'),
    ],
    'laptops': [
        ('MacBook Air M3', 114900, 'Apple M3 chip, all-day battery.', 8, 5, 'macbook'),
        ('ASUS Vivobook 16', 55999, 'Productivity powerhouse.', 18, 4, 'laptop-asus'),
        ('Dell XPS 15', 245000, 'OLED display, creator choice.', 5, 5, 'dell-xps'),
        ('Lenovo Legion 5 Pro', 155000, 'RTX gaming performance.', 12, 5, 'gaming-laptop'),
        ('HP Spectre x360', 145000, '2-in-1 luxury laptop.', 10, 5, 'hp-spectre'),
        ('Acer Swift Go', 62999, 'OLED display, thin and light.', 20, 4, 'acer-swift'),
        ('Microsoft Surface Laptop 5', 105000, 'Elegant design, touch screen.', 15, 4, 'surface-laptop'),
        ('Razer Blade 14', 215000, 'Ultimate portable gaming.', 8, 5, 'razer'),
        ('MSI Stealth 16', 189000, 'Powerful yet slim gaming.', 10, 5, 'msi-laptop'),
        ('ASUS ROG Zephyrus G14', 165000, 'Best 14-inch gaming laptop.', 12, 5, 'rog-zephyrus'),
        ('HP Victus 15', 68999, 'Entry-level gaming value.', 22, 4, 'hp-victus'),
        ('Lenovo Yoga 7i', 89999, 'Versatile 2-in-1 experience.', 15, 4, 'lenovo-yoga'),
        ('Dell Inspiron 14', 52999, 'Reliable work companion.', 18, 4, 'dell-inspiron'),
        ('Samsung Galaxy Book 3 Pro', 135000, 'Ecosystem integration, AMOLED.', 10, 5, 'galaxy-book'),
        ('Acer Predator Helios 300', 115000, 'Classic gaming beast.', 20, 5, 'predator'),
        ('Apple MacBook Pro 14', 199900, 'M3 Pro chip, Liquid Retina.', 5, 5, 'macbook-pro'),
        ('ASUS Zenbook 14', 95000, 'Premium ultrabook.', 12, 4, 'zenbook'),
        ('HP Pavilion 15', 64000, 'Modern multitasking.', 15, 4, 'hp-pavilion'),
        ('Lenovo IdeaPad Slim 3', 38000, 'Budget friendly performance.', 25, 4, 'ideapad'),
        ('Acer Aspire 5', 42000, 'Solid everyday usage.', 20, 4, 'acer-aspire'),
    ],
    'fashion': [
        ('Men Casual Shirt', 1199, 'Cotton comfort for daily wear.', 40, 4, 'shirt'),
        ('Women Floral Midi Dress', 2499, 'Elegant summer style.', 30, 5, 'dress'),
        ('Women High Heel Sandals', 3999, 'Formal and chic.', 50, 4, 'heels'),
        ('Men Denim Jeans', 1999, 'Slim fit rugged denim.', 35, 4, 'jeans'),
        ('Women Leather Handbag', 4500, 'Genuine leather, spacious.', 20, 5, 'handbag'),
        ('Men Sports Sneakers', 2999, 'Breathable workout shoes.', 45, 4, 'sneakers'),
        ('Women Silk Saree', 8500, 'Traditional ethnic wear.', 15, 5, 'saree'),
        ('Men Leather Belt', 899, 'Classic brown leather.', 50, 4, 'belt'),
        ('Women Woolen Scarf', 1299, 'Soft winter warmth.', 25, 4, 'scarf'),
        ('Men Casual Hoodie', 1899, 'Fleece lined comfort.', 30, 4, 'hoodie'),
        ('Women Cotton T-shirt', 799, 'Everyday basics.', 60, 4, 'tshirt'),
        ('Men Formal Suit', 12500, 'Sharp tailored business wear.', 10, 5, 'suit'),
        ('Women Denim Jacket', 2200, 'Versatile layering piece.', 20, 4, 'denim-jacket'),
        ('Men Cargo Pants', 1600, 'Multi-pocket functionality.', 25, 4, 'cargo-pants'),
        ('Women Ankle Boots', 3400, 'Stylish suede finish.', 15, 5, 'boots'),
        ('Men Polo T-shirt', 999, 'Classic sporty look.', 40, 4, 'polo'),
        ('Women Yoga Leggings', 1499, 'High stretch gym wear.', 30, 4, 'leggings'),
        ('Men Bomber Jacket', 2800, 'Urban street style.', 20, 4, 'bomber-jacket'),
        ('Women Sunglasses', 1800, 'Cat-eye frame protection.', 35, 4, 'sunglasses'),
        ('Men Tracksuit', 3200, 'Complete running set.', 25, 4, 'tracksuit'),
    ],
    'electronics': [
        ('Noise Cancelling Headphones', 8999, 'Deep bass and ANC.', 22, 4, 'headphones'),
        ('Sony WH-1000XM5', 29990, 'Industry leading noise cancellation.', 10, 5, 'sony-headphones'),
        ('Canon EOS R6 Mark II', 240000, 'Professional mirrorless.', 5, 5, 'camera'),
        ('iPad Air M2', 59900, 'Powerful tablet performance.', 12, 5, 'ipad'),
        ('Samsung Galaxy Tab S9', 72000, 'Best Android tablet.', 10, 5, 'samsung-tablet'),
        ('Kindle Paperwhite', 13999, 'E-ink reading perfection.', 15, 5, 'kindle'),
        ('Sony Bravia 55" 4K TV', 85000, 'Vibrant cinema experience.', 18, 5, 'tv'),
        ('JBL Flip 6 Speaker', 9999, 'Portable waterproof sound.', 25, 4, 'speaker'),
        ('Logitech MX Master 3S', 10500, 'Ultimate productivity mouse.', 10, 5, 'mouse'),
        ('Apple Watch Series 9', 41900, 'Advanced health tracking.', 8, 5, 'apple-watch'),
        ('Samsung Galaxy Watch 6', 29999, 'Classic smartwatch style.', 15, 5, 'samsung-watch'),
        ('GoPro Hero 12', 45000, 'Action ready video.', 12, 5, 'gopro'),
        ('DJI Mini 4 Pro Drone', 95000, 'High-res aerial shots.', 5, 5, 'drone'),
        ('Seagate 2TB HDD', 5800, 'Backup all your data.', 20, 4, 'hard-drive'),
        ('SanDisk 128GB Flash', 1200, 'Fast file transfer.', 30, 4, 'usb'),
        ('TP-Link WiFi 6 Router', 6500, 'High speed home network.', 15, 4, 'router'),
        ('Belkin Wireless Charger', 2999, 'Fast Qi charging pad.', 20, 4, 'wireless-charger'),
        ('Anker 20000mAh Powerbank', 3800, 'Reliable travel power.', 25, 4, 'powerbank'),
        ('Corsair Mechanical Keyboard', 12500, 'RGB gaming switch.', 10, 5, 'keyboard'),
        ('SteelSeries Gaming Mouse', 5400, 'Precision sensor tracking.', 15, 4, 'gaming-mouse'),
    ],
    'home': [
        ('Modern Table Lamp', 2499, 'Warm LED lighting.', 30, 4, 'lamp'),
        ('Ergonomic Office Chair', 14500, 'High-back mesh support.', 45, 5, 'office-chair'),
        ('Soft Velvet Cushion Set', 1499, 'Set of 5 luxury cushions.', 40, 4, 'cushions'),
        ('Floating Wall Shelves', 1899, 'Minimalist decor storage.', 25, 4, 'wall-shelf'),
        ('Blackout Window Curtains', 2200, 'Complete privacy curtains.', 30, 4, 'curtains'),
        ('Shaggy Area Rug', 4500, 'Soft and cozy rug.', 20, 4, 'rug'),
        ('Memory Foam Mattress', 25000, 'Better sleep tech.', 35, 5, 'mattress'),
        ('Ceramic Flower Vase', 899, 'Handcrafted pottery.', 50, 4, 'vase'),
        ('Nesting Coffee Tables', 7800, 'Smart space saving design.', 15, 4, 'coffee-table'),
        ('Bamboo Shoe Rack', 1200, 'Eco-friendly organizer.', 30, 4, 'shoe-rack'),
        ('Cotton Bed Sheet Set', 1800, 'Breathable 400TC cotton.', 25, 4, 'bed-sheet'),
        ('Indoor Large Plant', 2400, 'Natural air purifier.', 15, 4, 'plant'),
        ('Wall Clock Minimalist', 1100, 'Silent sweep movement.', 40, 4, 'wall-clock'),
        ('Scented Candle Pack', 650, 'Aromatherapy relax set.', 50, 4, 'candle'),
        ('Door Mat Welcome', 450, 'Non-slip outdoor mat.', 60, 4, 'doormat'),
        ('Kitchen Organizer Rack', 1600, 'Stainless steel saver.', 25, 4, 'kitchen-rack'),
        ('Mirror Gold Frame', 3500, 'Vintage wall decoration.', 20, 4, 'mirror'),
        ('Photo Frame Collage', 1200, 'Display your memories.', 30, 4, 'photo-frame'),
        ('Throw Blanket Fleece', 1400, 'Extra warm sofa throw.', 35, 4, 'blanket'),
        ('Storage Box Fabric', 850, 'Organize your closet.', 40, 4, 'storage-box'),
    ],
    'appliances': [
        ('Air Fryer 5L', 6999, 'Oil-free preset cooking.', 25, 5, 'air-fryer'),
        ('Robot Vacuum Cleaner', 24999, 'Smart mopping sweep.', 20, 4, 'robot-vacuum'),
        ('Microwave Oven 20L', 7500, 'Fast heating and grill.', 15, 4, 'microwave'),
        ('Front Load Washing Machine', 32000, 'Deep clean energy saver.', 10, 5, 'washing-machine'),
        ('Double Door Fridge', 28500, 'Inverter cooling tech.', 12, 5, 'refrigerator'),
        ('Dishwasher 12 Place', 45000, 'Water efficient cleaning.', 8, 4, 'dishwasher'),
        ('Water Purifier RO+UV', 12500, 'Safe drinking water tech.', 20, 5, 'water-purifier'),
        ('Tower Air Cooler', 8900, 'Smart cooling for summer.', 15, 4, 'air-cooler'),
        ('Electric Kettle 1.5L', 1200, 'Fast boiling safety.', 30, 4, 'kettle'),
        ('Juicer Mixer Grinder', 4800, 'Powerful blade crushing.', 25, 4, 'mixer'),
        ('Steam Iron', 2400, 'Wrinkle free clothing.', 35, 4, 'iron'),
        ('Vacuum Cleaner Stick', 15500, 'Cordless lightweight reach.', 15, 4, 'stick-vacuum'),
        ('Induction Cooktop', 3200, 'Safe and fast cooking.', 20, 4, 'induction'),
        ('Bread Toaster 2 Slice', 1400, 'Crispy breakfast toast.', 40, 4, 'toaster'),
        ('Coffee Maker Espresso', 18500, 'Barista style at home.', 10, 5, 'coffee-maker'),
        ('OTG Oven 30L', 6500, 'Baking and roasting pro.', 15, 4, 'otg'),
        ('Ceiling Fan Smart', 4200, 'Remote and app control.', 25, 4, 'fan'),
        ('Hand Blender', 1500, 'Multi-purpose blending.', 30, 4, 'blender'),
        ('Sandwich Maker', 1800, 'Quick and easy snacks.', 35, 4, 'sandwich-maker'),
        ('Hair Dryer Professional', 2200, 'Fast salon style dry.', 25, 4, 'hair-dryer'),
    ]
}

php_code = '<?php\n\nnamespace Database\Seeders;\n\nuse App\Models\\Category;\nuse App\Models\Product;\nuse Illuminate\\Database\\Seeder;\n\nclass ProductSeeder extends Seeder\n{\n    public function run(): void\n    {\n        $products = [\n'

def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

for cat, items in categories.items():
    for name, price, desc, disc, rate, img_kw in items:
        slug = slugify(name)
        # Using a variety of high quality base images from Unsplash and appending the keyword for context/randomness
        if cat == 'mobiles':
            img_url = f"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80&{img_kw}"
        elif cat == 'laptops':
            img_url = f"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80&{img_kw}"
        elif cat == 'fashion':
            img_url = f"https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80&{img_kw}"
        elif cat == 'electronics':
            img_url = f"https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80&{img_kw}"
        elif cat == 'home':
            img_url = f"https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80&{img_kw}"
        else: # appliances
            img_url = f"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80&{img_kw}"
            
        php_code += f"            [\n"
        php_code += f"                'category_slug' => '{cat}',\n"
        php_code += f"                'title' => '{name}',\n"
        php_code += f"                'slug' => '{slug}',\n"
        php_code += f"                'description' => '{desc}',\n"
        php_code += f"                'price' => {price},\n"
        php_code += f"                'discount_percent' => {disc},\n"
        php_code += f"                'rating' => {rate},\n"
        php_code += f"                'stock' => {random.randint(5, 100)},\n"
        php_code += f"                'image_url' => '{img_url}',\n"
        php_code += f"                'is_featured' => {str(random.random() > 0.7).lower()},\n"
        php_code += f"            ],\n"

php_code += '        ];\n\n        foreach ($products as $product) {\n            $category = Category::query()->where(\'slug\', $product[\'category_slug\'])->first();\n            if (!$category) continue;\n            unset($product[\'category_slug\']);\n            $product[\'category_id\'] = $category->id;\n            Product::query()->updateOrCreate([\'slug\' => $product[\'slug\']], $product);\n        }\n    }\n}\n'

with open('ProductSeeder.php', 'w', encoding='utf-8') as f:
    f.write(php_code)
