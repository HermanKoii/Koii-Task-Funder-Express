// Hero Data Service: Comprehensive service for managing hero information

/**
 * Hero interface defining a robust structure for hero data
 */
export interface Hero {
  id: number;
  name: string;
  realName: string;
  alias?: string;
  description?: string;
  universe?: string;
  powers: string[];
}

/**
 * HeroDataService provides comprehensive methods for retrieving and managing hero data
 */
export class HeroDataService {
  // Expanded in-memory storage of heroes with more details
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
   * Retrieves a hero by name, supporting multiple search strategies
   * @param name - Name, alias, or real name of the hero
   * @returns Hero object or undefined if not found
   */
  getHeroByName(name: string): Hero | undefined {
    if (!name) {
      throw new Error('Hero name is required');
    }

    const normalizedName = name.toLowerCase().replace(/\s/g, '');
    return this.heroes.find(
      hero => 
        hero.name.toLowerCase() === normalizedName ||
        hero.alias?.toLowerCase().replace(/\s/g, '') === normalizedName ||
        hero.realName.toLowerCase().replace(/\s/g, '') === normalizedName
    );
  }

  /**
   * Retrieves all heroes, optionally filtered by universe
   * @param universe - Optional universe to filter heroes
   * @returns Array of heroes
   */
  getAllHeroes(universe?: string): Hero[] {
    if (universe) {
      return this.heroes.filter(
        hero => hero.universe?.toLowerCase() === universe.toLowerCase()
      );
    }
    return [...this.heroes];
  }

  /**
   * Adds a new hero to the collection
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
    const newHero = {
      ...hero,
      id: this.heroes.length + 1
    };

    this.heroes.push(newHero);
    return newHero;
  }
}

// Export singleton instance
export const heroDataService = new HeroDataService();