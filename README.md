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

### ESLint disable unused variable errors
Add to .eslintrc.js
```
rules: {
  'no-unused-vars': 'off'
}
```

### Install dependencies
```
npm install uuid
npm install moment
npm install @fortawesome/fontawesome-free
```

### Setup AWS Amplify
```
amplify configure
amplify init
amplify add auth
amplify push
npm install aws-amplify
```

Add GraphQL API
```
amplify add api
amplify push
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
