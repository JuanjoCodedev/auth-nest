# Proyecto de Registro e Inicio de Sesión con Roles

Este proyecto es una aplicación de autenticación que permite a los usuarios registrarse, iniciar sesión y acceder a recursos basados en roles. Utiliza PostgreSQL como base de datos.

## Características

- Registro de usuarios.
- Inicio de sesión de usuarios.
- Asignación de roles a usuarios.
- Protección de rutas basadas en roles.
- Generación de tokens JWT para autenticación.
- Generación de refresh token para una conexión fluida.

## Tecnologías Utilizadas

- **Backend**: NestJS
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens), Passport
- **Hashing de contraseñas**: bcrypt
- **Envios de correos electrónicos**: Nodemailer
- **CORS**: Para el manejo de solicitudes entre dominios
- **Logger**: Pino para el registro de logs

## Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/JuanjoCodedev/auth-nest.git
```

2. Instala las dependencias del proyecto:

```bash
npm install
```

3. Configura la base de datos PostgreSQL y crea un archivo `.dev.env` en la raíz del proyecto con la siguiente configuración:

```env
PORT=3000
HOSTDB=localhost
PORTDB=5432
USERNAMEDB=tu-usuario
PASSDB=tu-contraseña
DB=nombre-de-tu-base-de-datos

NODEMAILER_NAME=tu-marca
NODEMAILER_USER=email-remitente@example.com
NODEMAILER_PASS=tu-contraseña-app-google

GOOGLE_CLIENT_ID=tu-client-id-google
GOOGLE_CLIENT_SECRET=tu-client-secret-google
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

GITHUB_CLIENT_ID=tu-client-id-GITHUB
GITHUB_CLIENT_SECRET=tu-client-secret-GITHUB
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

## Uso

1. Inicia el servidor:

   ```bash
   npm run start
   ```

2. El servidor estará disponible en `http://localhost:3000`

### Endpoints

#### Registro de Usuario

- **URL**: `auth/signUp`
- **Método**: `POST`
- **Cuerpo**:
  ```json
  {
    "username": "nombre-de-usuario",
    "useremail": "correo@ejemplo.com",
    "userpassword": "123456789"
  }
  ```

#### Inicio de Sesión

- **URL**: `auth/signIn`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "useremail": "correo@ejemplo.com",
    "userpassword": "123456789"
  }
  ```

  #### Refrescar Token

- **URL**: `auth/refreshtoken`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "refreshToken": "antiguo_token"
  }
  ```

  #### Nota importante

Para refrescar el token desde el frontend, asegúrate de incluir el encabezado x-refresh-token con el valor del token de actualización (refresh token) en tu solicitud HTTP.

```json
{
  "x-refresh-token": "refreshToken"
}
```

#### Enviar token por correo electrónico

- **URL**: `auth/sendPasswordReset`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "useremail": "correo@ejemplo.com"
  }
  ```

#### Actualizar contraseña

- **URL**: `user/recoverPassword/:id`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "userpassword": "contraseña-nueva"
  }
  ```

#### Validación con Google

- **URL**: `auth/google`
- **Método**: `GET`
- **Cuerpo**: No aplica

- **URL**: `auth/google/callback`
- **Método**: `GET`
- **Cuerpo**: No aplica

#### Validación con Github

- **URL**: `auth/github`
- **Método**: `GET`
- **Cuerpo**: No aplica

- **URL**: `auth/github/callback`
- **Método**: `GET`
- **Cuerpo**: No aplica

### Roles

Los roles pueden ser asignados a los usuarios y utilizados para proteger rutas específicas. Ejemplo de roles: `admin`, `member`.

```typescript
@Auth(RoleEnum.ADMIN, RoleEnum.MEMBER)
@Post('recoverPassword/:id')
async recoverPassword(@Param('id') id: number, @Body() updatePassword: ValidateDto) {
    return this.userService.recoverPassword(id, updatePassword);
  }
```

### Control de Roles

El control de roles se realiza en el archivo `src/shared/interfaces/user.interface.ts`. Este archivo define la interfaz de usuario y especifica los roles disponibles para asignar a los usuarios en la aplicación. Puedes modificar esta interfaz para agregar, eliminar o modificar roles según las necesidades de tu aplicación.

## Desarrollo

### Ejecución de la Aplicación en Desarrollo

```bash
npm run start:dev
```

### Compilación y Ejecución en Producción

```bash
npm run build
npm run start:prod
```

## Diagrama de Flujo

<img src="https://imgur.com/CoElyl2.jpg">

## Contribución

1. Haz un fork del repositorio.

2. Crea una nueva rama:

```bash
git checkout -b feature/nueva-caracteristica
```

3. Realiza tus cambios y haz commit:

```bash
git commit -am 'Añadir nueva característica'
```

4. Empuja tus cambios a la rama:

```bash
git push origin feature/nueva-caracteristica
```

5. Abre un Pull Request en GitHub, describiendo los cambios propuestos.

## Nuevas caracteristicas

### Versión: 0.1.0

- **Refrescar Token:** Los usuarios pueden refrescar su token de acceso cuando expire.

### Versión: 0.2.0

- **Actualización de contraseña** Los usuarios pueden restablecer su contraseña enviando un email de verificación a su correo electronico.

- **Estructuración de archivos** Se han realizados cambios en la estructura del proyecto.

### Versión: 0.3.0

- **Autenticación segura con múltiples proveedores:** Permite a los usuarios iniciar sesión o registrarse utilizando sus cuentas de Google o Github.

- **Estructuración de archivos** Se han realizados cambios en la estructura del proyecto.

## Lincencia

Este proyecto está licenciado bajo la Licencia MIT.
