// Hero Data Service
// Comprehensive service for managing hero information with flexible design

export interface Hero {
  id: number;
  name: string;
  realName: string;
  alias?: string;
  description?: string;
  universe?: string;
  powers: string[];
}

export class HeroDataService {
  private heroes: Hero[] = [
    {
      id: 1,
      name: 'spiderman',
      realName: 'Peter Parker',
      alias: 'Spider-Man',
      description: 'Friendly neighborhood Spider-Man',
      universe: 'Marvel',
      powers: ['web-slinging', 'spider-sense', 'wall-crawling']
    },
    {
      id: 2,
      name: 'ironman',
      realName: 'Tony Stark',
      alias: 'Iron Man',
      description: 'Genius, billionaire, philanthropist',
      universe: 'Marvel',
      powers: ['powered armor', 'advanced technology', 'flight']
    },
    {
      id: 3,
      name: 'captainamerica',
      realName: 'Steve Rogers',
      alias: 'Captain America',
      description: 'Super soldier and Avengers leader',
      universe: 'Marvel',
      powers: ['enhanced strength', 'tactical genius', 'shield mastery']
    }
  ];

  /**
   * Get hero by name or alias (case-insensitive)
   * @param name Hero name to search
   * @returns Hero object or undefined
   */
  getHeroByName(name: string): Hero | undefined {
    if (!name) {
      throw new Error('Hero name is required');
    }

    const normalizedName = name.toLowerCase().replace(/\s/g, '');
    return this.heroes.find(
      hero => 
        hero.name.toLowerCase() === normalizedName ||
        hero.alias?.toLowerCase().replace(/\s/g, '') === normalizedName
    );
  }

  /**
   * Get all heroes
   * @returns Array of heroes
   */
  getAllHeroes(): Hero[] {
    return [...this.heroes];
  }

  /**
   * Retrieve heroes by universe
   * @param universe Universe to filter heroes
   * @returns Array of heroes in the specified universe
   */
  getHeroesByUniverse(universe: string): Hero[] {
    if (!universe) {
      throw new Error('Universe is required');
    }

    return this.heroes.filter(
      hero => hero.universe?.toLowerCase() === universe.toLowerCase()
    );
  }

  /**
   * Add a new hero to the collection
   * @param hero Hero object to add
   * @returns Added hero
   * @throws Error if hero already exists or is invalid
   */
  addHero(hero: Omit<Hero, 'id'>): Hero {
    // Validate hero
    if (!hero.name || !hero.realName) {
      throw new Error('Hero name and real name are required');
    }

    // Check for existing hero
    const existingHero = this.getHeroByName(hero.name);
    if (existingHero) {
      throw new Error(`Hero with name ${hero.name} already exists`);
    }

    // Assign new ID if not provided
    const newHero: Hero = {
      ...hero,
      id: this.heroes.length + 1
    };

    this.heroes.push(newHero);
    return newHero;
  }
}

// Export singleton instance
export const heroDataService = new HeroDataService();