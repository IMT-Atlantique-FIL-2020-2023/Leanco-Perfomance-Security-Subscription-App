# Leanco-Perfomance-Security-Subscription-App

## Pour bien commencer

1. `npm i`
2. `ionic cordova run browser` ou `ionic cordova run android`

L'url du serveur est hardcodée dans le code. Voir le fichier secure-code.service.ts

## Générer le client angular http à partir de l'open api

```sh
npx openapi-typescript-codegen --input ./docs/openapi.json --output ./src/app/leanco-subscription-server-client --client angular
```
