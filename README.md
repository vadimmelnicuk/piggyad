# adstr

## Project setup

### Prerequisites
```
npm install -g @vue/cli
npm install -g @aws-amplify/cli
``` 

### Vue project creation
```
vue create adstr
```

Use babel, eslint, router, vuex

### Install dependencies
```

vue add tailwind
```

Add this to main.js
```
import './assets/tailwind.css'
```

### Setup AWS Amplify
```
amplify init
amplify add auth
amplify push
npm install aws-amplify
```

Using Admin UI setup API and run
```
amplify pull
```

Add this to main.js
```
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
```

Add storage
```
amplify add storage
amplify push
```

## Project install
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
