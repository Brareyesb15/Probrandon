# Probrandon

## Beschrijving
Probrandon is een project dat zich richt op het bieden van verschillende hulpfuncties en beveiligingsmechanismen. Het bevat functionaliteiten voor databaseverbindingen, gegevensvalidatie, en het genereren van veilige wachtwoorden.

## Installatie
Om het project lokaal te installeren, volg deze stappen:

1. Clone de repository:
   ```bash
   git clone https://github.com/Brareyesb15/Probrandon.git
   ```
2. Navigeer naar de projectmap:
   ```bash
   cd Probrandon
   ```
3. Installeer de vereiste afhankelijkheden:
   ```bash
   npm install
   ```

## Gebruik
Hier zijn enkele van de belangrijkste functies die beschikbaar zijn in dit project:

### Database Verbinding
De databaseverbinding kan worden gemaakt met de volgende functie:
```typescript
import { connectDB } from './src/config/database';
```

### Gegevensvalidatie
De validatiefuncties kunnen worden gebruikt om verschillende datatypes te controleren:
```typescript
import { ValidDataType } from './src/utils/validation';
```

### Wachtwoord Generatie
Om een veilig wachtwoord te genereren, gebruik de volgende functie:
```typescript
import { generateSecurePassword } from './src/utils/security';
```

### Datum Formatteren
Gebruik de functie `formatDate` om een datum in een specifiek formaat te formatteren:
```typescript
import { formatDate } from './src/utils/helpers';
```

## Bijdragen
Bijdragen aan dit project zijn welkom! Voel je vrij om een pull request in te dienen of een issue te openen.

## Licentie
Dit project is gelicentieerd onder de MIT-licentie. Zie het LICENSE-bestand voor meer informatie.