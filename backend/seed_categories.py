import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.products.models import Category  # noqa: E402

CATEGORIES = [
    # Food & Drink
    ("Food & Beverages", "Groceries, drinks, snacks, and other consumables"),
    ("Bakery & Confectionery", "Bread, cakes, pastries, and sweets"),
    ("Dairy & Eggs", "Milk, cheese, butter, eggs, and related products"),
    ("Meat & Seafood", "Fresh, frozen, and processed meat and fish"),
    ("Fruits & Vegetables", "Fresh and dried produce"),
    # Health & Personal Care
    ("Health & Beauty", "Medicine, cosmetics, and personal care products"),
    ("Pharmaceuticals", "Prescription and over-the-counter drugs and supplements"),
    # Fashion
    ("Clothing & Apparel", "Clothes, shoes, and fashion accessories"),
    ("Jewelry & Accessories", "Rings, necklaces, watches, bags, and belts"),
    # Electronics & Technology
    ("Electronics", "Phones, computers, accessories, and gadgets"),
    ("Electrical Supplies", "Wiring, switches, sockets, and electrical fittings"),
    ("Solar & Energy", "Solar panels, batteries, inverters, and energy systems"),
    # Home & Living
    ("Household & Furniture", "Home appliances, furniture, and decor"),
    ("Cleaning & Hygiene", "Detergents, disinfectants, and cleaning supplies"),
    ("Bedding & Linen", "Mattresses, bedsheets, pillows, and towels"),
    ("Kitchenware", "Cookware, utensils, cutlery, and kitchen tools"),
    # Construction & Industry
    ("Building & Hardware", "Construction materials and tools"),
    ("Paints & Finishes", "Paints, varnishes, and surface treatment products"),
    ("Plumbing & Sanitary", "Pipes, fittings, taps, and sanitary ware"),
    # Office & Education
    ("Stationery & Office", "Books, pens, paper, and office supplies"),
    ("Printing & Packaging", "Packaging materials, labels, and printing supplies"),
    # Automotive
    ("Automotive", "Vehicle parts, accessories, and lubricants"),
    ("Tyres & Batteries", "Car and motorcycle tyres and batteries"),
    # Agriculture
    ("Agriculture", "Seeds, fertilizers, livestock, and farm equipment"),
    ("Animal Feed & Veterinary", "Livestock feeds, supplements, and vet supplies"),
    # Recreation & Lifestyle
    ("Sports & Outdoors", "Sports equipment, fitness gear, and outdoor items"),
    ("Toys & Games", "Children's toys, games, and entertainment"),
    ("Books & Media", "Books, music, movies, and educational materials"),
    # Services
    ("Services", "Repair, cleaning, consulting, and other service offerings"),
    ("Salon & Spa", "Hair, beauty, and wellness services and products"),
    ("Catering & Events", "Event planning, catering, and hospitality supplies"),
    # Miscellaneous
    ("Petroleum & Lubricants", "Fuel, engine oils, and related products"),
    ("Other", "Products that don't fit into any other category"),
]


def seed():
    created, skipped = 0, 0
    for name, description in CATEGORIES:
        _, was_created = Category.objects.get_or_create(name=name, defaults={"description": description})
        if was_created:
            created += 1
        else:
            skipped += 1
    print(f"Done — {created} created, {skipped} already existed.")


if __name__ == "__main__":
    seed()
