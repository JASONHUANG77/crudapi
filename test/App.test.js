import 'mocha';
import request from 'supertest';

import { expect } from 'chai';

import sinon from 'sinon';

import express from 'express';

import bodyParser from 'body-parser';
 
import { StarWarsCharacter, GalaxyPlanet, StarshipMaster } from '../models';

import { getCharacter, createCharacter, updateCharacter, deleteCharacter } from '../controllers';
 
const app = express();

app.use(bodyParser.json());
 
app.get('/api/characters/:id', getCharacter);

app.post('/api/characters', createCharacter);

app.put('/api/characters/:id', updateCharacter);

app.delete('/api/characters/:id', deleteCharacter);
 
describe('Star Wars Character API', () => {

  afterEach(() => {

    sinon.restore();

  });
 
  describe('GET /api/characters/:id', () => {

    it('should return a character by ID', async () => {

      const character = { id: 1, name: 'Luke Skywalker', GalaxyPlanet: {}, StarshipMasters: [] };

      sinon.stub(StarWarsCharacter, 'findByPk').resolves(character);
 
      const res = await request(app).get('/api/characters/1');

      expect(res.status).to.equal(200);

      expect(res.body).to.deep.equal(character);

    });
 
    it('should return 404 if character not found', async () => {

      sinon.stub(StarWarsCharacter, 'findByPk').resolves(null);
 
      const res = await request(app).get('/api/characters/999');
 
      expect(res.status).to.equal(404);

      expect(res.body.message).to.equal('Character not found');

    });

  });
 
  describe('POST /api/characters', () => {

    it('should create a new character', async () => {

      const newCharacter = { name: 'Darth Vader', home_planet: 'Tatooine', starships: [] };

      sinon.stub(StarWarsCharacter, 'create').resolves(newCharacter);
 
      const res = await request(app)

        .post('/api/characters')

        .send(newCharacter);
 
      expect(res.status).to.equal(201);

      expect(res.body).to.deep.equal(newCharacter);

    });

  });
 
  describe('PUT /api/characters/:id', () => {

    it('should update an existing character', async () => {

      const updatedCharacter = { name: 'Darth Vader', home_planet: 'Tatooine', starships: [] };

      sinon.stub(StarWarsCharacter, 'update').resolves([1]);
 
      const res = await request(app)

        .put('/api/characters/1')

        .send(updatedCharacter);
 
      expect(res.status).to.equal(200);

      expect(res.body.message).to.equal('Character updated');

    });
 
    it('should return 404 if character not found', async () => {

      sinon.stub(StarWarsCharacter, 'update').resolves([0]);
 
      const res = await request(app)

        .put('/api/characters/999')

        .send({ name: 'Obi-Wan Kenobi' });
 
      expect(res.status).to.equal(404);

      expect(res.body.message).to.equal('Character not found');

    });

  });
 
  describe('DELETE /api/characters/:id', () => {

    it('should delete an existing character', async () => {

      sinon.stub(StarWarsCharacter, 'destroy').resolves(1);
 
      const res = await request(app).delete('/api/characters/1');
 
      expect(res.status).to.equal(200);

      expect(res.body.message).to.equal('Character deleted');

    });
 
    it('should return 404 if character not found', async () => {

      sinon.stub(StarWarsCharacter, 'destroy').resolves(0);
 
      const res = await request(app).delete('/api/characters/999');
 
      expect(res.status).to.equal(404);

      expect(res.body.message).to.equal('Character not found');

    });

  });

});

 