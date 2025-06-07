import { describe, it, expect, beforeEach } from 'vitest';
import { HeroDataService } from '../src/services/hero-data.service.ts';

describe('HeroDataService', () => {
  let heroService: HeroDataService;

  beforeEach(() => {
    heroService = new HeroDataService();
  });

  describe('getHeroByName', () => {
    it('should find hero by name case-insensitively', () => {
      const hero = heroService.getHeroByName('SpiderMan');
      expect(hero).toBeDefined();
      expect(hero?.name).toBe('spiderman');
    });

    it('should return undefined for non-existent hero', () => {
      const hero = heroService.getHeroByName('Batman');
      expect(hero).toBeUndefined();
    });

    it('should throw error for empty name', () => {
      expect(() => heroService.getHeroByName('')).toThrow('Hero name is required');
    });
  });

  describe('getAllHeroes', () => {
    it('should return all heroes', () => {
      const heroes = heroService.getAllHeroes();
      expect(heroes.length).toBeGreaterThan(0);
    });
  });

  describe('addHero', () => {
    it('should successfully add a new hero', () => {
      const newHero = {
        id: 4,
        name: 'thor',
        realName: 'Thor Odinson',
        description: 'God of Thunder',
        powers: ['lightning', 'super strength']
      };

      const addedHero = heroService.addHero(newHero);
      expect(addedHero).toEqual(newHero);
      
      const retrievedHero = heroService.getHeroByName('thor');
      expect(retrievedHero).toEqual(newHero);
    });

    it('should throw error when adding duplicate hero', () => {
      const duplicateHero = {
        id: 4,
        name: 'spiderman',
        realName: 'Peter Parker',
        description: 'Test duplicate',
        powers: ['test']
      };

      expect(() => heroService.addHero(duplicateHero)).toThrow('Hero with name spiderman already exists');
    });

    it('should throw error when adding hero without name', () => {
      const invalidHero = {
        id: 4,
        name: '',
        realName: '',
        description: 'Invalid hero',
        powers: []
      };

      expect(() => heroService.addHero(invalidHero)).toThrow('Hero name and real name are required');
    });
  });
});