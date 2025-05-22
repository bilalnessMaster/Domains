<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Domain>
 */
class DomainFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $registrationDate = $this->faker->dateTimeBetween('-5 years', 'now');
        $expiryDate = $this->faker->dateTimeBetween($registrationDate, '+10 years');

        return [
            'name' => $this->faker->domainName(),
            'registrar' => $this->faker->randomElement([
                'GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare', 'NameSilo',
                'Porkbun', 'Hover', 'DreamHost', 'Bluehost', 'HostGator'
            ]),
            'registration_date' => $registrationDate,
            'expiry_date' => $expiryDate,
            'auto_renew' => $this->faker->boolean(70),
            'purchase_price' => $this->faker->randomFloat(2, 10, 5000),
            'current_value' => $this->faker->randomFloat(2, 10, 10000),
            'asking_price' => $this->faker->randomFloat(2, 10, 15000),
            'for_sale' => $this->faker->boolean(30),
            'status' => $this->faker->randomElement(['active', 'expired', 'pending', 'sold']),
            'notes' => $this->faker->boolean(50) ? $this->faker->sentence(10) : null,
            'user_id' => 4,
        ];
    }
}
