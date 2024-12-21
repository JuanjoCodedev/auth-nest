# Proyecto de Registro e Inicio de Sesión con Roles

Este proyecto es una aplicación de autenticación que permite a los usuarios registrarse, iniciar sesión y acceder a recursos basados en roles con permisos especificos. Utiliza PostgreSQL como base de datos.

## Características

- Permite a los usuarios crear una cuenta en el sistema.
- Los usuarios pueden iniciar sesión en la aplicación utilizando sus credenciales con notificación por correo electrónico para accesos desde dispositivos diferentes a los habituales.
- Actualización de contraseña con generación automática y opción de actualización manual a través de un enlace en el correo electrónico.
- Permite asignar roles específicos a los usuarios para gestionar sus permisos y acceso dentro de la aplicación.
- Las rutas de la aplicación están protegidas según el rol del usuario y el permiso que este tenga, asegurando que solo los usuarios con permisos adecuados puedan acceder a ciertas áreas.
- Utiliza JSON Web Tokens (JWT) para la autenticación segura de usuarios.
- Implementa refresh tokens para mantener la sesión activa y permitir una conexión fluida sin necesidad de reautenticación constante.
- Permite a los usuarios iniciar sesión o registrarse utilizando sus cuentas de Google o Github para una experiencia de autenticación más conveniente.
- Utiliza Handlebars para generar plantillas de correo electrónico dinámicas, facilitando el envío de correos personalizados y bien formateados.

## Tecnologías Utilizadas

- **Backend**: NestJS.
- **Base de datos**: PostgreSQL.
- **Autenticación**: JWT (JSON Web Tokens), Passport.
- **Hashing de contraseñas**: bcrypt.
- **Envios de correos electrónicos**: Mailer.
- **CORS**: Para el manejo de solicitudes entre dominios.
- **Plantillas de correo electrónico**: Handlebars.
- **Contenedores**: Docker para el despliegue y gestión de contenedores.
- **Documentación de API**: Swagger para la generación de documentación de API.

## Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn
- Docker (opcional, pero recomendado para el desarrollo y despliegue con contenedores)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/JuanjoCodedev/auth-nest.git
```

2. Configura la base de datos PostgreSQL y crea un archivo `.dev.env` en la raíz del proyecto con la siguiente configuración:

```env
NODE_ENV=modo-de-trabajo development | production

LOG_LEVEL=debug | info

PORT=3000
HOST_DATABASE_DEVELOPMENT=localhost
POSTGRES_PORT_DEVELOPMENT=5432
POSTGRES_USER_DEVELOPMENT=tu-usuario
POSTGRES_PASSWORD_DEVELOPMENT=tu-contraseña
DATABASE_DEVELOPMENT=nombre-de-tu-base-de-datos

HOST_DATABASE_PRODUCTION=localhost
POSTGRES_PORT_PRODUCTION=5432
POSTGRES_USER_PRODUCTION=tu-usuario
POSTGRES_PASSWORD_PRODUCTION=tu-contraseña
DATABASE_PRODUCTION=nombre-de-tu-base-de-datos

SECRET_KEY=SECRET_KEY
EXPIRED_TOKEN=tiempo-expiracion-del-token
EXPIRED_REFRESH_TOKEN=tiempo-expiracion-del-refresh-token

MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_SECURE=true
MAILER_NAME=tu-marca
MAILER_USER=email-remitente@example.com
MAILER_PASS=tu-contraseña-app-google

GOOGLE_CLIENT_ID=tu-client-id-google
GOOGLE_CLIENT_SECRET=tu-client-secret-google
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

GITHUB_CLIENT_ID=tu-client-id-GITHUB
GITHUB_CLIENT_SECRET=tu-client-secret-GITHUB
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

### Observación

Si vas a utiizar Docker en vez de implementar:

```env
HOST_DATABASE=localhost
```

se recomienda utilizar:

```env
HOST_DATABASE_DEVELOPMENT=db
```
**Nota:** remplace las variables de entorno del archivo `.dev.env` por las credenciales colocadas en su `docker-compose`:

```env
HOST_DATABASE_DEVELOPMENT=db
POSTGRES_PORT_DEVELOPMENT=5432
POSTGRES_USER_DEVELOPMENT=root
POSTGRES_PASSWORD_DEVELOPMENT=root
DATABASE_DEVELOPMENT=root
```

## Uso

1. Opción A: Ejecución con Docker

- Asegúrate de tener Docker instalado en tu sistema. Puedes descargarlo desde Docker Hub.

- Crea un archivo .dev.env en la raíz del proyecto con la configuración de la base de datos y otras variables de entorno necesarias, si no lo haces no te podra ejecutar el comando correctamente (consulta los pasos de instalación #2 .dev.env sigue los pasos).

- Ejecuta el siguiente comando en la raíz del proyecto para construir y ejecutar los contenedores de Docker:

```bash
docker-compose up --build
```

Esto creará e iniciará los contenedores necesarios para ejecutar la aplicación, incluyendo la base de datos PostgreSQL y la interfaz de administración Adminer, para crear la tabla solo dirigete a la **URL:** localhost:8080.

2. Opción B: Ejecución sin Docker

- Asegúrate de tener PostgreSQL instalado y configurado en tu sistema.

- Crea un archivo .dev.env en la raíz del proyecto con la configuración de la base de datos y otras variables de entorno necesarias (consulta los pasos de instalación #2 .dev.env sigue los pasos).

- Instala las dependencias del proyecto:

```bash
npm install
```

- Inicia el servidor con el siguiente comando para probar el envio de correo electronicos en desarrollo:

```bash
npm run build-and-start
```

- Inicia el servidor con el siguiente comando para desarrollo:

```bash
npm run start:dev
```

3. El servidor estará disponible en `http://localhost:3000` tambien puedes ingesar `http://localhost:3000/api` para el uso de Swagger.

### Endpoints

#### Registro de Usuario

- **URL**: `sign-up/signUp`
- **Método**: `POST`
- **Cuerpo**:
  ```json
  {
    "name": "nombre-de-usuario",
    "email": "correo@ejemplo.com",
    "password": "123456789"
  }
  ```

#### Inicio de Sesión

- **URL**: `sign-in/signIn`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "email": "correo@ejemplo.com",
    "password": "123456789"
  }
  ```

  #### Refrescar Token

- **URL**: `token/refreshToken`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "refreshToken": "antiguo_token"
  }
  ```

  #### Observación

  Para refrescar el token desde el frontend, asegúrate de incluir el encabezado x-refresh-token con el valor del token de actualización (refresh token) en tu solicitud HTTP.

  ```json
  {
    "x-refresh-token": "refreshToken"
  }
  ```

#### Enviar token por correo electrónico

- **URL**: `reset-password/sendPasswordReset`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "email": "correo@ejemplo.com"
  }
  ```

#### Actualizar contraseña

- **URL**: `user/recoverPassword/:id`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "password": "contraseña-nueva"
  }
  ```

#### Validación con Google

- **URL**: `with-provider/google`
- **Método**: `GET`
- **Cuerpo**: No aplica

- **URL**: `with-provider/google/callback`
- **Método**: `GET`
- **Cuerpo**: No aplica

#### Validación con Github

- **URL**: `with-provider/github`
- **Método**: `GET`
- **Cuerpo**: No aplica

- **URL**: `with-provider/github/callback`
- **Método**: `GET`
- **Cuerpo**: No aplica

### Roles

Los roles pueden ser asignados a los usuarios y utilizados para proteger rutas específicas. Además podras asignar permisos a roles especificos. Ejemplo de roles: `admin`, `member`.

```typescript
@Auth()
@Post('recoverPassword/:id')
async recoverPassword(@Param('id') id: number, @Body() updatePassword: UpdatePasswordDto) {
    return this.userService.recoverPassword(id, updatePassword);
  }
```

En ese ejemplo, se importa el decorador `@Auth()` que se encargara de validar si la persona tiene asigando un rol y si ese rol tiene permiso para acceder a esa ruta.

#### Registrar nuevo Rol

- **URL**: `roles/newRol`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "name": "deve"
  }
  ```

#### Registrar nuevo Permiso

- **URL**: `permissions/newPermission`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "route": "/user/profile/:id"
  }
  ```

#### Asignar permiso a Rol

- **URL**: `rp/newrp`
- **Método**: `POST`
- **Cuerpo**:

  ```json
  {
    "id_rol": 1,
    "id_permissions": 1
  }
  ```

## Desarrollo

### Ejecución de la Aplicación en Desarrollo

```bash
npm run build-and-start
```

### Compilación y Ejecución en Producción

```bash
npm run build
npm run start:prod
```

## Diagrama de Flujo

<img src="https://imgur.com/CoElyl2.jpg">

## Diagrama ER
<img src="https://imgur.com/exZ4Na7.jpg">

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

## Lincencia

Este proyecto está licenciado bajo la Licencia MIT.
