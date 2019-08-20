import express from 'express';
import cors from 'cors';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { AUTH0 } from '@rivers/shared';
import { fetchExplanationHTML, fetchAutoCompleteJson, parseExplanationHTML } from '@rivers/cambridge-dictionary';

const app = express();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0.domain}/.well-known/jwks.json`,
  }),

  audience: AUTH0.audience,
  issuer: `https://${AUTH0.domain}/`,
  algorithm: ['RS256'],
});

app.use(cors());

app.get('/cambridge/:from-:to/:word', async (req, res) => {
  const { word, from, to } = req.params;

  const explanationHtml = await fetchExplanationHTML(word, { from, to });

  const explanations = parseExplanationHTML(explanationHtml);

  res.json({
    id: word,
    name: word,
    explanations
  });
});

app.get('/cambridge/:from-:to/auto-complete/:word', async (req, res) => {
  const { word, from, to } = req.params;

  const autocompleteJson = await fetchAutoCompleteJson(word, { from, to });

  res.json(autocompleteJson);
})

export default app;

app.get('/api/ping', checkJwt, (req, res) => {
  res.json({
    user: req.user,
    msg: "Your Access Token was successfully validated!",
  });
})
